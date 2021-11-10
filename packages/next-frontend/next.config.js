const withTM = require('next-transpile-modules')(['react-markdown']);
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

function webpack(config) {
	config.module.rules.push({
		test: /\.svg$/,
		use: ["@svgr/webpack"],
	});
	return config;
}

const testnetConfig = {
	reactStrictMode: true,
	webpack,
	env: {
		network: 'testnet',
		tokenContract: 'hype.tokens.testnet',
		daoContract: 'hype.dev-1633010067633-2472687'
	}
}

const mainnetConfig = {
	reactStrictMode: true,
	webpack,
	env: {
		network: 'mainnet',
		tokenContract: 'hype.tkn.near',
		daoContract: 'hype.sputnik-dao.near'
	}
}

module.exports = (phase, { defaultConfig }) => {
	if (process.env.NEAR_ENV === 'mainnet')
		return withTM(mainnetConfig)
	return withTM(testnetConfig)
}
