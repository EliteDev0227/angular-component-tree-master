---
title: "Drag & Drop"
excerpt: ""
---
[Options](#options)
[Event](#event)
[Override default behaviour](#override-default-behaviour)
[Drag a node outside of the tree](#drag-a-node-outside-of-the-tree)
[Drag an external element into the tree](#drag-an-external-element-into-the-tree)
[Drag to an empty tree](#drag-to-an-empty-tree)
[Styling](styling)
[block:api-header]
{
  "type": "basic",
  "title": "Options"
}
[/block]
Set the `allowDrag` option to enable the default behaviour:
* Drag and drop inside the tree
* Drag and drop between trees
* The default action is to move the node to its new location

Set the `allowDrop` option to either a boolean or a function:
* Boolean value - decides if drop is allowed or not on the tree
* Function - decides on a per node basis if drop is allowed. The function receives:
  * element - the dragged element
  * to - drop location structure
    * parent - the parent node
    * index - the index inside the parent's children where the element is dropped
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true,\n  allowDrop: (element, to) {\n    // return true / false based on element, to.parent, to.index. e.g.\n    return to.parent.hasChildren;\n  }\n}\n\n<tree-root\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></tree-root>",
      "language": "javascript",
      "name": "Allow drag & drop using `allowDrag` flag in tree options"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Event"
}
[/block]
You can listen to `onMoveNode` events and get the moved node, and its new location in the tree
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true\n}\n\nonMoveNode($event) {\n  console.log(\n  \t\"Moved\",\n  \t$event.node.name,\n  \t\"to\",\n  \t$event.to.parent.name,\n  \t\"at index\",\n   \t$event.to.index);\n}\n\n<tree-root\n\t\t(onMoveNode)=\"onMoveNode($event)\"\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></tree-root>",
      "language": "javascript",
      "name": "Listen to node move event that is triggered by drag & drop"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Override default behaviour"
}
[/block]
use actionMapping to override the default drag behaviour.
You get a 'from' and 'to' objects:
- from:
-   If dragging a node, then from === the dragged node
-   If dragging something else, it is the draggedElement (see treeDrag directive below)

- to:
-   parent: the parent node
-   index: the index inside the parent's children where the node should be dropped
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true,\n  actionMapping: {\n  \tmouse: {\n      drop: (tree:TreeModel, node:TreeNode, $event:any, {from, to}) => {\n        // use from to get the dragged node.\n        // use to.parent and to.index to get the drop location\n        // use TREE_ACTIONS.MOVE_NODE to invoke the original action\n      }\n    }\n  }\n}\n\n<tree-root\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></tree-root>",
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
Use `$event.element` inside the callback.
Use `[treeAllowDrop]` Input to specify a function that runs onDragOver, and decides if the dropping is allowed or not.
For example:
[block:code]
{
  "codes": [
    {
      "code": "<div (treeDrop)=\"onDrop($event)\"\n     [treeAllowDrop]=\"allowDrop.bind(this)\"></div>\n\n  onDrop($event) {\n    // Dropped $event.element\n  }\n\n  allowDrop(element) {\n    // Return true/false based on element\n  }\n",
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
You can use the `[treeDrag]` directive to allow dragging external elements into the tree.
Then use a custom action to handle the drop (see [Action Mapping](doc:action-mapping) section).
The data that you pass to treeDrag will be passed to the handler in the `from` parameter.

Use `to.parent` and `to.index` to get the drop location.
If you add a new node to the tree, you'll need to call `tree.update()` afterwards.

Use `[treeDragEnabled]` boolean Input to decide if the drag is enabled or not.

For example:
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  actionMapping: {\n    mouse: {\n      drop: (tree, node, $event, {from, to}) => {\n        console.log('drag', from, to); // from === {name: 'first'}\n        // Add a node to `to.parent` at `to.index` based on the data in `from`\n        // Then call tree.update()\n      }\n    }\n  }\n}\n\n<p [treeDrag]=\"{name: 'first'}\" [treeDragEnabled]=\"true\">Drag me!</p>\n<p [treeDrag]=\"{name: 'second'}\">Drag me as well!</p>",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Drag to an empty tree"
}
[/block]
To drag to an empty tree, set your nodes to an empty array.
If nodes is undefined or null, the drop slot will not appear.
[block:api-header]
{
  "type": "basic",
  "title": "Styling"
}
[/block]
The following classes are available for dragging over elements, based on allowDrop:
* is-dragging-over
* is-dragging-over-disabled