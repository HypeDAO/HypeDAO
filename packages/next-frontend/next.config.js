const withTM = require('next-transpile-modules')(['react-markdown']);
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

function webpack(config) {
	config.module.rules.push({
		test: /\.svg$/,
		use: ["@svgr/webpack"]
	});
	return config;
}

const testnetConfig = {
	reactStrictMode: true,
	webpack,
	env: {
		network: 'testnet',
		tokenContract: 'hype.tokens.testnet'
	}
}

const mainnetConfig = {
	reactStrictMode: true,
	webpack,
	env: {
		network: 'mainnet',
		tokenContract: 'hype.tkn.near'
	}
}

module.exports = (phase, { defaultConfig }) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return withTM(testnetConfig)
	}
	return withTM(mainnetConfig)
}
