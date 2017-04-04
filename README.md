[![npm version](https://badge.fury.io/js/angular-tree-component.svg)](https://badge.fury.io/js/angular-tree-component)
# angular tree component

## A full featured tree component for Angular (2 and above, including 4)
We've built so many projects that required a tree component, and could never find a library that supported all features.
And building your own tree component is not an easy task.

So, we decided to build one for Angular, with all the features you can think of:
* Simple to use
* Well Documented
* Keyboard navigation
* Async data
* Drag & Drop
* Select & Multiselect
* Filtering
* Virtual Scrolling
* Customizable (override field names, custom templates, etc...)
* Event callbacks
* API for accessing & altering the tree state
* Easily styled (comes with very minimal styling)

If you like this, support the project by starring it!

## Angular supported version
angular-tree-component supports angular 2.X.X releases, 4.X.X releases, and AoT compilation.

## Getting started, demo & full documentation
Please refer to the full documentation:  
[https://angular2-tree.readme.io/docs](https://angular2-tree.readme.io/docs)

## Call for styles
Hello users & contributors of the tree.

We're looking for nice example themes for the tree.
If you've made one, and are willing to share, please open an issue and attach your CSS and image of how it should look.

Thanks

## Example
To run the example:
```
git clone https://github.com/500tech/angular-tree-component

cd angular-tree-component/example/cli
npm install
npm install -g angular-cli
ng serve
```

## SystemJS
You'll need to load the UMD bundle to work with SystemJS.  
Add these lines to systemjs.config.js:  
```
  map: {
    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    …
    'angular-tree-component': 'node_modules/angular2-tree-component/dist/angular-tree-component.umd.js',
    …
  }
```

## What's next
We would always love to hear suggestions for features & improvements - just open an issue.

Some things on our mind down the road:
* context menu
* save & restore tree state
* checkbox & master checkbox support
* tests (WIP)

## Contributing
There are currently no unit tests (yet).

However, if you wish to contribute code, you can run `npm run example:cli` and open [localhost:4200](http://localhost:4200) to test your code manually before submitting a pull request.

Please check the issues / project before starting to work on a feature / bug to make sure it's not already in progress.
