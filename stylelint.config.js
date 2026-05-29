/** @type {import("stylelint").Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'scss/dollar-variable-pattern': '^([_-]?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',

		// Stylelint cannot fully validate SCSS-interpolated custom property names like
		// --#{namespace-prefix()}container-padding. It only sees "#{namespace-prefix",
		// so this rule enforces the required namespace function fragment.
		'custom-property-pattern': '^#\\{namespace-prefix$'
	}
};
