const fs = require('fs');
const expect = require('expect').default;
const mock = require('jest-mock');
const { describe, it, run, resetState } = require('jest-circus');
const vm = require('vm');
const NodeEnvironment = require('jest-environment-node').default;
const { dirname, join, basename } = require('path');

exports.runTest = async (testFile) => {
  const code = await fs.promises.readFile(testFile, 'utf8');
  const testResult = {
    success: false,
    errorMessage: null,
  };
  try {
    const customRequire = (filename) => {
      const code = fs.readFileSync(join(dirname(testFile), filename), 'utf-8');
      const module = { exports: {} };
      const moduleFactory = vm.runInContext(
        `( function(module){ ${code}} )`,
        environment.getVmContext(),
      );
      moduleFactory(module);
      return module.exports;
      // return vm.runInContext(
      //   `const module = {exports: {}};\n${code}; module.exports`,
      //   environment.getVmContext(),
      // );
    };

    // 1. eval solution
    // eval(code);

    // 2. vm solution
    // const context = { describe, it, expect, mock, setTimeout };
    // vm.createContext(context);
    // resetState();
    // vm.runInContext(code, context);

    // 3. jest-environment-node
    const environment = new NodeEnvironment({
      projectConfig: {
        testEnvironmentOptions: {
          describe,
          it,
          expect,
          mock,
          require: customRequire,
        },
      },
    });
    resetState();
    customRequire(basename(testFile));
    // vm.runInContext(code, environment.getVmContext());

    const { testResults } = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);
  } catch (error) {
    testResult.errorMessage = error.message;
  }
  return testResult;
};

// const fs = require('fs');
// const { mock } = require('./lib/mock');
// const { expect } = require('./lib/expect');
// const { describe, it, run, testName } = require('./lib/describe');

// exports.runTest = async (testFile) => {
//   const code = await fs.promises.readFile(testFile, 'utf8');
//   const testResult = {
//     success: false,
//     errorMessage: null,
//   };
//   try {
//     eval(code);
//     run();
//     testResult.success = true;
//   } catch (error) {
//     testResult.errorMessage = testName + ': ' + error.message;
//   }
//   return testResult;
// };
