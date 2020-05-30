import { modulify } from '@javascribble/rollup-plugin-modulify';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: './source/main.js',
	output: {
		file: './build/main.js',
		format: 'es'
	},
	plugins: [
		resolve(),
		modulify()
	]	
};