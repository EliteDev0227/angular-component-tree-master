[![npm version](https://badge.fury.io/js/angular2-tree-component.svg)](https://badge.fury.io/js/angular2-tree-component)
# angular2 tree component

## A full featured tree component for Angular 2
We've built so many projects that required a tree component, and could never find a library that supported all features.
And building your own tree component is not an easy task.

So, we decided to build one for Angular 2, with all the features you can think of:
* Simple to use
* Well Documented
* Keyboard navigation
* Async data
* Drag & Drop
* Select & Multiselect
* Filtering
* Customizable (override field names, custom templates, etc...)
* Event callbacks
* API for accessing & altering the tree state
* Easily styled (comes with very minimal styling)

If you like this, support the project by starring it!

## Angular 2 supported version
angular2-tree-component supports angular 2.0.0 release

## Demo & full documentation:
Please refer to the full documentation:  
[https://angular2-tree.readme.io/docs](https://angular2-tree.readme.io/docs)

## Examples
```
git clone https://github.com/500tech/angular2-tree-component
```

### Using the CLI:
```
cd angular2-tree-component/example/cli
npm install
npm install -g angular-cli
ng serve
```

### Using webpack:
```
cd angular2-tree-component/example/webpack
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

## What's next
We would always love to hear suggestions for features & improvements - just open an issue.

Also, if there's anyone who created an awesome theme for angular2-tree-component - please send to adam@500tech.com.

Some things on our mind down the road:
* virtual scroll
* context menu
* save & restore tree state
* checkbox & master checkbox support

## Contributing
There are currently no unit tests (yet).

However, if you wish to contribute code, you can run `npm run example:cli` and open [localhost:4200](http://localhost:4200) to test your code manually before submitting a pull request.

Please email me at adam@500tech.com before starting to work on a feature / bug to make sure it's something that I'm not working on already.
