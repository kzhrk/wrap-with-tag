import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.umd.js',
      format: 'umd',
      name: 'wrapWithTag'
    },
    {
      file: './dist/index.js',
      format: 'cjs'
    }
  ],
  plugins: [typescript(), terser()]
};
