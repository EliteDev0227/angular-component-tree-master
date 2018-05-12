---
title: "RTL"
excerpt: ""
---
You can make the tree right to left easily by supplying an 'rtl' boolean option.
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
      "code": "<tree-root [focused]=\"true\" [nodes]=\"nodes\" [options]=\"options\"></tree-root>",
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
      "code": "options = {\n  rtl: true\n};\n",
      "language": "javascript",
      "name": "styles.scss"
    }
  ]
}
[/block]