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
Set the `allowDrag` option to enable the default behaviour:
* Drag and drop inside the tree
* Drag and drop between trees
* The default action is to move the node to its new location
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
  "title": "Listen to moveNode event"
}
[/block]
You can listen to `onMoveNode` events and get the moved node, and its new location in the tree
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true\n}\n\nonMoveNode($event) {\n  console.log(\n  \t\"Moved\",\n  \t$event.node.data.name,\n  \t\"to\",\n  \t$event.to.parent.data.name,\n  \t\"at index\",\n   \t$event.to.index);\n}\n\n<Tree\n\t\t(onMoveNode)=\"onMoveNode($event)\"\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></Tree>",
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
use actionMapping to override the default drag behaviour.
You get a 'from' and 'to' objects:
- from:
-   If dragging a node, then equals:
-     node: the dragged node
-     parent: the parent of the dragged node
-     index: index inside parent
-   If dragging something else, it is the draggedElement (see treeDrag directive below)

- to:
-   parent: the parent node
-   index: the index inside the parent's children where the node should be dropped
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true,\n  actionMapping: {\n  \tmouse: {\n      drop: (tree:TreeModel, node:TreeNode, $event:any, {from, to}) => {\n        // use from.parent, from.node, and from.index to get the dragged node.           // use to.parent and to.index to get the parent node and index of drop location\n        // use TREE_ACTIONS.MOVE_NODE to invoke the original action\n      }\n    }\n  }\n}\n\n<Tree\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></Tree>",
      "language": "javascript",
      "name": "Override drag & drop action in actionMapping"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Drag a node outside of the tree"
}
[/block]
You can use the (treeDrop) directive to allow dragging nodes to an external element.
Use `$event.element.node` inside the callback.

For example:
[block:code]
{
  "codes": [
    {
      "code": "<div (treeDrop)=\"onDrop($event)\"></div>\n\n  onDrop($event) {\n    // Dropped $event.element.node\n  }\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Drag an external element into the tree"
}
[/block]
You can use the [treeDrag] directive to allow dragging external elements into the tree.
Then use a custom action to handle the drop.
You specify the element that will be reported as 'from' instead of the {node, parent, index} structure when dragging a tree node.

For example:
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  actionMapping: {\n    mouse: {\n      drop: (tree, node, $event, {from, to}) => {\n        console.log('drag', from, to); // from === {name: 'first'}\n      }\n    }\n  }\n}\n\n<p [treeDrag]=\"{name: 'first'}\">Drag me!</p>\n<p [treeDrag]=\"{name: 'second'}\">Drag me as well!</p>",
      "language": "javascript"
    }
  ]
}
[/block]