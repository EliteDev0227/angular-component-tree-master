---
title: "Events"
excerpt: ""
---
[Registering events](#registering-events)
[onToggle](#ontoggle)
[onActiveChanged](#onactivechanged)
[onActivate](#onactivate)
[onDeactivate](#ondeactivate)
[onFocus](#onfocus)
[onBlur](#onblur)
[onDoubleClick - deprecated](#ondoubleclick-deprecated)
[onContextMenu - deprecated](#oncontextmenu-deprecated)
[onInitialized](#oninitialized)
[onUpdateData](#onupdatedata)
[onMoveNode](#onmovenode)
[onEvent](#onevent)
[block:api-header]
{
  "type": "basic",
  "title": "Registering events"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "\t<Tree [nodes]=\"nodes\"\n    (onToggle)=\"onEvent($event)\"\n    (onActiveChanged)=\"onEvent($event)\"\n    (onFocus)=\"onEvent($event)\"\n    (onBlur)=\"onEvent($event)\">\n  </Tree>\n\n  onEvent = ($event) => console.log($event);\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "onToggle"
}
[/block]
Triggers when collapsing / expanding a tree node, by clicking on the expand / collapse icon, or by using the right / left arrows.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: ITreeNode\n**isExpanded**: boolean"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "onActiveChanged"
}
[/block]
Triggers when activating / deactivating a tree node, by clicking on the node, or by using the Enter / Space keys.
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
  "title": "onActivate"
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
  "title": "onDeactivate"
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
  "title": "onFocus"
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
  "title": "onBlur"
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
  "title": "onDoubleClick - deprecated"
}
[/block]
This event is deprecated. Use actionMapping instead
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
  "title": "onContextMenu - deprecated"
}
[/block]
This event is deprecated. Use actionMapping instead
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
  "title": "onInitialized"
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
  "title": "onUpdateData"
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
  "title": "onMoveNode"
}
[/block]
This event is fired any time `moveNode` is called on the tree.
Typically - when drag and dropping a node.
[block:callout]
{
  "type": "info",
  "title": "Parameters",
  "body": "**eventName**: string\n**node**: The node that was moved\n**to**: Object containing:\n  **node**: The parent node that contains the moved node\n  **index**: Index in the parent where the node was moved"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "onEvent"
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