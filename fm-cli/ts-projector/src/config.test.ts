import getConfig, { Operation } from './config';

it("simple print all", function() {
  const config = getConfig({});
  expect(config.operation).toEqual(Operation.Print);
  expect(config.args).toEqual([]);
});

it("print key", function() {
  const config = getConfig({
    args: ["foo"]
  });
  expect(config.operation).toEqual(Operation.Print);
  expect(config.args).toEqual(["foo"]);
});

it("add key", function() {
  const config = getConfig({
    args: ["add", "foo", "bar"]
  });
  expect(config.operation).toEqual(Operation.Add);
  expect(config.args).toEqual(["foo", "bar"]);
});

it("rm key", function() {
  const config = getConfig({
    args: ["rm", "foo"]
  });
  expect(config.operation).toEqual(Operation.Remove);
  expect(config.args).toEqual(["foo"]);
});
