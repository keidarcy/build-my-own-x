const { transformSync } = require('@babel/core');

exports.transformFile = function (code) {
  return {
    code: transformSync(code, {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    }).code,
  };
};
