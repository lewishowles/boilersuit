import { dirname } from "path";
import { expect, test } from "jest";
import { fileURLToPath } from "url";
import { filesystem, system } from "gluegun";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const src = filesystem.path(__dirname, "..");

const cli = async (cmd) =>
	system.run("node " + filesystem.path(src, "bin", "boilersuit") + ` ${cmd}`);

test("outputs version", async () => {
	const output = await cli("--version");

	expect(output).toContain("0.0.1");
});

test("outputs help", async () => {
	const output = await cli("--help");

	expect(output).toContain("0.0.1");
});

test("generates file", async () => {
	const output = await cli("generate foo");

	expect(output).toContain("Generated file at models/foo-model.js");
	const foomodel = filesystem.read("models/foo-model.js");

	expect(foomodel).toContain("export default {");
	expect(foomodel).toContain("name: 'foo'");

	// cleanup artifact
	filesystem.remove("models");
});
