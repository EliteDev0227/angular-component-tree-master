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
    'lodash',
    'mobx', 
    'mobx-angular'
  ],
  onwarn: function (warning) {
    // ignore spurious warnings about TS generated code such as __decorate, etc.
    if (warning.code === 'THIS_IS_UNDEFINED' || warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1) { 
      return; 
    }
    
    // console.warn everything else
    console.warn( warning.message );
  }

};
