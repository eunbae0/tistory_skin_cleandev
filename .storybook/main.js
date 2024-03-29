module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|ts)"],
	staticDirs: ["../dist"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: "@storybook/html",
	core: {
		builder: "@storybook/builder-webpack5",
	},
};
