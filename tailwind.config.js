const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Manrope", ...defaultTheme.fontFamily.sans],
				heading: ["Syne", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
