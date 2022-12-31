import { Operation } from './config';
import Projector, { Data } from './projector';

function getData(): Data {
  return {
    "projector": {
      "/": {
        "foo": "bar1",
      },
      "/foo": {
        "foo": "bar2",
      },
      "/foo/bar": {
        "foo": "bar3",
        "bar": "foo3",
      },
    }
  }
}

function getProjector(pwd: string, data = getData()): Projector {
  return new Projector({
    pwd,
    args: [],
    operation: Operation.Print,
    config: "HELLO WORLD",
  }, data);
}



it("getValueAll", () => {
  const projector = getProjector("/foo/bar");
  expect(projector.getValueAll()).toEqual({
    "foo": "bar3",
    "bar": "foo3",
  });
})

it("getValue", () => {
  let projector = getProjector("/foo/bar");
  expect(projector.getValue("foo")).toEqual("bar3");
  expect(projector.getValue("bar")).toEqual("foo3");

  projector = getProjector("/");
  expect(projector.getValue("foo")).toEqual("bar1");

  projector = getProjector("/foo");
  expect(projector.getValue("foo")).toEqual("bar2");
})

it("setValue", () => {
  let data = getData();
  let projector = getProjector("/foo/bar", data);
  projector.setValue("foo", "baz");

  expect(projector.getValue("foo")).toEqual("baz");
  projector.setValue("foo4", "baz4");
  expect(projector.getValue("foo4")).toEqual("baz4");

  projector = getProjector("/", data);
  expect(projector.getValue("foo")).toEqual("bar1");
})

it("removeValue", () => {
  const projector = getProjector("/foo/bar", getData());
  projector.removeValue("foo");
  expect(projector.getValue("foo")).toEqual("bar2");
  projector.removeValue("bar");
  expect(projector.getValue("bar")).toEqual("");
})
