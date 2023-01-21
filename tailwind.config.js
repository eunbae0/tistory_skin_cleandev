/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./dist/skin.html", "./src/stories/**/*.ts"],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/line-clamp"),
		require("tailwind-scrollbar")({ nocompatible: true }),
	],
	variants: {
		scrollbar: ["rounded"],
	},
	darkMode: "class",
};
