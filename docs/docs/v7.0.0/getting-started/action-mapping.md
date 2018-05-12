---
title: "Customize Actions"
excerpt: ""
---
[block:api-header]
{
  "title": "Demo"
}
[/block]

[block:html]
{
  "html": "<iframe src=\"https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/#/actions\" width=\"100%\" height=\"350px\"></iframe>\n"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/actions/actions.component.ts\" target=\"_blank\">Source code for this demo</a>"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Override key and mouse actions"
}
[/block]
Angular Tree Component comes with a default mapping of mouse events and key events to actions. For example - click on the node activates / deactivates it, click on the expander expands / collapses it, pressing space or enter will toggle the node activation (same as click), etc.

Using the `actionMapping` option, you can override how the tree reacts to mouse and key events, by providing a custom mapping.
[block:code]
{
  "codes": [
    {
      "code": "import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';\n\nconst actionMapping:IActionMapping = {\n  mouse: {\n    click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI\n  },\n  keys: {\n    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)\n  }  \n}",
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
See full API Here: [ActionMapping](doc:actionmapping) 
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
- TOGGLE_ACTIVE
- TOGGLE_ACTIVE_MULTI
- ACTIVATE
- DEACTIVATE
- TOGGLE_SELECTED
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
- MOVE_NODE
[block:api-header]
{
  "type": "basic",
  "title": "Mouse actions"
}
[/block]
In mouse actions, the `TreeNode` parameter of the callback is the node that the event was activated on (e.g. clicked on).

The possible attributes for `actionMapping.mouse` are:
- click
- dblClick
- expanderClick
- checkboxClick
- contextMenu (right click)
- dragStart
- drag
- dragOver
- dragEnd
- dragLeave
- dragEnter
- drop

For example: 
[block:code]
{
  "codes": [
    {
      "code": "import { TREE_ACTIONS, IActionMapping } from 'angular-tree-component';\n\nactionMapping:IActionMapping = {\n  mouse: {\n    dblClick: (tree, node, $event) => // Open a modal with node content,\n    click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI,\n  }\n}\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Shift+Click (Alt / Ctrl)"
}
[/block]
If you want to perform actions based on modifier keys, use `$event.shiftKey`, `$event.ctrlKey` etc., provided on the third callback argument - `$event`.
[block:api-header]
{
  "type": "basic",
  "title": "Keyboard events"
}
[/block]
In keyboard events, the `TreeNode` parameter of the callback is the currently focused node. In case no node is focused, this will be null.

The attributes for `actionMapping.keys` are integers which represent the key code (e.g. 32 for Space)

angular-tree-component exposes a `KEYS` constant with predefined common key codes:

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
      "code": "import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';\n\nactionMapping:IActionMapping = {\n  keys: {\n    127: (tree, node, $event) => // do something to delete the node,\n    [KEYS.ENTER]: TREE_ACTIONS.EXPAND\n  }\n}\n",
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
Here is the default mapping that ships with angular-tree-component:
[block:code]
{
  "codes": [
    {
      "code": "const defaultActionMapping: IActionMapping = {\n  mouse: {\n    click: TREE_ACTIONS.TOGGLE_ACTIVE,\n    dblClick: null,\n    contextMenu: null,\n    expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,\n    checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,\n    drop: TREE_ACTIONS.MOVE_NODE\n  },\n  keys: {\n    [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,\n    [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,\n    [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,\n    [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,\n    [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,\n    [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE\n  }\n};",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Context menu"
}
[/block]
In case you want to open your own context menu, you must first run `$event.preventDefault()` within the callback.