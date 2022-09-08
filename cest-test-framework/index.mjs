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
import { runTest } from './worker.js';
import chalk from 'chalk';

const worker = new Worker(join(root, 'worker.js'), {
  enableWorkerThreads: true,
});

const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js']);
// loop a set
for (const testFile of testFiles) {
  const { success, errorMessage } = await worker.runTest(testFile);
  const status = success ? chalk.green.inverse('PASS') : chalk.red.inverse('FAIL');
  console.log(status + ' ' + relative(root, testFile));
  if (!success) {
  }
}

worker.end();
