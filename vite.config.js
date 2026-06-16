import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	const isCdn = mode === 'cdn';
	const isCdnMin = mode === 'cdn-min';
	const isCdnBuild = isCdn || isCdnMin;

	return {
		root: 'playground',
		build: {
			outDir: '../dist',
			emptyOutDir: !isCdn && !isCdnMin,
			minify: isCdnMin,
			lib: {
				entry: isCdnBuild
					? '../src/ts/index.ts'
					: {
							index: '../src/ts/index.ts',
							'components/modal': '../src/ts/components/modal.ts'
						},
				name: 'Brise',
				formats: isCdnBuild ? ['iife'] : ['es'],
				fileName: (_format, entryName) => {
					if (isCdnMin) return 'brise.min.js';
					if (isCdn) return 'brise.js';
					return `${entryName}.js`;
				}
			}
		}
	};
});
