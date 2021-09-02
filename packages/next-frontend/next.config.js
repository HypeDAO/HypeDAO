const withTM = require('next-transpile-modules')(['react-markdown']);
module.exports = withTM({
	reactStrictMode: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

		return config;
	}
})