import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "./config/eslint/stylistic.js";

export default [
	{
		ignores: ["**/dist/*"],
	},
	{
		files: ["**/*.js"],
	},
	{
		languageOptions: {
			globals: globals.node,
			ecmaVersion: 2021,
		},
	},
	pluginJs.configs.recommended,
	stylistic,
];
