const path = require("path");
const webpack = require('webpack');
const version = "0.2.5"

const config = require('./webpack.config');

config.mode = 'development';
config.plugins.push(
	new webpack.BannerPlugin({
		banner: `[file] v${version}`
	})
)

config.output.filename = "googlemaps.webchat-plugin.js";

config.resolve.alias = {
	react: path.resolve(__dirname, "alias/react"),
};

config.entry = "./src/plugins/googlemaps/index.tsx";

module.exports = config;
