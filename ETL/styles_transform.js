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
    { id: 'sale_price', title: 'sale_price' },
    { id: 'original_price', title: 'original_price' },
    { id: 'default_style', title: 'default_style' },
  ],
});

const readStream = fs.createReadStream('ETL/atelier_data/styles.csv');
const writeStream = fs.createWriteStream('ETL/transformed_data/styles.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    const requiredKeys = ['id', 'productId', 'name', 'original_price'];
    const missingKeys = requiredKeys.filter((key) => !(key in chunk));
    if (missingKeys.length > 0) {
      console.log('skipping row: missing required keys');
    } else {
      const row = {
        id: Number(chunk.id),
        productId: Number(chunk.productId),
        name: chunk.name,
        sale_price: chunk.sale_price,
        original_price: chunk.original_price,
        default_style: `${chunk.default_style === '1'}`,
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
  .on('finish', () => { console.log('Finished transforming styles'); });
