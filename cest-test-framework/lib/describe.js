let testName = '';
const describeFns = [];
let currentDescribeFns = [];
const describe = (name, fn) => {
  describeFns.push([name, fn]);
};
const it = (name, fn) => {
  currentDescribeFns.push([name, fn]);
};
const run = () => {
  for (const [name, fn] of describeFns) {
    currentDescribeFns = [];
    testName = name;
    fn();

    for (const [itName, itFn] of currentDescribeFns) {
      testName += ' ' + itName;
      itFn();
    }
  }
};

module.exports = { describe, it, run, testName };
