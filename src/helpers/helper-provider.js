export const createHelpers = toolbox => {
	const { filesystem, print } = toolbox;

	/**
	 * Ensure that the current directory is empty.
	 *
	 * @param  {string}  options.errorMessage
	 *     The message to display if the directory is not empty.
	 */
	const ensureEmptyDirectory = ({ errorMessage } = {}) => {
		const files = filesystem.list(".");

		if (files.length > 0) {
			printError(errorMessage);
			process.exit();
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
		ensureEmptyDirectory,
		printError,
		printSuccess,
	};
};
