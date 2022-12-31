import fs from 'node:fs';
import path from 'node:path';
import { Config } from './config';

export type Data = {
  projector: {
    // pwd
    [key: string]: {
      // key          => value
      [key: string]: string
    }
  }
}

const defaultData = {
  projector: {
  }
}

export default class Projector {
  constructor(private config: Config, private data: Data) { }

  getValueAll(): { [key: string]: string } {
    let curr = this.config.pwd;
    let prev = "";

    const paths: string[] = [];
    do {
      prev = curr;
      paths.push(curr);
      curr = path.dirname(curr);
    } while (curr !== prev);
    const result = paths.reverse().reduce((acc, path) => {
      const value = this.data?.projector[path];
      if (value) {
        Object.assign(acc, value);
      }
      return acc;
    }, {});
    return result;
  }

  getValue(key: string): string | undefined {
    let curr = this.config.pwd;
    let prev = "";

    let out: string = "";

    do {
      const value = this.data?.projector[curr]?.[key];
      if (value) {
        out = value;
        break;
      }
      prev = curr;
      curr = path.dirname(curr);
    } while (curr !== prev);

    return out;
  }

  setValue(key: string, value: string) {
    let dir = this.data?.projector[this.config.pwd];
    if (!dir) {
      dir = {};
      this.data.projector[this.config.pwd] = dir;
    }
    dir[key] = value;
  }

  removeValue(key: string) {
    let dir = this.data?.projector[this.config.pwd];
    if (dir) {
      delete dir[key];
    }
  }

  save() {
    const configPath = path.dirname(this.config.config);
    if (!fs.existsSync(configPath)) {

      fs.mkdirSync(configPath, { recursive: true });
    }
    fs.writeFileSync(this.config.config, JSON.stringify(this.data));
  }

  static fromConfig(config: Config): Projector {
    let data: Data = { projector: {} };
    if (fs.existsSync(config.config)) {
      try {
        data = JSON.parse(fs.readFileSync(config.config, 'utf-8').toString());
      } catch (error) {
        data = defaultData;
        return new Projector(config, data);
      }
    }
    return new Projector(config, data);
  }
}
