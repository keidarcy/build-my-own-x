expect(() => {
  throw new Error('it does throw');
}).toThrow();

expect(() => {
  console.log('object');
}).not.toThrow();
