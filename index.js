const fs = require('fs');
const request = require('request');
const zlib = require("zlib");
const pump = require('pump');
const es = require('event-stream');

function lineProcessor(line, cb) {
  //do something with the line 
  return cb(null, line)
}

const uuid = '0934a0b3-858d-430c-a5c9-ea459104a392';
const gunzip = zlib.createGunzip();
const lineSplitterStream = es.split(/(\r?\n)/); //split stream to break on newlines
const lineProcessorStream = es.map(lineProcessor)


const options = {
  method: 'GET',
  url: `https://api.gdc.cancer.gov/data/${uuid}`,
}

return pump(
  request(options),
  gunzip,
  lineSplitterStream,
  lineProcessorStream,
  process.stdout
)

/**
 * This saves the file rather than processing it line by line 
 */
// const ws = fs.createWriteStream('test.txt');
// return pump(
//   request(options),
//   gunzip,
//   ws
// )
