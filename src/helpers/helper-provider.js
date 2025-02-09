import { execSync } from "child_process";
import colors from "colors";

export const createHelpers = toolbox => {
	const { filesystem, print, prompt } = toolbox;

	/**
	 * Ensure that the current directory is empty.
	 *
	 * @param  {string}  options.errorMessage
	 *     The message to display if the directory is not empty.
	 */
	const ensureEmptyDirectory = ({ path = ".", errorMessage } = {}) => {
		const files = filesystem.list(path);

		if (files.length > 0) {
			printError(errorMessage);
			process.exit();
		}
	};

	/**
	 * Clone the given repo into the current directory.
	 *
	 * @param  {string}  options.url
	 *     The URL of the repo to clone.
	 * @param  {string}  options.initialMessage
	 *     The message to display when running the command.
	 * @param  {string}  options.successMessage
	 *     The message to display on successful clone.
	 */
	const cloneRepo = ({ url, initialMessage, successMessage } = {}) => {
		print.info(initialMessage);
		print.newline();

		const cloneCommand = `git clone ${url} .`;

		try {
			execSync(cloneCommand, { stdio: "inherit" });
			print.newline();
			printSuccess(successMessage);
			print.newline();
		} catch (error) {
			printError("Failed to download the repository.");
			printError(error.message);
		}
	};

	/**
	 * Replace placeholders in all files in the given directory.
	 *
	 * @param  {string}  directory
	 *     The directory in which to find files.
	 * @param  {object}  replacements
	 *     The replacements to make.
	 */
	const replacePlaceholders = ({ directory = ".", replacements } = {}) => {
		const files = filesystem.find(directory, {
			matching: ["**/*", "!**/.git/**", "!**/node_modules/**"],
		});

		files.forEach(file => {
			if (filesystem.isFile(file)) {
				let content = filesystem.read(file);

				if (content) {
					Object.entries(replacements).forEach(([placeholder, value]) => {
						const regex = new RegExp(`{{${placeholder}}}`, "g");

						content = content.replace(regex, value);
					});

					filesystem.write(file, content);
				}
			}
		});

		printSuccess("Placeholders replaced successfully.");
	};

	/**
	 * Ask the user a single formatted question, with title and description.
	 *
	 * @param  {string}  options.title
	 *     The title of the section.
	 * @param  {string}  options.text
	 *     The main description of the section.
	 * @param  {string}  options.initial
	 *     The initial suggested value for the question response.
	 */
	const askQuestion = async({ title, text, initial } = {}) => {
		print.newline();

		print.info(colors.bold.magenta(title));
		print.info(`${text}`);

		print.newline();

		// Prompt for the project name
		const response = await prompt.ask({
			type: "input",
			name: "response",
			message: title,
			initial,
		});

		return response.response;
	};

	/**
	 * Initialise our project for git, removing any existing git config.
	 */
	const initialiseGit = () => {
		print.newline();
		print.info("Initialising git…");

		// Remove the git folder from the original boilerplate project, so that
		// the user can start fresh.
		removeFolder(".git");

		execSync("git init; git add .; git commit -m \"Initial commit\"");

		print.newline();
		printSuccess("Git initialised.");
	};

	/**
	 * Remove the folder at the given path. Obviously this is a little unsafe,
	 * so use with caution.
	 *
	 * @param  {string}  folderPath
	 *     The path to the folder to remove.
	 */
	const removeFolder = folderPath => {
		execSync(`rm -rf ${folderPath}`);
	};

	/**
	 * Print a suggested next steps action.
	 *
	 * @param  {string}  options.title
	 *     The title of the suggestion.
	 *
	 * @param  {string}  options.introduction
	 *     Any introductory text.
	 *
	 * @param  {string}  options.code
	 *     The suggested code to run
	 */
	const printNextSteps = ({ title, introduction, code } = {}) => {
		print.newline();
		print.info(colors.bold.magenta(title));
		print.info(introduction);

		if (code) {
			print.newline();
			print.info(colors.green(code));
		}
	};

	/**
	 * Print an error message, with default formatting.
	 *
	 * @param  {string}  message
	 *     The message to print.
	 */
	const printError = message => {
		print.error(`${print.xmark} ${message}`);
	};

	/**
	 * Print a success message, with default formatting.
	 *
	 * @param  {string}  message
	 *     The message to print.
	 */
	const printSuccess = message => {
		print.success(`${print.checkmark} ${message}`);
	};

	/**
	 * Print a warning message, with default formatting.
	 *
	 * @param  {string}  message
	 *     The message to print.
	 */
	const printWarning = message => {
		print.warning(`! ${message}`);
	};

	return {
		askQuestion,
		cloneRepo,
		ensureEmptyDirectory,
		initialiseGit,
		printError,
		printNextSteps,
		printSuccess,
		printWarning,
		replacePlaceholders,
	};
};
