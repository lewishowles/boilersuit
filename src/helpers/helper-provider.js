import { execSync } from "child_process";

export const createHelpers = toolbox => {
	const { filesystem, print } = toolbox;

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
	 * @param  {string}  options.successMessage
	 *     The message to display on successful clone.
	 */
	const cloneRepo = ({ url, successMessage } = {}) => {
		const cloneCommand = `git clone ${url} .`;

		try {
			execSync(cloneCommand, { stdio: "inherit" });
			print.newline();
			printSuccess(successMessage);
		} catch (error) {
			printError("Failed to download the repository.");
			printError(error.message);
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

	return {
		cloneRepo,
		ensureEmptyDirectory,
		printError,
		printSuccess,
	};
};
