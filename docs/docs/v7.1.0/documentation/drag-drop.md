---
title: "Drag & Drop"
excerpt: ""
---
[Demo](#demo)
[Options](#options)
[Event](#event)
[Override default behaviour](#override-default-behaviour)
[Drag a node outside of the tree](#drag-a-node-outside-of-the-tree)
[Drag an external element into the tree](#drag-an-external-element-into-the-tree)
[Drag to an empty tree](#drag-to-an-empty-tree)
[Mobile](#mobile)
[Styling](#styling)
[block:api-header]
{
  "title": "Demo"
}
[/block]

[block:html]
{
  "html": "<iframe src=\"https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/#/drag\" width=\"100%\" height=\"300px\"></iframe>\n"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/drag/drag.component.ts\" target=\"_blank\">Source code for this demo</a>"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Options"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: (node) => node.isLeaf,\n  allowDrop: (element, { parent, index }) {\n    // return true / false based on element, to.parent, to.index. e.g.\n    return parent.hasChildren;\n  },\n  getNodeClone: (node) => ({\n    ...node.data,\n    id: uuid.v4(),\n    name: `copy of ${node.data.name}`\n  })\n};\n\noptions2 = {\n  allowDrag: true,\n  allowDrop: false\n};\n\n<tree-root\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></tree-root>",
      "language": "javascript",
      "name": "Allow drag & drop using `allowDrag` flag in tree options"
    }
  ]
}
[/block]
Dragging:
Enable dragging with `allowDrag` option (default false) accepts either a boolean or a function:
* Boolean value - decides if drop is allowed or not on the tree
* Function - decides on a per node basis if drop is allowed. The function receives:
  * node - the dragged TreeNode

Dropping:
Enable selective dropping with the `allowDrop` option (default true) accepts either a boolean or a function:
* Boolean value - decides if drop is allowed or not on the tree
* Function - decides on a per node basis if drop is allowed. The function receives:
  * element - the dragged element
  * to - drop location structure
    * parent - the parent node
    * index - the index inside the parent's children where the element is dropped

Copying:
The default behaviour of the tree is to copy the node when `ctrl` is pressed while dropping the node
* By default the tree will shallow-clone the node data and generates a random ID
* if `getNodeClone` option is supplied, it will be called to get a copy of the node. It receives a TreeNode object, and should return a node object (only the data).
[block:api-header]
{
  "type": "basic",
  "title": "Event"
}
[/block]
You can listen to `moveNode` events and get the moved node, and its new location in the tree
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true\n}\n\nonMoveNode($event) {\n  console.log(\n  \t\"Moved\",\n  \t$event.node.name,\n  \t\"to\",\n  \t$event.to.parent.name,\n  \t\"at index\",\n   \t$event.to.index);\n}\n\n<tree-root\n\t\t(moveNode)=\"onMoveNode($event)\"\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></tree-root>",
      "language": "javascript",
      "name": "listen to moveNode events"
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
use `actionMapping.mouse.drop` to override the default drag behaviour.
You can also listen to all other drag events like dragEnd, dragLeave etc.:
[block:code]
{
  "codes": [
    {
      "code": "options = {\n  allowDrag: true,\n  actionMapping: {\n  \tmouse: {\n      drop: (tree:TreeModel, node:TreeNode, $event:any, {from, to}) => {\n        // use from to get the dragged node.\n        // use to.parent and to.index to get the drop location\n        // use TREE_ACTIONS.MOVE_NODE to invoke the original action\n      },\n      dragStart?: IActionHandler,\n      drag?: IActionHandler,\n      dragEnd?: IActionHandler,\n      dragOver?: IActionHandler,\n      dragLeave?: IActionHandler,\n      dragEnter?: IActionHandler      \n    }\n  }\n}\n\n<tree-root\n\t\t[nodes]=\"nodes\"\n\t\t[options]=\"options\"></tree-root>",
      "language": "javascript",
      "name": "Override drag & drop action in actionMapping"
    }
  ]
}
[/block]
In the drop callback, you get a 'from' and 'to' objects:
- from:
  - If dragging a node, then from === the dragged node
  - If dragging something else, it is the draggedElement (see treeDrag directive below)

- to:
  - parent: the parent node
  - index: the index inside the parent's children where the node should be dropped
  - dropOnNode: distinguish between dropping on the node itself or the drop slot

[block:api-header]
{
  "title": "Drag and drop between trees"
}
[/block]
This is enabled by default when dragging is enabled
[block:api-header]
{
  "type": "basic",
  "title": "Drag a node outside of the tree"
}
[/block]
You can use the (treeDrop) directive to allow dragging nodes to an external element.
For example:
[block:code]
{
  "codes": [
    {
      "code": "<div (treeDrop)=\"onDrop($event)\"\n     [treeAllowDrop]=\"allowDrop.bind(this)\"></div>\n\n  onDrop($event) {\n    // Dropped $event.element\n  }\n\n  allowDrop(element) {\n    // Return true/false based on element\n  }\n",
      "language": "javascript",
      "name": "use (treeDrop) to drag an external element to the tree"
    }
  ]
}
[/block]
Use `$event.element` inside the callback.
Use `[treeAllowDrop]` Input to specify a function that runs onDragOver, and decides if the dropping is allowed or not.

[block:api-header]
{
  "type": "basic",
  "title": "Drag an external element into the tree"
}
[/block]
You can use the `[treeDrag]` directive to allow dragging external elements into the tree.
Then use a custom action to handle the drop (see [Action Mapping](doc:action-mapping) section).

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
The data that you pass to `[treeDrag]` will be passed to the handler in the `from` parameter.

Use `to.parent` and `to.index` to get the drop location.
Use `to.dropOnNode` to distinguish between dropping on the node itself or the drop slot.
If you add a new node to the tree, you'll need to call `tree.update()` afterwards.

Use `[treeDragEnabled]` boolean Input to decide if the drag is enabled or not.

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
  "title": "Mobile"
}
[/block]
The tree currently doesn't support drag and drop on mobile.
However, you can use DragDropTouch polyfill in your project to enable it.
Download the code from here: [https://github.com/Bernardo-Castilho/dragdroptouch](https://github.com/Bernardo-Castilho/dragdroptouch)
Place it somewhere in your code, and import it from polyfills.ts, or just place a script tag to include it.
[block:api-header]
{
  "type": "basic",
  "title": "Styling"
}
[/block]
The following classes are available for dragging over elements, based on allowDrop:
* is-dragging-over
* is-dragging-over-disabled