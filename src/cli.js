import { build } from "gluegun";
import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Create the cli and kick it off
 */
export async function run(argv) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	// Create the CLI runtime.
	const cli = build().brand("boilersuit").src(__dirname)
		// Find any plugins referenced.
		.plugins("./node_modules", { matching: "boilersuit-*", hidden: true })
		// Provide default help (h, --help, -h)
		.help()
		// Provide default version (v, --version, -v)
		.version()
		.create();

	// and run it
	const toolbox = await cli.run(argv);

	// send it back (for testing, mostly)
	return toolbox;
}
