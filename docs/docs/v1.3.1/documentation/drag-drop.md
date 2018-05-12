---
title: "Drag & Drop"
excerpt: ""
---
[block:api-header]
{
  "type": "basic",
  "title": "Use"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true\n}\n\n<Tree\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></Tree>",
      "language": "javascript",
      "name": "Allow drag & drop using `allowDrag` flag in tree options"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Listen"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true\n}\n\nonMoveNode($event) {\n  console.log(\n  \t\"Moved\",\n  \t$event.node.data.name,\n  \t\"to\",\n  \t$event.to.node.data.name,\n  \t\"at index\",\n   \t$event.to.index);\n}\n\n<Tree\n\t\t(onMoveNode)=\"onMoveNode($event)\"\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></Tree>",
      "language": "javascript",
      "name": "Listen to node move event that is triggered by drag & drop"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Override"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true,\n  actionMapping: {\n  \tmouse: {\n      drop: (tree:TreeModel, node:TreeNode, $event:any, to:{ node:TreeNode, index: number }) => {\n        // use tree.getDragNode() to get the current dragged node\n        // use to.node and to.index to get the parent node and index of drop location\n        // use TREE_ACTIONS.MOVE_NODE to invoke the original action\n      }\n    }\n  }\n}\n\n<Tree\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></Tree>",
      "language": "javascript",
      "name": "Override drag & drop action in actionMapping"
    }
  ]
}
[/block]