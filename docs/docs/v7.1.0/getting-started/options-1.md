---
title: "Nodes"
excerpt: ""
---
Inputs to Tree component:
[block:code]
{
  "codes": [
    {
      "code": "    <tree-root [nodes]=\"nodes\" [options]=\"options\"></tree-root>\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "nodes"
}
[/block]
Array of root nodes of the tree.
Each node may contain the following fields:
[block:parameters]
{
  "data": {
    "0-0": "id",
    "0-1": "Unique ID for the node.\nIf one is not supplied it will be created by the tree library.",
    "1-0": "name",
    "h-0": "Property",
    "h-1": "Description",
    "2-0": "children",
    "2-1": "An array of the node's children.\nEach child is an object with the same structure as the parent node.",
    "1-1": "Will be displayed by default in the tree.",
    "3-0": "hasChildren",
    "3-1": "For async data load. Denotes that this node might have children, even when 'children' attr is empty.",
    "4-0": "isExpanded",
    "4-1": "Determines whether the node starts as expanded by default. Notice that this field is not bindable, meaning that changing it doesn't affect the tree and vice versa."
  },
  "cols": 2,
  "rows": 5
}
[/block]
Example:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    id: 1,\n    name: 'root1',\n    children: [\n      {\n        id: 2,\n        name: 'child1'\n      }, {\n        id: 3,\n        name: 'child2'\n      }\n    ]\n  }\n]",
      "language": "json"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "focused"
}
[/block]
Whether the tree should be focused. Key navigation only works when the tree is focused.
Default value: false.