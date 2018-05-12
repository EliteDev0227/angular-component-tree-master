---
title: "Events"
excerpt: ""
---
Registering events:
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
  "title": "onDoubleClick"
}
[/block]
Triggers when double clicking a node
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
  "title": "onContextMenu"
}
[/block]
Triggers when right-clicking a node. For using a custom context menu, use the `hasCustomContextMenu` option (see Configuration section).
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