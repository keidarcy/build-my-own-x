import JestHasteMap from 'jest-haste-map';
import { dirname, join } from 'path';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import chalk from 'chalk';
import fs from 'fs';
import Resolver from 'jest-resolve';
import { DependencyResolver } from 'jest-resolve-dependencies';
import { Worker } from 'jest-worker';

const root = join(dirname(fileURLToPath(import.meta.url)), 'product');

const hasteMapOptions = {
  extensions: ['js'],
  name: 'cest-bundler',
  platforms: [],
  roots: [root],
  rootDir: root,
  maxWorkers: cpus().length,
};
const hasteMap = new JestHasteMap.default(hasteMapOptions);

await hasteMap.setupCachePath(hasteMapOptions);
const { hasteFS, moduleMap } = await hasteMap.build();
const worker = new Worker(join(dirname(fileURLToPath(import.meta.url)), './worker'), {
  enableWorkerThreads: true,
});

const options = yargs(process.argv).argv;

const entryPoint = options.entryPoint;

// console.log(hasteFS.getAllFiles());

if (!entryPoint || !hasteFS.exists(entryPoint)) {
  console.log(chalk.red(`--entry-point does not exist`));
  process.exit(1);
}

console.log(chalk.bold(`❯ Building ${chalk.blue(options.entryPoint)}`));

const resolver = new Resolver.default(moduleMap, {
  extensions: ['.js'],
  hasCoreModules: false,
  rootDir: root,
});

const dependencyResolver = new DependencyResolver(resolver, hasteFS);

const queue = [entryPoint];
const modules = new Map();

let id = 0;
while (queue.length) {
  const module = queue.shift();
  // prevent
  if (modules.has(module)) {
    continue;
  }
  // console.log('    hasteFS:', hasteFS.getDependencies(module));

  const dependecyMap = new Map(
    hasteFS
      .getDependencies(module)
      .map((dependencyName) => [
        dependencyName,
        resolver.resolveModule(module, dependencyName),
      ]),
  );
  const code = fs.readFileSync(module, 'utf8');
  // const moduleBody = code.match(/module\.exports\s+=\s(.*?);/i)?.[1] || '';

  const metadata = {
    id: id++,
    code,
    dependecyMap,
  };
  modules.set(module, metadata);
  queue.push(...dependencyResolver.resolve(module));
}

const wrapModule = (id, code) =>
  `define(${id}, function(module, exports, require) {\n${code}\n})`;

const results = await Promise.all(
  Array.from(modules)
    .reverse()
    .map(async ([module, { id, code, dependecyMap }]) => {
      ({ code } = await worker.transformFile(code));
      for (const [dependecyName, dependecyPath] of dependecyMap) {
        code = code.replace(
          new RegExp(`require\\(('|")${dependecyName.replace(/[\.\/]/g, '\\$&')}\\1\\)`),
          `require(${modules.get(dependecyPath).id})`,
        );
      }
      return wrapModule(id, code);
    }),
);
// for (const [module, metadata] of Array.from(modules).reverse()) {
//   let { code, id } = metadata;
//   code = worker.transformFile(code);
//   for (const [dependecyName, dependecyPath] of metadata.dependecyMap) {
//     code = code.replace(
//       new RegExp(`require\\(('|")${dependecyName.replace(/[\.\/]/g, '\\$&')}\\1\\)`),
//       `require(${modules.get(dependecyPath).id})`,
//     );
//   }
//   output.push(wrapModule(id, code));
// }

// output.unshift(fs.readFileSync('./require.js', 'utf8'));
// output.push('requireModule(0)');
const output = [fs.readFileSync('./require.js', 'utf-8'), ...results, 'requireModule(0)'];
if (options.output) {
  fs.writeFileSync(options.output, output.join('\n'));
}
// console.log(modules.get(entryPoint).code.replace(/\'\s\'\s\+/g, ''));

// console.log(chalk.bold(`❯ Found ${chalk.blue(seen.size)} files`));

// console.log('Array.from(allFiles):', Array.from(seen));

// console.log(chalk.bold(`❯ Seralizing bundle`));

// const allCode = [];
// await Promise.all(
//   Array.from(seen).map(async (file) => {
//     const code = await fs.promises.readFile(file, 'utf-8');
//     allCode.push(code);
//   }),
// );
// console.log('allCode:', allCode);

worker.end();
