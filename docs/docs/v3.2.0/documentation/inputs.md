---
title: "Inputs"
excerpt: ""
---
Inputs to Tree component:
[block:code]
{
  "codes": [
    {
      "code": "    <tree-root [nodes]=\"nodes\" [focused]=\"true\" [options]=\"options\"></tree-root>\n",
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
- id - a unique ID (among siblings) that will be used to identify the path to the node in the tree
- name - will be displayed by default in the tree
- children - an array of the node's children
- hasChildren - for async data load. Denotes that this node might have children, even when 'children' attr is empty
- isExpanded - determines whether the node starts as expanded by default
- isHidden - determines whether the node is displayed or not

Example:
[block:code]
{
  "codes": [
    {
      "code": "[\n  {\n    id: 1,\n    name: 'root1',\n    isExpanded: true,\n    children: [\n      {\n        id: 2,\n        name: 'child1'\n      }, {\n        id: 3,\n        name: 'child2'\n      }\n    ]\n  }\n]",
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
[block:api-header]
{
  "type": "basic",
  "title": "options"
}
[/block]
See the options section in the left sidebar for details.