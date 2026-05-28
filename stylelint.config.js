/** @type {import("stylelint").Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'scss/dollar-variable-pattern': '^_?[a-z][a-z0-9-]*$',
		'custom-property-pattern': null
	}
};
