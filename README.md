# angular2 tree component

## Why use this library

* Simple to use
* Well Documented
* Customizable (display fields, children's field, custom templates, etc...)
* Events
* API for accessing & altering the tree state
* Keyboard navigation
* Async data
* Easily styled (comes with very minimal styling)


## Examples
```
git clone https://github.com/500tech/angular2-tree-component
```

### Using webpack:
```
cd angular2-tree-component/example/webpack
npm install
npm start
```

### Using systemjs:
```
cd angular2-tree-component/example/systemjs
npm install
npm start
```

**There's currently an issue with systemJS and lodash.**  
Until we solve it, please install lodash into the project:  
```
npm install --save lodash
```

and add these lines to systemjs.config.js:  
```
  var map = {
    'angular2-tree-component':    'node_modules/angular2-tree-component',
    'lodash':                     'node_modules/lodash',
  };

  var packages = {
    'angular2-tree-component'   : { main: 'dist/angular2-tree-component.js', defaultExtension: 'js' },
    'lodash'                    : { main: 'lodash.js', defaultExtension: 'js' },
  };
```

## Demo & full documentation:
Please refer to the full documentation:  
[https://angular2-tree.readme.io/docs](https://angular2-tree.readme.io/docs)

## What's next
We would always love to hear suggestions for features & improvements - just open an issue.

Also, if there's anyone who created an awesome theme for angular2-tree-component - please send to adam@500tech.com.

Some things on our mind down the road:
* virtual scroll
* drag & drop behaviour in the tree
* context menu
* save & restore tree state
* support both children-padding & computed level-based padding
* checkbox & master checkbox support
* filter & search
