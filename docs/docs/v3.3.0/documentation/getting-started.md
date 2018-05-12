---
title: "Getting Started"
excerpt: "This page will help you get started with angular-tree-component.\nYou'll be up and running in a jiffy!"
---
[block:api-header]
{
  "type": "basic",
  "title": "Angular 2.X.X"
}
[/block]
Tree component currently supports Angular release version 2.x.x.
Angular 4 will be supported soon.
[block:api-header]
{
  "type": "basic",
  "title": "DEMO"
}
[/block]

[block:embed]
{
  "html": false,
  "url": "https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/index.html",
  "title": "Cli",
  "favicon": "https://rawgit.com/500tech/angular2-tree-component/master/example/cli/dist/favicon.ico",
  "iframe": true,
  "height": "700px",
  "width": "100%"
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
      "code": "npm install --save angular-tree-component",
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
      "code": "// module:\nimport { TreeModule } from 'angular-tree-component';\n\n@NgModule({\n  imports: [..., TreeModule],\n  ...\n})\nexport class AppModule {\n  ...\n}\n\n// usage:\n@Component({\n  selector: 'app',\n  template: '<tree-root [nodes]=\"nodes\"></tree-root>'\n});\n\nexport class App {\n  nodes = [\n    {\n      id: 1,\n      name: 'root1',\n      children: [\n        { id: 2, name: 'child1' },\n        { id: 3, name: 'child2' }\n      ]\n    },\n    {\n      id: 4,\n      name: 'root2',\n      children: [\n        { id: 5, name: 'child2.1' },\n        {\n          id: 6,\n          name: 'child2.2',\n          children: [\n            { id: 7, name: 'subsub' }\n          ]\n        }\n      ]\n    }\n  ];\n}",
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
* Drag & Drop
* Virtual Scroll to support large trees
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
You'll need to load the UMD bundle to work with SystemJS.
Add these lines to `systemjs.config.js`:
[block:code]
{
  "codes": [
    {
      "code": "  map: {\n    // angular bundles\n    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',\n    …\n    'angular-tree-component': 'node_modules/angular-tree-component/dist/angular-tree-component.umd.js',\n    …\n  }",
      "language": "javascript"
    }
  ]
}
[/block]