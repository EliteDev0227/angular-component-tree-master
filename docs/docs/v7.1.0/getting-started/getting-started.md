---
title: "Getting Started"
excerpt: "This page will help you get started with angular-tree-component.\nYou'll be up and running in a jiffy!"
---
[block:api-header]
{
  "type": "basic",
  "title": "Angular 2 + 4 + 5"
}
[/block]
Tree component currently supports Angular release version 2.x.x, 4.x.x and 5.x.x.
[block:api-header]
{
  "type": "basic",
  "title": "DEMO"
}
[/block]

[block:html]
{
  "html": "<iframe src=\"https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/#/basic\" width=\"500px\" height=\"300px\"></iframe>\n"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/basictree/basictree.component.ts\" target=\"_blank\">Source code for this demo</a>"
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
Import the CSS
[block:code]
{
  "codes": [
    {
      "code": "@import '~angular-tree-component/dist/angular-tree-component.css';",
      "language": "scss",
      "name": "styles.scss"
    }
  ]
}
[/block]
Import the module, and use the tree-root component:
[block:code]
{
  "codes": [
    {
      "code": "// module:\nimport { TreeModule } from 'angular-tree-component';\n\n@NgModule({\n  imports: [..., TreeModule],\n  ...\n})\nexport class AppModule {\n  ...\n}\n\n// usage:\n@Component({\n  selector: 'app',\n  template: '<tree-root [nodes]=\"nodes\" [options]=\"options\"></tree-root>'\n});\n\nexport class App {\n  nodes = [\n    {\n      id: 1,\n      name: 'root1',\n      children: [\n        { id: 2, name: 'child1' },\n        { id: 3, name: 'child2' }\n      ]\n    },\n    {\n      id: 4,\n      name: 'root2',\n      children: [\n        { id: 5, name: 'child2.1' },\n        {\n          id: 6,\n          name: 'child2.2',\n          children: [\n            { id: 7, name: 'subsub' }\n          ]\n        }\n      ]\n    }\n  ];\n  options = {};\n}",
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
* Checkboxes
* API to control the tree from outside
* Very basic customizable CSS

See more in the sidebar help pages.
[block:api-header]
{
  "title": "Professional Support"
}
[/block]
Please fill this form to get quick and professional support (bug report / feature request / help implementing / etc.):
[https://goo.gl/forms/9KobHoFkjSMtGC2K3](https://goo.gl/forms/9KobHoFkjSMtGC2K3)

* note: This project is completely free and open to use under the MIT license.
If you wish to get help from fellow community developers, feel free to use Github issues.
[block:api-header]
{
  "type": "basic",
  "title": "SystemJS"
}
[/block]
Sorry guys, SystemJS is not supported.
Modern web applications use bundlers like Webpack.

We've tried to support SystemJS for a year, but it just causes too many issues.