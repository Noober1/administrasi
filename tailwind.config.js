module.exports = {
	important: true,
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class',
	theme: {
		extend: {
			screens: {
				'print': {'raw': 'print'}
			}
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
