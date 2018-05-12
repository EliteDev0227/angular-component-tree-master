---
title: "Action Mapping"
excerpt: ""
---
[block:api-header]
{
  "type": "basic",
  "title": "Override mapping of keys and mouse events to actions"
}
[/block]
Angular2 Tree Component comes with a default mapping of mouse events and key events to actions. For example - click on the node selects / deselects it, click on the expander expands / collapses it, pressing space or enter will toggle the node selection (same as click), etc.

Using the `actionMapping` option, you can override how the tree reacts to mouse and key events, by providing a custom mapping.
[block:code]
{
  "codes": [
    {
      "code": "import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular2-tree-component';\n\nconst actionMapping:IActionMapping = {\n  mouse: {\n    shift: {\n      click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI\n    }\n  },\n  keys: {\n    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)\n  }  \n}",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "actionMapping (IActionMapping)"
}
[/block]
The `actionMapping` attribute needs to implement the `IActionMapping` interface, which is an object that maps predefined mouse events, and key codes, to callbacks.
[block:api-header]
{
  "type": "basic",
  "title": "The callback (IActionHandler)"
}
[/block]
The callback always receives three parameters: `TreeModel`, `TreeNode`, and `$event`.
[block:api-header]
{
  "type": "basic",
  "title": "TREE_ACTIONS"
}
[/block]
Notice the `TREE_ACTIONS` object. It holds predefined callbacks that do common actions.
The available attributes are:
- TOGGLE_SELECTED
- TOGGLE_SELECTED_MULTI
- SELECT
- DESELECT
- FOCUS
- TOGGLE_EXPANDED
- EXPAND
- COLLAPSE
- DRILL_DOWN
- DRILL_UP
- NEXT_NODE
- PREVIOUS_NODE
[block:api-header]
{
  "type": "basic",
  "title": "Mouse events"
}
[/block]
In mouse events, the `TreeNode` parameter of the callback is the node that the event was activated on (e.g. clicked on).

The possible attributes for `actionMapping.mouse` are:
- click
- dblClick
- expanderClick
- contextMenu (right click)

It also has three attributes for modifier keys `shift`, `ctrl` and `alt`, each one has the same fields as above (click, dblClick, etc.).
For example: 
[block:code]
{
  "codes": [
    {
      "code": "import { TREE_ACTIONS, IActionMapping } from 'angular2-tree-component';\n\nactionMapping:IActionMapping = {\n  mouse: {\n    dblClick: (tree, node, $event) => // Open a modal with node content,\n    ctrl: {\n       click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI,\n    }\n  }\n}\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Keyboard events"
}
[/block]
In keyboard events, the `TreeNode` parameter of the callback is the currently focused node. In case no node is focused, this will be null.

The attributes for `actionMapping.keys` are integers which represent the key code (e.g. 32 for Space)

angular2-tree-component exposes a `KEYS` constant with predefined common key codes:

```
KEYS = {    
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  SPACE: 32
}
```

So you can use those, or pass any keycode you'd like.

For example: 
[block:code]
{
  "codes": [
    {
      "code": "import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular2-tree-component';\n\nactionMapping:IActionMapping = {\n  keys: {\n    127: (tree, node, $event) => // do something to delete the node,\n    [KEYS.ENTER]: TREE_ACTIONS.EXPAND\n  }\n}\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Default mapping"
}
[/block]
Here is the default mapping that ships with angular2-tree-component:
[block:code]
{
  "codes": [
    {
      "code": "{\n  mouse: {    \n    click: TREE_ACTIONS.TOGGLE_SELECTED,\n    dblClick: null,\n    contextMenu: null,\n    expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,\n    shift: {},\n    ctrl: {},\n    alt: {}\n  },\n  keys: {\n    [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,\n    [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,\n    [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,\n    [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,\n    [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_SELECTED,\n    [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_SELECTED\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]