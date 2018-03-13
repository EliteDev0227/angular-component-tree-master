import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  format: 'umd',
  moduleName: 'angular-tree-component',
  plugins: [
    nodeResolve({ jsnext: true, main: true, module: true }),
    commonjs(),
    uglify()
  ],
  sourceMap: true,
  external: [
    '@angular/core',
    '@angular/common',
    'lodash/compact',
    'lodash/defaultsDeep',
    'lodash/every',
    'lodash/find',
    'lodash/first',
    'lodash/get',
    'lodash/includes',
    'lodash/isFunction',
    'lodash/isNumber',
    'lodash/isString',
    'lodash/last',
    'lodash/omit',
    'lodash/pick',
    'lodash/some',
    'mobx', 
    'mobx-angular'
  ],
  onwarn: function (warning) {
    const skip_codes = [
      'THIS_IS_UNDEFINED',
      'MISSING_GLOBAL_NAME'
  ];
  if ( skip_codes.indexOf(warning.code) != -1 ) return;
    console.error(warning);
  }
};
