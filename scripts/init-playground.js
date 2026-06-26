import { copyFile, access, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const root = path.resolve(dirname, '..');

const filesToCopy = [
	{
		from: 'playground/index.sample.html',
		to: 'playground/index.html'
	}
];

const filesToCreate = [
	{
		to: 'src/scss/playground.scss',
		content: ''
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

for (const file of filesToCopy) {
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

	await mkdir(path.dirname(target), { recursive: true });
	await copyFile(source, target);
	console.log(`Created: ${file.to}`);
}

for (const file of filesToCreate) {
	const target = path.join(root, file.to);

	if (await fileExists(target)) {
		console.log(`Skipped: ${file.to} already exists.`);
		continue;
	}

	await mkdir(path.dirname(target), { recursive: true });
	await writeFile(target, file.content);
	console.log(`Created: ${file.to}`);
}
