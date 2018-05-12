---
title: "Options"
excerpt: ""
---
Pass options to the Tree component
[block:code]
{
  "codes": [
    {
      "code": "    <Tree [nodes]=\"nodes\" [options]=\"options\"></Tree>\n",
      "language": "javascript"
    }
  ]
}
[/block]
The following properties of the options object are available.
You can find them in `ITreeOptions` interface in `defs/api.ts`
[block:callout]
{
  "type": "info",
  "title": "displayField",
  "body": "A string representing the attribute of the node to display.\n\n**Default value: `name`.**\n\nFor example, if your nodes have a `title` attribute that should be displayed, use:\n```\n  options = { displayField: 'title' }\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "childrenField",
  "body": "A string representing the attribute of the node that contains the array of children.\n\n**Default value: `children`.**\n\nFor example, if your nodes have a `nodes` attribute, that contains the children, use:\n```\n  options = { childrenField: 'nodes' }\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "idField",
  "body": "A string representing the attribute of the node that contains the unique ID.\nThis will be used to construct the `path`, which is an array of IDs that point to the node.\n**Default value: `id`.**\n\nFor example, if your nodes have a `uuid` attribute, that contains the unique key, use:\n```\n  options = { idField: 'uuid' }\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "isExpandedField",
  "body": "A string representing the attribute of the node that contains whether the node starts as expanded.\n**Default value: `isExpanded`.**\n\nFor example, if your nodes have an `expanded` attribute, that contains the unique key, use:\n```\n  options = { isExpandedField: 'expanded' }\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "getChildren",
  "body": "Function for loading a node's children.\nThe function receives a TreeNode, and returns a value or a promise that resolves to the node's children.\n\nThis function will be called whenever a node is expanded, the `hasChildren` field is true, and the `children` field is empty.\nThe result will be loaded into the node's children attribute.\n\nExample:\n```\noptions = {\n  getChildren: (node:TreeNode) => {\n    return request('/api/children/' + node.id);\n  }\n}\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "actionMapping",
  "body": "Rewire which trigger causes which action using this attribute, or create custom actions / event bindings.\n\nSee the [Action Mapping Section](doc:action-mapping) for more details.\n\n**Default value: see [Action Mapping Section](doc:action-mapping)**\n\nFor example, overriding shift+click to do multi select, and `enter` key to do a custom callback:\n```\nimport {\n  TreeComponent,\n  TreeNode,\n  TREE_ACTIONS,\n  KEYS,\n  IActionMapping\n} from 'angular2-tree-component';\n\nconst actionMapping:IActionMapping = {\n  mouse: {\n    click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI\n  },\n  keys: {\n    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)\n  }\n};\n\nMyComponent {\n  treeOptions = {\n    actionMapping\n  }\n}\n\n<Tree  [nodes]=\"nodes\"  [options]=\"treeOptions\"></Tree>\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "isHiddenField",
  "body": "The name of the node's field that determines if the node's element is displayed or not.\n\n**Default value: `isHidden`.**\n\nFor example, if one of your nodes has a `hidden` attribute, that contains true, and you give the following configuration, then it will not be displayed:\n```\n  options = { isHiddenField: 'hidden' }\n  nodes = [\n    { id: 1, hidden: true, name: 'node1'},\n    { id: 2, name: 'node2'},\n    ...\n  ]\n```"
}
[/block]