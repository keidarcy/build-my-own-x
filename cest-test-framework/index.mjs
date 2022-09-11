// import glob from 'glob';

// const testFiles = glob.sync('**/*.test.js');

// console.log(testFiles); // ['tests/01.test.js', 'tests/02.test.js', …]

import HasteMap from 'jest-haste-map';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { cpus } from 'os';

const root = dirname(fileURLToPath(import.meta.url));

const hasteMapOptions = {
  rootDir: root,
  roots: [root],
  maxWorkers: cpus().length,
  platforms: [],
  extensions: ['js', '.jsx', '.ts', '.tsx'],
  name: 'cest-testing-framework',
};

const hasteMap = new HasteMap.default(hasteMapOptions);

await hasteMap.setupCachePath(hasteMapOptions);

const { hasteFS } = await hasteMap.build();
import { Worker } from 'jest-worker';
import chalk from 'chalk';

const worker = new Worker(join(root, 'worker.js'), {
  enableWorkerThreads: true,
});

const testFiles = hasteFS.matchFilesWithGlob([
  process.argv[2] ? `**/${process.argv[2]}` : '**/*.test.js',
]);
let hasFailed = false;
// loop a set
for await (const testFile of testFiles) {
  const { success, testResults, errorMessage } = await worker.runTest(testFile);
  const status = success
    ? chalk.green.inverse.bold(' PASS ')
    : chalk.red.inverse.bold(' FAIL ');
  console.log(status + '\n' + chalk.dim(relative(root, testFile)) + '\n');
  if (!success) {
    hasFailed = true;
    if (testResults) {
      testResults
        .filter((result) => result.errors.length)
        .forEach((result) => {
          console.log(result.testPath.slice(1).join(' \n') + result.errors[0]);
        });
    } else if (errorMessage) {
      console.log('  ' + errorMessage);
    }
  }
}

// await Promise.all(
//   Array.from(testFiles).map(async (testFile) => {
//     const { success, errorMessage } = await worker.runTest(testFile);
//     const status = success
//       ? chalk.green.inverse.bold(' PASS ')
//       : chalk.red.inverse.bold(' FAIL ');

//     console.log(status + '\n' + chalk.dim(relative(root, testFile)) + '\n');
//     if (!success) {
//       console.log('  ' + errorMessage);
//     }
//   }),
// );

worker.end();

if (hasFailed) {
  console.log(chalk.red.bold('The test run failed'));
  process.exit(1);
}
