import { csv } from 'csvtojson';
import * as fs from 'fs';
import { Transform, pipeline } from 'stream';

const csvFilePath = './csv/books.csv';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream('./converted-csv.txt');
const convertStream = new Transform({
  transform(chunk, encoding, callback) {
    const object = JSON.parse(String(chunk));
    const line = Object.keys(object).reduce((acc, key) => {
      acc[key.toLowerCase()] = object[key];
      return acc;
    }, {});
    delete line['amount'];
    callback(null, `${JSON.stringify(line)}\n`);
  },
});

pipeline(readStream, csv(), convertStream, writeStream, (err) => {
  if (err) {
    console.log(err);
  }
});
