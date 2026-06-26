import { copyFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const root = path.resolve(dirname, '..');

const files = [
	{
		from: 'playground/index.sample.html',
		to: 'playground/index.html'
	},
	{
		from: 'src/scss/playground.sample.scss',
		to: 'src/scss/playground.scss'
	}
];

const fileExists = async (filePath) => {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
};

for (const file of files) {
	const source = path.join(root, file.from);
	const target = path.join(root, file.to);

	if (!(await fileExists(source))) {
		console.error(`Error: Source file is missing: ${file.from}`);
		process.exit(1);
	}

	if (await fileExists(target)) {
		console.log(`Skipped: ${file.to} already exists.`);
		continue;
	}

	await copyFile(source, target);
	console.log(`Created: ${file.to}`);
}
