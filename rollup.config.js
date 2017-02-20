export default {
  entry: 'dist/ng2-page-transition.js',
  dest: 'dist/bundles/ng2-page-transition.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng2-page-transition',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/router': 'ng.router'
  }
}