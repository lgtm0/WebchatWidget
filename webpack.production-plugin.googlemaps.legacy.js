const path = require("path");

const config = require('./webpack.production');

config.entry.unshift('whatwg-fetch', 'url-polyfill', 'idempotent-babel-polyfill');
config.output.filename = 'webchat.legacy.js';
config.module.rules.find(rule => rule.loader === 'babel-loader').options.presets.unshift('@babel/preset-env');
config.target = ['web', 'es5'];

config.output.filename = "googlemaps.webchat-plugin.legacy.js";

config.resolve.alias = {
	react: path.resolve(__dirname, "alias/react"),
};

config.entry = "./src/plugins/googlemaps/index.tsx";

config.target = ['web', 'es5'];

module.exports = config;
