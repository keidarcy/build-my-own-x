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
