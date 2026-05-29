import cssnano from 'cssnano';
import sortMediaQueries from 'postcss-sort-media-queries';

export default ({ env }) => ({
	plugins: [
		sortMediaQueries({ sort: 'mobile-first' }),
		env === 'min' && cssnano()
	].filter(Boolean)
});
