const modules = new Map();

const define = (name, moduleFactory) => {
  modules.set(name, moduleFactory);
};

const moduleCache = new Map();

const requireModule = (name) => {
  if (moduleCache.has(name)) {
    return moduleCache.get(name).exports;
  }

  const module = {
    exports: {},
  };

  const moduleFactory = modules.get(name);
  moduleCache.set(name, module);
  moduleFactory(module, module.exports, requireModule);

  return module.exports;
};

define(5, function(module, exports, require) {
"use strict";

module.exports = 'tomato';
})
define(4, function(module, exports, require) {
"use strict";

module.exports = 'melon';
})
define(3, function(module, exports, require) {
"use strict";

module.exports = 'kiwi ' + require(4) + ' ' + require(5);
})
define(2, function(module, exports, require) {
"use strict";

module.exports = 'banana ' + require(3);
})
define(1, function(module, exports, require) {
"use strict";

var _banana = _interopRequireDefault(require(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = 'apple ' + _banana.default + ' ' + require(3);
})
define(0, function(module, exports, require) {
"use strict";

console.log(require(1));
})
requireModule(0)