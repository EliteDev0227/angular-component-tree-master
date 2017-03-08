import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  format: 'umd',
  moduleName: 'angular-tree-component',
  plugins: [
    nodeResolve({ jsnext: true, main: true, module: true }),
    commonjs()
  ],
  external: [
    '@angular/core',
    '@angular/common'
  ]
};
