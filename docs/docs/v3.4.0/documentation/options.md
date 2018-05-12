---
title: "All Options"
excerpt: ""
---
All available options:
[displayField](#displayfield)
[childrenField](#childrenfield)
[idField](#idfield)
[isExpandedField](#isexpandedfield)
[getChildren](#getchildren)
[actionMapping](#actionmapping)
[isHiddenField](#ishiddenfield)
[levelPadding](#levelpadding)
[nodeClass](#nodeclass)
[allowDrag](#allowdrag)
[allowDrop](#allowdrop)
[useVirtualScroll](#useVirtualScroll)
[nodeHeight](#nodeHeight)
[dropSlotHeight](#dropSlotHeight)
[animateExpand](#animateExpand)
[animateSpeed](#animateSpeed)
[animateAcceleration](#animateAcceleration)
[block:code]
{
  "codes": [
    {
      "code": "    <tree-root [nodes]=\"nodes\" [options]=\"options\"></tree-root>\n",
      "language": "javascript"
    }
  ]
}
[/block]
The following properties of the options object are available.
You can find them in `ITreeOptions` interface in `defs/api.ts`
[block:api-header]
{
  "type": "basic",
  "title": "displayField"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "A string representing the attribute of the node to display.\n\n**Default value: `name`.**\n\nFor example, if your nodes have a `title` attribute that should be displayed, use:\n```\n  options = { displayField: 'title' }\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "childrenField"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "A string representing the attribute of the node that contains the array of children.\n\n**Default value: `children`.**\n\nFor example, if your nodes have a `nodes` attribute, that contains the children, use:\n```\n  options = { childrenField: 'nodes' }\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "idField"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "A string representing the attribute of the node that contains the unique ID.\nThis will be used to construct the `path`, which is an array of IDs that point to the node.\n**Default value: `id`.**\n\nFor example, if your nodes have a `uuid` attribute, that contains the unique key, use:\n```\n  options = { idField: 'uuid' }\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "isExpandedField"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "A string representing the attribute of the node that contains whether the node starts as expanded.\n**Default value: `isExpanded`.**\n\nFor example, if your nodes have an `expanded` attribute, that contains a boolean value, use:\n```\n  options = { isExpandedField: 'expanded' }\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "getChildren"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "Function for loading a node's children.\nThe function receives a TreeNode, and returns a value or a promise that resolves to the node's children.\n\nThis function will be called whenever a node is expanded, the `hasChildren` field is true, and the `children` field is empty.\nThe result will be loaded into the node's children attribute.\n\nExample:\n```\noptions = {\n  getChildren: (node:TreeNode) => {\n    return request('/api/children/' + node.id);\n  }\n}\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "actionMapping"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "Rewire which trigger causes which action using this attribute, or create custom actions / event bindings.\n\nSee the [Action Mapping Section](doc:action-mapping) for more details.\n\n**Default value: see [Action Mapping Section](doc:action-mapping)**\n\nFor example, overriding shift+click to do multi select, and `enter` key to do a custom callback:\n```\nimport {\n  TreeComponent,\n  TreeNode,\n  TREE_ACTIONS,\n  KEYS,\n  IActionMapping\n} from 'angular2-tree-component';\n\nconst actionMapping:IActionMapping = {\n  mouse: {\n    click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI\n  },\n  keys: {\n    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)\n  }\n};\n\nMyComponent {\n  treeOptions = {\n    actionMapping\n  }\n}\n\n<Tree  [nodes]=\"nodes\"  [options]=\"treeOptions\"></Tree>\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "isHiddenField"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "The name of the node's field that determines if the node's element is displayed or not.\n\n**Default value: `isHidden`.**\n\nFor example, if one of your nodes has a `hidden` attribute, that contains true, and you give the following configuration, then it will not be displayed:\n```\n  options = { isHiddenField: 'hidden' }\n  nodes = [\n    { id: 1, hidden: true, name: 'node1'},\n    { id: 2, name: 'node2'},\n    ...\n  ]\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "levelPadding"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "Specify padding per node (integer).\nEach node will have padding-left value of level * levelPadding, instead of using the default padding for children.\n\nThis option is good for example for allowing whole row selection, etc.\n\nYou can alternatively use the tree-node-level-X classes to give padding on a per-level basis.\n\n**Default value: 0.**"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "nodeClass"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "Specify a function that returns a class per node. Useful for styling the nodes individually.\n\nExample:\n```\noptions = {\n  nodeClass: (node:TreeNode) => {\n    return 'icon-' + node.data.icon;\n  }\n}\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "allowDrag"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Specify if dragging tree nodes is allowed.\n**Default value: false.**\n\nExample:\n```\noptions = {\n  allowDrag: true\n}\n```"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "allowDrop"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Specify whether dropping inside the tree is allowed. Optional types:\n- boolean\n- (element:any, to:{parent:ITreeNode, index:number}):boolean\n  A function that receives the dragged element, and the drop location (parent node and index inside the parent), and returns true or false.\n\n**defaultValue: true**\n\nexample:\n```\noptions = {\n  allowDrop: (element, {parent, index}) => parent.isLeaf\n}\n```"
}
[/block]

[block:api-header]
{
  "title": "useVirtualScroll"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Boolean flag to use the virtual scroll option.\n\nTo use this option, one must supply the height of the container, and the height of each node in the tree.\n\nYou can also specify height for the dropSlot which is located between nodes.\n**defaultValue: false**\n\nexample:\n```\noptions = {\n  useVirtualScroll: true,\n  nodeHeight: (node: TreeNode) => node.myHeight,\n  dropSlotHeight: 3\n}\n```"
}
[/block]

[block:api-header]
{
  "title": "nodeHeight"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "For use with `useVirtualScroll` option.\nSpecify a height for nodes in pixels. Could be either:\n- number\n- (node: TreeNode) => number\n\n**defaultValue: 22**"
}
[/block]

[block:api-header]
{
  "title": "dropSlotHeight"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "For use with `useVirtualScroll` option.\nSpecify a height for drop slots (located between nodes) in pixels\n\n**defaultValue: 2**"
}
[/block]

[block:api-header]
{
  "title": "animateExpand"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Boolean whether or not to animate expand / collapse of nodes.\n\n**defaultValue: false**",
  "title": ""
}
[/block]

[block:api-header]
{
  "title": "animateSpeed"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Speed of expand animation (described in pixels per 17 ms).\n\n**defaultValue: 30**",
  "title": ""
}
[/block]

[block:api-header]
{
  "title": "animateAcceleration"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Increase of expand animation speed (described in multiply per 17 ms).\n\n**defaultValue: 1.2**",
  "title": ""
}
[/block]