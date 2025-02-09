import { createHelpers } from "../helpers/helper-provider.js";
import colors from "colors";

export default {
	name: "boilersuit",
	run: async (toolbox) => {
		const { filesystem, print } = toolbox;
		const helpers = createHelpers(toolbox);

		print.info(`
  _           _ _                     _ _
 | |         (_) |                   (_) |
 | |__   ___  _| | ___ _ __ ___ _   _ _| |_
 | '_ \\ / _ \\| | |/ _ \\ '__/ __| | | | | __|
 | |_) | (_) | | |  __/ |  \\__ \\ |_| | | |_
 |_.__/ \\___/|_|_|\\___|_|  |___/\\__,_|_|\\__|
`);

		const packageName = await helpers.askQuestion({
			title: "Package name",
			text: "This is used to create the project directory, and as the package name in package.json,\nso should follow the appropriate format.",
			initial: "my-super-cool-project",
		});

		const siteTitle = await helpers.askQuestion({
			title: "Site title",
			text: "The site title is used for the <title> tag, as well as various other locations.",
			initial: packageName.charAt(0).toUpperCase() + packageName.slice(1).replace(/-/g, " ").toLowerCase(),
		});

		const siteDescription = await helpers.askQuestion({
			title: "Site description",
			text: "The description is used in both the meta and package description fields.",
		});

		const siteUrl = await helpers.askQuestion({
			title: "Site URL",
			text: "The site URL is used in the og:url meta tag.",
			initial: `https://lewishowles.github.io/${packageName.toLowerCase()}/`,
		});

		const themeColour = await helpers.askQuestion({
			title: "Theme colour",
			text: "The theme colour is used for the mask-image favicon, as well as the manifest file.",
			initial: "#a3004c",
		});

		const baseUrl = await helpers.askQuestion({
			title: "Base URL",
			text: `The base URL is used for Vite and is necessary if the site is not hosted at the root of its domain.\nFor example, the base URL for ${colors.bold("https://lewishowles.github.io/components/")} would be ${colors.magenta("/components/")}`,
			initial: `/${packageName.toLowerCase()}/`,
		});

		// Create the appropriate directory.
		filesystem.dir(packageName);

		// Change to our new directory to simplify future commands.
		process.chdir(packageName);

		// First, we ensure that the directory is empty.
		helpers.ensureEmptyDirectory({
			errorMessage: `Please ensure project directory <${packageName}> is empty, as we will be cloning the boilerplate into it.`,
		});

		print.newline();

		// Clone our boilerplate.
		helpers.cloneRepo({
			initialMessage: "Downloading boilerplate repository…",
			url: "https://github.com/lewishowles/boilerplate",
			successMessage: "Repository downloaded successfully.",
		});

		// Replace placeholders within the project.
		const replacements = {
			PACKAGE_NAME: packageName,
			SITE_TITLE: siteTitle,
			SITE_DESCRIPTION: siteDescription,
			SITE_URL: siteUrl,
			THEME_COLOUR: themeColour,
			BASE_URL: baseUrl,
		};

		helpers.replacePlaceholders({ replacements });

		// Initialise git for the new project to ensure that the starting point
		// is clean.
		helpers.initialiseGit();

		// Remind the user about the .npmrc file, and what to do next.
		print.newline();
		print.warning(`----------------------------------------------------------------------------------------------------------------------------
! Before installing packages, make sure to add your \`.npmrc\` file with the necessary credentials for private repositories. !
----------------------------------------------------------------------------------------------------------------------------`);

		helpers.printNextSteps({
			title: "Installing packages",
			introduction: "To install packages, run:",
			code: `cd ${packageName}\nbun i`,
		});

		helpers.printNextSteps({
			title: "Initialising simple-git-hooks",
			introduction: "To initialise simple-git-hooks after package installation, run:",
			code: "bunx simple-git-hooks",
		});

		helpers.printNextSteps({
			title: "meta-default.webp",
			introduction: "Don't forget to create a `public/meta-default.webp` image for social media sharing.",
		});
	},
};
