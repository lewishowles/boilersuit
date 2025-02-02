import { createHelpers } from "../helpers/helper-provider.js";

export default {
	name: "boilersuit",
	run: async (toolbox) => {
		const { filesystem, print, prompt } = toolbox;
		const helpers = createHelpers(toolbox);

		print.newline();

		const result = await prompt.ask([
			{
				type: "input",
				name: "projectName",
				message: "Project name",
				initial: "my-super-cool-project",
			},
		]);

		// Create the appropriate directory.
		filesystem.dir(result.projectName);

		// Change to our new directory to simplify future commands.
		process.chdir(result.projectName);

		// First, we ensure that the directory is empty.
		helpers.ensureEmptyDirectory({
			errorMessage: `Please ensure project directory ${result.projectName} is empty, as we will be cloning the boilerplate into it.`,
		});

		print.newline();

		// Clone our boilerplate.
		helpers.cloneRepo({
			url: "https://github.com/lewishowles/boilerplate",
			successMessage: "`boilerplate` downloaded successfully",
		});
	},
};
