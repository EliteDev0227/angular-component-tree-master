---
title: "Getting Started"
excerpt: "This page will help you get started with angular2-tree-component.\nYou'll be up and running in a jiffy!"
---
[block:api-header]
{
  "type": "basic",
  "title": "Angular 2.0.0"
}
[/block]
Tree component currently supports Angular release version 2.0.0.
For earlier versions checkout the changelog on the github page
[block:api-header]
{
  "type": "basic",
  "title": "DEMO"
}
[/block]

[block:embed]
{
  "html": false,
  "url": "https://rawgit.com/500tech/angular2-tree-component/master/example/webpack/dist/index.html",
  "title": "Angular2 Webpack Starter by @gdi2290 from @AngularClass",
  "favicon": "https://rawgit.com/favicon.ico",
  "iframe": true,
  "width": "100%",
  "height": "350px"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Installation"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "npm install --save angular2-tree-component",
      "language": "shell"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Basic usage"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// module:\nimport { TreeModule } from 'angular2-tree-component';\n\n@NgModule({\n  imports: [..., TreeModule],\n  ...\n})\nexport class AppModule {\n  ...\n}\n\n// usage:\n@Component({\n  selector: 'app',\n  template: '<Tree [nodes]=\"nodes\"></Tree>'\n});\n\nexport class App {\n  nodes = [\n    {\n      id: 1,\n      name: 'root1',\n      children: [\n        { id: 2, name: 'child1' },\n        { id: 3, name: 'child2' }\n      ]\n    },\n    {\n      id: 4,\n      name: 'root2',\n      children: [\n        { id: 5, name: 'child2.1' },\n        {\n          id: 6,\n          name: 'child2.2',\n          children: [\n            { id: 7, name: 'subsub' }\n          ]\n        }\n      ]\n    }\n  ];\n}",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Features"
}
[/block]
* Keyboard navigation
* Async children load
* Expand / collapse / select nodes
* Events: select, deselect, collapse, expand, focus, etc.
* Custom node template (string or component)
* Custom loading component (for async data)
* Custom children / name attributes
* API to control the tree from outside
* Very basic customizable CSS

See more in the sidebar help pages.
[block:api-header]
{
  "type": "basic",
  "title": "SystemJS"
}
[/block]
There's currently an issue with systemJS and lodash.  
Until we solve it, please install lodash into the project:  
[block:code]
{
  "codes": [
    {
      "code": "npm install --save lodash",
      "language": "shell"
    }
  ]
}
[/block]
and add these lines to systemjs.config.js:  
[block:code]
{
  "codes": [
    {
      "code": "  var map = {\n    'angular2-tree-component':    'node_modules/angular2-tree-component',\n    'lodash':                     'node_modules/lodash',\n  };\n\n  var packages = {\n    'angular2-tree-component'   : { main: 'dist/angular2-tree-component.js', defaultExtension: 'js' },\n    'lodash'                    : { main: 'lodash.js', defaultExtension: 'js' },\n  };\n",
      "language": "javascript"
    }
  ]
}
[/block]