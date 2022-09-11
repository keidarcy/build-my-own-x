const expect = (received) => ({
  toBe: (expected) => {
    if (received !== expected) {
      throw new Error(`Expected ${expected} but received ${received}`);
    }
  },
  toThrow: () => {
    let hasThrown = false;
    try {
      received();
    } catch (error) {
      hasThrown = true;
    }
    if (!hasThrown) {
      throw new Error('Expected to throw but did not');
    }
  },
  toContain: (expected) => {
    if (!received.includes(expected)) {
      throw new Error(`Received ${received} not contains ${expected}`);
    }
  },
  toBeGreaterThan: (expected) => {
    if (received <= expected) {
      throw new Error(`Received ${received} is not greater than ${expected}`);
    }
  },
  toHaveBeenCalled: () => {
    if (!received._isMockFunction) throw new Error('Not mock function');
    if (!received.calls.length) throw new Error('Function Not called');
  },
  not: {
    toThrow: () => {
      let hasThrown = false;
      try {
        received();
      } catch (error) {
        hasThrown = true;
      }
      if (hasThrown) {
        throw new Error('Expected to not throw but did');
      }
    },
    toHaveBeenCalled: () => {
      if (!received._isMockFunction) throw new Error('Not mock function');
      if (received.calls.length) throw new Error('Function has been called');
    },
  },
});

module.exports = { expect };
