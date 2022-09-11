const banana = require('./banana.js');
const apple = require('./apple.js');

it('tastes good', () => {
  expect(banana).toBe('good');
});

it('tastes good', () => {
  expect(apple).toBe('good');
});

describe('describe test 1', () => {
  it('works', () => {
    expect(1).toBe(1);
  });
});

describe('describe test 2', () => {
  it('works', () => {
    expect(2).toBe(2);
  });
});

describe('describe test 3', () => {
  it("doesn't works", async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 200),
    );
  });
});
