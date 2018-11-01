const fs = require('fs');
const path = require('path')
const yaml = require('js-yaml');
const child_process = require('child_process');

const { checkConfig, checkResult } = require('./utils');

module.exports = (testfile) => {
  let config;
  if (!testfile.endsWith('.yaml')) {
    testfile += '.yaml';
  }
  try {
    config = yaml.safeLoad(fs.readFileSync(`${process.cwd()}/${testfile}`));
  } catch (e) {
    console.log('Error: Failed to load testfile');
    console.error(e);
    process.exit(1);
  }

  checkConfig(config);

  const binaryPath = `${path.dirname(testfile)}/${config.binary}`;

  const testsFailed = config.tests.map((test, index) => {
    let args = test.args ? ` ${test.args}` : '';

    console.log(`Running Test #${index}`);
    let result;
    try {
      result = child_process.execSync(binaryPath + args);
    } catch (e) {
      result = e.stderr;
    }

    return checkResult(test, result);
  }).reduce((acc, current) => acc + current, 0);

  if (testsFailed === 0) {
    console.log('All tests OK');
  } else {
    console.log(`Failed ${testsFailed}/${config.tests.length} tests`);
  }
};
