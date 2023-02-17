/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const { Transform } = require('stream');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'styleId', title: 'styleId' },
    { id: 'url', title: 'url' },
    { id: 'thumbnail_url', title: 'thumbnail_url' },
  ],
});

const readStream = fs.createReadStream('ETL/atelier_data/photos.csv');
const writeStream = fs.createWriteStream('ETL/transformed_data/photos.csv');

function isValidURL(string) {
  if (string.slice(0, 8) === 'https://') {
    return true;
  }
  return false;
}

let errorCount = 0;
let successCount = 0;

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const requiredKeys = ['id', 'styleId', 'url', 'thumbnail_url'];
    const missingKeys = requiredKeys.filter((key) => !(key in chunk));
    if (missingKeys.length > 0) {
      errorCount++;
    } else if (!isValidURL(chunk.url) || !isValidURL(chunk.thumbnail_url)) {
      errorCount++;
    } else {
      successCount++;
      const row = {
        id: Number(chunk.id),
        styleId: Number(chunk.styleId),
        url: chunk.url,
        thumbnail_url: chunk.thumbnail_url,
      };
      this.push(csvStringifier.stringifyRecords([row]));
    }
    next();
  }
}
const transformer = new CSVCleaner({ writableObjectMode: true });

writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on('finish', () => { console.log(`Finished transforming photos, error rate is ${(errorCount) / (errorCount + successCount)}`); });

// fs.createReadStream('ETL/atelier_data/photos.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//     process.exit(0);
//   })
//   .on('end', () => {
//     console.log('Finished reading file!');
//   });
