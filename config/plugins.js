import R from 'ramda';

const {MANIFOLD_PLUGINS} = process.env;
const plugins = R.trim(MANIFOLD_PLUGINS || '').split(',').map(R.trim);

export default { plugins };
