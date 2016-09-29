import buble from 'rollup-plugin-buble';

export default {
  entry: 'index.js',
  dest: './dist/error.js',
  format: 'cjs',
  plugins: [
    buble()
  ]
};
