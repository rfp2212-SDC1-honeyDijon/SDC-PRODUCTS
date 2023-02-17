/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const { Transform } = require('stream');

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'thumbnail_url', title: 'thumbnail_url' },
    { id: 'url', title: 'url' },
    { id: 'style_id', title: 'style_id' },
  ],
});

const readStream = fs.createReadStream('ETL/atelier_data/skus.csv');
const writeStream = fs.createWriteStream('ETL/transformed_data/skus.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const row = {
      id: Number(chunk.id),
      product_id: Number(chunk.product_id),
      name: chunk.feature,
      value: chunk.value,
    };
    this.push(csvStringifier.stringifyRecords([row]));
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on('finish', () => { console.log('Finished transforming skus'); });
