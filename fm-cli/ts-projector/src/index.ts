import getOpts from "./opt";
import getConfig, { Operation } from './config'
import Projector from './projector'




const opts = getOpts();
const config = getConfig(opts);
const projector = Projector.fromConfig(config);

if (config.operation === Operation.Print) {
  if (config.args.length === 0) {
    console.log(JSON.stringify(projector.getValueAll()))
  } else {
    const value = projector.getValue(config.args[0]);
    if (value) {
      console.log(value)
    }
  }
}

if (config.operation === Operation.Add) {
  projector.setValue(config.args[0], config.args[1]);
  projector.save();
}

if (config.operation === Operation.Remove) {
  projector.removeValue(config.args[0]);
  projector.save();
}


