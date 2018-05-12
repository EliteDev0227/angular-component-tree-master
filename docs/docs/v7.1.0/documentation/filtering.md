---
title: "Filtering"
excerpt: ""
---
[block:api-header]
{
  "title": "Demo"
}
[/block]

[block:html]
{
  "html": "<iframe src=\"https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/#/filter\" width=\"100%\" height=\"500px\"></iframe>\n"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/filter/filter.component.ts\" target=\"_blank\">Source code for this demo</a>"
}
[/block]

[block:api-header]
{
  "title": "Intro"
}
[/block]

Filtering on the tree will ensure that if a node is visible, then all its ancestors are also visible.
This is being taken care of by the treeModel 'filterNodes' function.

[block:api-header]
{
  "type": "basic",
  "title": "Filter by function"
}
[/block]
The function receives the node and returns true if the node should be hidden, false otherwise.
[block:code]
{
  "codes": [
    {
      "code": "tree.treeModel.filterNodes((node) => {\n  return !node.data.name.startsWith(text);\n});\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Filter by string"
}
[/block]
The function filters all nodes whose displayField ('name' by default) contains the given string. The comparison is done case insensitive.
[block:code]
{
  "codes": [
    {
      "code": "tree.treeModel.filterNodes(\"text\", true);\n",
      "language": "javascript"
    }
  ]
}
[/block]
Note the second field - true by default.
This flag makes sure all nodes are visible after searching (i.e. expand all relevant ancestors).
[block:api-header]
{
  "type": "basic",
  "title": "Filtering by API"
}
[/block]
You can traverse the tree and do your own magic, and call `hide()`, `show()`, or `setIsHidden(value)` on all nodes as you wish.
[block:api-header]
{
  "title": "Filtering by 2-way binding"
}
[/block]
You can bind to the tree state and supply a dictionary of hidden node IDs.
See [2-way binding to state](doc:save-restore) for more information.