import { createHelpers } from "../helpers/helper-provider.js";

export default {
	name: "boilersuit",
	run: async (toolbox) => {
		const { print } = toolbox;
		const helpers = createHelpers(toolbox);

		print.newline();

		// First, we ensure that the directory is empty.
		helpers.ensureEmptyDirectory({
			errorMessage: "Please ensure the current directory is empty, as we will be cloning the boilerplate into it.",
		});
	},
};
