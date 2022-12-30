import path from 'node:path';
import { Opts } from './opt';

export enum Operation {
  Print,
  Add,
  Remove,
}

export type Config = {
  args: string[];
  operation: Operation;
  config: string;
  pwd: string;
};


export default function config(opts: Opts): Config {
  const args = getArgs(opts);
  const operation = getOperation(opts);
  const config = getConfig(opts);

  return {
    pwd: getPwd(opts),
    args,
    operation,
    config,
  };
}

function getPwd(opts: Opts): string {
  if (opts.pwd) {
    return opts.pwd;
  }
  return process.cwd();
}

function getConfig(opts: Opts): string {
  if (opts.config) {
    return opts.config;
  }
  const home = process.env["HOME"];
  const loc = process.env["XDG_CONFIG_HOME"] || home;

  if (!loc) {
    throw new Error("Could not find config location");
  }

  if (loc === home) {
    // return path.join(loc, ".projector.json"); // ~/.projector.json
    return path.join(loc, "config/projector", "projector.json"); // ~/config/projector/projector.json
  }

  return path.join(loc, "projector", "projector.json");
}

function getArgs(opts: Opts): string[] {
  if (!opts.args || opts.args.length === 0) {
    return [];
  }
  const operation = getOperation(opts);
  if (operation === Operation.Print) {
    if (opts.args.length > 1) {
      throw new Error(`Expected 0 or 1 arguments, but got ${opts.args.length}`);
    }
    return opts.args;
  }

  if (operation === Operation.Add) {
    if (opts.args.length !== 3) {
      throw new Error(`Expected 2 arguments, but got ${opts.args.length - 1}`);
    }
    return opts.args.slice(1);
  }

  // operation === Operation.Remove
  if (opts.args.length !== 2) {
    throw new Error(`Expected 1 arguments, but got ${opts.args.length - 1}`);
  }
  return opts.args.slice(1);
}

function getOperation(opts: Opts): Operation {
  if (!opts.args || opts.args.length === 0) {
    return Operation.Print;
  }

  if (opts.args[0] === "add") {
    return Operation.Add;
  }

  if (opts.args[0] === "rm") {
    return Operation.Remove;
  }

  return Operation.Print;
}

