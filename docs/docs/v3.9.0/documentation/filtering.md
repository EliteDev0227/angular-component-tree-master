---
title: "Filtering"
excerpt: ""
---
Filtering on the tree is not trivial, since the filtering process needs the keep the tree structure.
For example, if one of the nodes is visible - we must display its parent, and grandparent etc.
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
  "title": "Manual filtering"
}
[/block]
If you need a different behaviour than the above, you can traverse the tree and do your own magic, and call `hide()`, `show()`, or `setIsHidden(value)` on all nodes as you wish.