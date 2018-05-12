---
title: "RTL"
excerpt: ""
---
You can make the tree right to left easily by using custom CSS.
Example:

[block:embed]
{
  "html": false,
  "url": "https://rawgit.com/500tech/angular2-tree-component/master/example/cli/dist/#/rtl",
  "title": "Cli",
  "favicon": "https://rawgit.com/500tech/angular2-tree-component/master/example/cli/dist/favicon.ico",
  "iframe": true,
  "height": "220px"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "<tree-root class=\"rtl\" [focused]=\"true\" [nodes]=\"nodes\"></tree-root>",
      "language": "html",
      "name": "sample.component.html"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": ".rtl {\n    direction: rtl;\n    .toggle-children-wrapper-collapsed .toggle-children {\n        transform: rotate(180deg) !important;\n    }\n    .tree-children {\n        padding-right: 20px;\n        padding-left: 0;\n    }\n}\n",
      "language": "css",
      "name": "styles.scss"
    }
  ]
}
[/block]