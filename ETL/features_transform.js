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
    { id: 'value', title: 'value' },
  ],
});

const readStream = fs.createReadStream('ETL/atelier_data/features.csv');
const writeStream = fs.createWriteStream('ETL/transformed_data/features.csv');

let errorCount = 0;
let successCount = 0;

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const requiredKeys = ['id', 'product_id', 'feature'];
    const missingKeys = requiredKeys.filter((key) => !(key in chunk));
    if (missingKeys.length > 0) {
      errorCount++;
    } else {
      successCount++;
      const row = {
        id: Number(chunk.id),
        product_id: Number(chunk.product_id),
        name: chunk.feature,
        value: chunk.value,
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
  .on('finish', () => { console.log(`Finished transforming features, error rate is ${(errorCount) / (errorCount + successCount)}`); });
