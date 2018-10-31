const program = require('commander');
const fs = require('fs');
const runTest = require('./test');

let arguementsMissing = true;

program
  .version(JSON.parse(fs.readFileSync(`${__dirname}/../package.json`, 'utf8')).version)
  .arguments('<testfile>')
  .action((testfile) => {
    if (testfile) {
      arguementsMissing = false
    }
    runTest(testfile);
  })
  .parse(process.argv);

if (arguementsMissing) {
  console.error('error: missing required argument `testfile\'');
  process.exit(1);
}
