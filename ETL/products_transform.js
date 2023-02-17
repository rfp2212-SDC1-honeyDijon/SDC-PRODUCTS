/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const { Transform } = require('stream');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'campus', title: 'campus' },
    { id: 'name', title: 'name' },
    { id: 'slogan', title: 'slogan' },
    { id: 'description', title: 'description' },
    { id: 'category', title: 'category' },
    { id: 'default_price', title: 'default_price' },
    { id: 'created_at', title: 'created_at' },
    { id: 'updated_at', title: 'updated_at' },
  ],
});

const readStream = fs.createReadStream('ETL/atelier_data/product.csv');
const writeStream = fs.createWriteStream('ETL/transformed_data/product.csv');

function capitalizeWords(string) {
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const requiredKeys = ['id', 'name', 'slogan', 'description', 'category', 'default_price'];
    const expectedLength = requiredKeys.length;
    if (Object.keys(chunk).length > expectedLength) {
      console.log(`skipping row, expected ${expectedLength} length but received ${Object.keys(chunk).length} length`);
    } else {
      const missingKeys = requiredKeys.filter((key) => !(key in chunk));
      if (missingKeys.length > 0) {
        console.log('skipping row: missing required keys');
      } else {
        const row = {
          id: Number(chunk.id),
          campus: 'hr-rfp',
          name: capitalizeWords(chunk.name),
          slogan: chunk.slogan,
          description: chunk.description,
          category: capitalizeWords(chunk.category),
          default_price: chunk.default_price,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        this.push(csvStringifier.stringifyRecords([row]));
      }
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
  .on('finish', () => { console.log('Finished transforming products'); });

// Checks the first row of uncleaned product csv file
// console.log(process.cwd());
// fs.createReadStream('ETL/atelier_data/product.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//     process.exit(0);
//   })
//   .on('end', () => {
//     console.log('Finished reading file!');
//   });
