---
title: "RTL"
excerpt: ""
---
You can make the tree right to left easily by supplying an 'rtl' boolean option.

[block:api-header]
{
  "title": "Demo"
}
[/block]

[block:html]
{
  "html": "<iframe src=\"https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/#/rtl\" width=\"100%\" height=\"250px\"></iframe>\n"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/rtl/rtl-tree.component.ts\" target=\"_blank\">Source code for this demo</a>"
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