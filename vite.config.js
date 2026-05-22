import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	const isCdn = mode === 'cdn';
	const isCdnMin = mode === 'cdn-min';

	return {
		root: 'playground',
		build: {
			outDir: '../dist',
			emptyOutDir: !isCdn && !isCdnMin,
			minify: isCdnMin,
			lib: {
				entry: '../src/ts/index.ts',
				name: 'BlankUI',
				formats: isCdn || isCdnMin ? ['iife'] : ['es'],
				fileName: () => {
					if (isCdnMin) return 'blank-ui.min.js';
					if (isCdn) return 'blank-ui.js';
					return 'index.js';
				}
			}
		}
	};
});
