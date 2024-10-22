const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = function override(config, env) {
  if (env === 'production') {
    config.plugins.push(
      new JavaScriptObfuscator({
        rotateStringArray: true,
        stringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayThreshold: 0.75,
      }, ['excluded_bundle_name.js'])
    );
  }
  return config;
};