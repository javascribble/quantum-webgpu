import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { minify } from 'html-minifier';

export default {
    input: '../source/main.js',
    output: {
        file: '../bundle/main.js',
        format: 'es'
    },
	plugins: [
		commonjs(),
		resolve(),
		babel({ babelHelpers: 'bundled' }),
		{
			name: 'minify',
			transform(text, path) {
				if (path.includes('template')) {
					return minify(text, { minifyCSS: true, minifyJS: true, collapseWhitespace: true });
				}
			}
		}
	]	
};