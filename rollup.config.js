import buble from 'rollup-plugin-buble';

export default {
  dest: './dist/error.js',
  entry: 'index.js',
  format: 'cjs',
  plugins: [
    buble()
  ]
};
