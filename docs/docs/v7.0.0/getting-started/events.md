---
title: "Events"
excerpt: ""
---
[Registering events](#registering-events)
[toggleExpanded](#toggleexpanded)
[activate](#activate)
[deactivate](#deactivate)
[focus](#focus)
[blur](#blur)
[initialized](#initialized)
[updateData](#updatedata)
[moveNode](#movenode)
[copyNode](#copynode)
[loadNodeChildren](#loadNodeChildren)
[changeFilter](#changeFilter)
[stateChange](#stateChange)
[event](#event)
[block:api-header]
{
  "type": "basic",
  "title": "Registering events"
}
[/block]
You can react to whatever happened on the tree by registering to events.
If you're looking to override behaviour - see [Customize actions](doc:action-mapping) section.

Events use Angular's `output`:
[block:code]
{
  "codes": [
    {
      "code": "\t<tree-root [nodes]=\"nodes\"\n    (toggleExpanded)=\"onEvent($event)\"\n    (activate)=\"onEvent($event)\"\n    (focus)=\"onEvent($event)\"\n    (blur)=\"onEvent($event)\">\n  </tree-root>\n\n  onEvent = ($event) => console.log($event);\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "treeModel"
}
[/block]
All events have a `treeModel` attribute that allows you to access the tree API.
Specific events and other attributes are listed below:
[block:api-header]
{
  "title": "toggleExpanded"
}
[/block]
Triggers when expanding / collapsing a tree node.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode\n**isActive**: boolean"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "activate"
}
[/block]
Triggers when activating a tree node, by clicking on the node, or by using the Enter / Space keys.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "deactivate"
}
[/block]
Triggers when deactivating a tree node, by clicking on the node, or by using the Enter or Space keys.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "focus"
}
[/block]
Triggers when focusing on a node, by moving with the arrow keys.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "blur"
}
[/block]
Triggers when focusing on a node, by moving with the arrow keys.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "initialized"
}
[/block]
Triggers after tree model was created.
Good for performing actions immediately on init, like expanding / activating certain nodes, etc.
You can access the tree model using a ref, as described in the API section.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "updateData"
}
[/block]
Triggers after tree model was updated, either by changing the inputs of the tree (nodes, options, etc.) or a direct call to `update()`.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "moveNode"
}
[/block]
This event is fired any time `moveNode` is called on the tree.
Typically - when drag and dropping a node.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode. The node that was moved\n**to**: Object containing:\n  **parent**: The parent node that contains the moved node\n  **index**: Index in the parent where the node was moved"
}
[/block]

[block:api-header]
{
  "title": "copyNode"
}
[/block]
This event is fired any time `copyNode` is called on the tree.
Typically - when drag and dropping a node while `ctrl` key is pressed.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode. The node that was copied\n**to**: Object containing:\n  **parent**: The parent node that contains the copied node\n  **index**: Index in the parent where the node was copied"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "event"
}
[/block]
Catch-all event that is triggered on every other event that is triggered.
Useful for doing the same action for different events by checking the eventName.
The parameters will match whatever event was sent originally.
[block:callout]
{
  "type": "info",
  "body": "**eventName**: string\n**...rest**: corresponding to the original event",
  "title": "Parameters"
}
[/block]

[block:api-header]
{
  "title": "loadNodeChildren"
}
[/block]
Callback after async children were added to the tree
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode. The parent node"
}
[/block]

[block:api-header]
{
  "title": "changeFilter"
}
[/block]
Fired after filter has changed or cleared
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string"
}
[/block]

[block:api-header]
{
  "title": "stateChange"
}
[/block]
Fired after tree state has changed. See [Tree State Binding](doc:save-restore) for more info
[block:callout]
{
  "type": "info",
  "title": "**state**: ITreeState"
}
[/block]