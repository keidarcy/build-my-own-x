const mock = {
  fn: (implementation) => {
    const mockFn = () => {
      mockFn.calls.push([]);
      implementation?.();
    };
    mockFn._isMockFunction = true;
    mockFn.calls = [];
    return mockFn;
  },
};

module.exports = { mock };
