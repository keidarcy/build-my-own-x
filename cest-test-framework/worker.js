const fs = require('fs');

exports.runTest = async (testFile) => {
  const code = await fs.promises.readFile(testFile, 'utf8');
  const testResult = {
    success: true,
    errorMessage: null,
  };
  try {
    eval(code);
  } catch (error) {
    testResult.success = false;
    testResult.errorMessage = error.message;
  }
  return testResult;
};
