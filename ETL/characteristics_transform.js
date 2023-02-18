/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const { Transform } = require('stream');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'product_id', title: 'product_id' },
    { id: 'name', title: 'name' },
  ],
});

const readStream = fs.createReadStream('ETL/atelier_data/characteristics.csv');
const writeStream = fs.createWriteStream('ETL/transformed_data/characteristics.csv');

let errorCount = 0;
let successCount = 0;

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const requiredKeys = ['id', 'product_id', 'name'];
    const missingKeys = requiredKeys.filter((key) => !(key in chunk));
    if (Object.keys(chunk).length !== requiredKeys.length) {
      errorCount++;
    } else if (missingKeys.length > 0) {
      errorCount++;
    } else if (!chunk.name.length) {
      errorCount++;
    } else {
      successCount++;
      const row = {
        id: Number(chunk.id),
        product_id: Number(chunk.product_id),
        name: chunk.name,
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
  .on('finish', () => { console.log(`Finished transforming characteristics, error rate is ${(errorCount) / (errorCount + successCount)}`); });
