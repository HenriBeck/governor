const checkConfig = config => {
  if (!config.binary) {
    throw Error('`binary` field is missing in config');
  }
  if (!config.tests) {
    throw Error('`tests` field is missing in config');
  }
  if (!Array.isArray(config.tests)) {
    throw Error('`tests` field is not an array');
  }
};

const checkResult = (test, result) => {
  if (test.output) {
    if (!result.includes(test.output)) {
      console.log('Failed!');
      console.log(`Expected: ${test.output}`);
      console.log(`Output:   ${result}`);
      return 1;
    }
  }

  return 0;
};

module.exports = {
  checkConfig,
  checkResult
};
