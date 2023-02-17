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

let errorCount = 0;
let successCount = 0;

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  // error count is 0/1000011

  _transform(chunk, encoding, next) {
    const requiredKeys = ['id', 'name', 'slogan', 'description', 'category', 'default_price'];
    const expectedLength = requiredKeys.length;
    const missingKeys = requiredKeys.filter((key) => !(key in chunk));
    if (Object.keys(chunk).length > expectedLength) {
      errorCount++;
    } else if (missingKeys.length > 0) {
      errorCount++;
    } else {
      successCount++;
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
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on('finish', () => { console.log(`Finished transforming products, error rate is ${(errorCount) / (errorCount + successCount)}`); });

// // Checks the first row of uncleaned product csv file
// // console.log(process.cwd());
// fs.createReadStream('ETL/atelier_data/product.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//     process.exit(0);
//   })
//   .on('end', () => {
//     console.log('Finished reading file!');
//   });
