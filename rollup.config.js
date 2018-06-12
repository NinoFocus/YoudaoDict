import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import hashbang from 'rollup-plugin-hashbang'

export default {
  input: 'src/index.js',
  output: {
    file: 'bin/index.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    hashbang(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
