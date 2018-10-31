const program = require('commander');
const fs = require('fs');
const runTest = require('./test');

let arguementsMissing = true;

program
  .version('0.0.1')
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
