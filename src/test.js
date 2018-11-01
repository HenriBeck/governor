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

    console.log(`Running Test #${index + 1}`);
    const instance = child_process.spawnSync(binaryPath, args.trim().split(' '));
    let result = instance.stderr.toString() !== '' ? instance.stderr.toString() : instance.stdout.toString();
    result = result.trim();

    return checkResult(test, result);
  }).reduce((acc, current) => acc + current, 0);

  if (testsFailed === 0) {
    console.log('All tests OK');
  } else {
    console.log(`Failed ${testsFailed}/${config.tests.length} tests`);
  }
};
