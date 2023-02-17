/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const { Transform } = require('stream');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'quantity', title: 'quantity' },
    { id: 'size', title: 'size' },
    { id: 'styleId', title: 'styleId' },
  ],
});

const readStream = fs.createReadStream('ETL/atelier_data/skus.csv');
const writeStream = fs.createWriteStream('ETL/transformed_data/skus.csv');

function isSizeValid(size) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  return sizes.includes(size);
}

let errorCount = 0;
let successCount = 0;

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const requiredKeys = ['id', 'quantity', 'size', 'styleId'];
    const expectedLength = requiredKeys.length;
    const missingKeys = requiredKeys.filter((key) => !(key in chunk));
    if (Object.keys(chunk).length > expectedLength) {
      errorCount++;
    } else if (missingKeys.length > 0) {
      errorCount++;
    } else if (!isSizeValid(chunk.size)) {
      errorCount++;
    } else {
      successCount++;
      const row = {
        id: Number(chunk.id),
        styleId: Number(chunk.styleId),
        size: chunk.size,
        quantity: chunk.quantity,
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
  .on('finish', () => { console.log(`Finished transforming skus, error rate is ${(errorCount) / (errorCount + successCount)}`); });
