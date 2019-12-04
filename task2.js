import fs from 'fs';
import csv from 'csvtojson';

(function() {
    fs.readFileSync('./csv/input_example.csv', 'utf-8');

csv()
.fromFile('./csv/input_example.csv')
.subscribe((json) => {
  return new Promise((resolve, reject) => {
    fs.appendFile('result.txt', `${JSON.stringify(json)}\n`, (err) => {
        if (err) reject(err);
    })
    resolve();
  })
}, (er) => console.error('ERROR', er), () => console.log('success!'))
})();


