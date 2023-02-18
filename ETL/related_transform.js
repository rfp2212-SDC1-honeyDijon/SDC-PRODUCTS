/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const { Transform } = require('stream');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'current_product_id', title: 'current_product_id' },
    { id: 'related_product_id', title: 'related_product_id' },
  ],
});

const readStream = fs.createReadStream('ETL/atelier_data/related.csv');
const writeStream = fs.createWriteStream('ETL/transformed_data/related.csv');

let errorCount = 0;
let successCount = 0;

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const requiredKeys = ['id', 'current_product_id', 'related_product_id'];
    const missingKeys = requiredKeys.filter((key) => !(key in chunk));
    if (Object.keys(chunk).length !== requiredKeys.length) {
      errorCount++;
    } else if (missingKeys.length > 0) {
      errorCount++;
    } else {
      successCount++;
      const row = {
        id: Number(chunk.id),
        current_product_id: Number(chunk.current_product_id),
        related_product_id: Number(chunk.related_product_id),
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
  .on('finish', () => { console.log(`Finished transforming related, error rate is ${(errorCount) / (errorCount + successCount)}`); });
