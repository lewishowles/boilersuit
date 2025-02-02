import { createHelpers } from "../helpers/helper-provider.js";

export default {
	name: "boilersuit",
	run: async (toolbox) => {
		const { filesystem, print, prompt } = toolbox;
		const helpers = createHelpers(toolbox);

		print.newline();

		// Prompt for the project name
		const packageNameResponse = await prompt.ask({
			type: "input",
			name: "packageName",
			message: "Project name",
			initial: "my-super-cool-project",
		});

		// Use the provided project name to set the initial value for the site title
		const placeholdersResponse = await prompt.ask([
			{
				type: "input",
				name: "siteTitle",
				message: "Site title",
				initial: packageNameResponse.packageName.charAt(0).toUpperCase() + packageNameResponse.packageName.slice(1).replace(/-/g, " ").toLowerCase(),
			},
			{
				type: "input",
				name: "siteDescription",
				message: "Site description",
			},
			{
				type: "input",
				name: "siteUrl",
				message: "Site URL",
				initial: `https://lewishowles.github.io/${packageNameResponse.packageName.toLowerCase()}/`,
			},
			{
				type: "input",
				name: "themeColour",
				message: "Theme colour",
				initial: "#a3004c",
			},
			{
				type: "input",
				name: "baseUrl",
				message: "Base URL",
				initial: `/${packageNameResponse.packageName.toLowerCase()}/`,
			},
		]);


		// Create the appropriate directory.
		filesystem.dir(packageNameResponse.packageName);

		// Change to our new directory to simplify future commands.
		process.chdir(packageNameResponse.packageName);

		// First, we ensure that the directory is empty.
		helpers.ensureEmptyDirectory({
			errorMessage: `Please ensure project directory <${packageNameResponse.packageName}> is empty, as we will be cloning the boilerplate into it.`,
		});

		print.newline();

		// Clone our boilerplate.
		helpers.cloneRepo({
			url: "https://github.com/lewishowles/boilerplate",
			successMessage: "`boilerplate` downloaded successfully",
		});

		// Replace placeholders
		const replacements = {
			PACKAGE_NAME: packageNameResponse.packageName,
			SITE_TITLE: placeholdersResponse.siteTitle,
			SITE_DESCRIPTION: placeholdersResponse.siteDescription,
			SITE_URL: placeholdersResponse.siteUrl,
			THEME_COLOUR: placeholdersResponse.themeColour,
			BASE_URL: placeholdersResponse.baseUrl,
		};

		helpers.replacePlaceholders({ replacements });
	},
};
