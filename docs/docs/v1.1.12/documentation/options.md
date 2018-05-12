---
title: "Configuration"
excerpt: ""
---
Pass options to the Tree component
[block:code]
{
  "codes": [
    {
      "code": "    <Tree [nodes]=\"nodes\" [focused]=\"true\" [options]=\"options\"></Tree>\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "nodes",
  "body": "Array of root nodes of the tree.\nEach node may contain but not limited or required to the following:\n- id - a unique ID (among siblings) that will be used to identify the path to the node in the tree\n- name - will be displayed by default in the tree\n- children - an array of the node's children\n- hasChildren - for async data load. Denotes that this node might have children, even when 'children' attr is empty\n- isExpanded - determines whether the node starts as expanded by default\n\nExample:\n```\n  [\n    {\n      id: 1,\n      name: 'root1',\n      isExpanded: true,\n      children: [\n        {\n          id: 2,\n          name: 'child1'\n        }, {\n          id: 3,\n          name: 'child2'\n        }\n      ]\n    }\n  ]\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "focused",
  "body": "Whether the tree should be focused. Key navigation only works when the tree is focused.\n**Default value: false.**"
}
[/block]
## The options object
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
  "body": "A string representing the attribute of the node that contains whether the node starts as expanded.\n**Default value: `isExpanded`.**\n\nFor example, if your nodes have an `expanded` attribute, that contains the unique key, use:\n```\n  options = { isExpanded: 'expanded' }\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "treeNodeTemplate",
  "body": "This could be either a string, or a component. This template will be displayed for each node of the tree.\nWhen using a string, you have the `node` variable available to use, which is the original node, wrapped with TreeNode.\nWhen using a component, you receive the node as Input. You can see the `ITreeNodeTemplateComponent` interface for the component in `defs/api.ts`.\n\nYou can access the original data on `node.data`.\n\nAlso, you can use all methods of TreeNode on 'node' itself, such as `isLeaf`, `toggle`, `isCollapsed`, `fireEvent` and many more. See `ITreeNode`, as defined in `defs/api.ts`.\n\n**Default value: '{{ node.displayField }}'**\n\nExamples:\n*String*\n```\noptions = { treeNodeTemplate: '<a [href]=\"node.link\">{{ node.data.name }}</a>' }\n``` \n*Component*\n```\n@Component({\n    template: '<a (click)=\"node.toggle())\">{{ node.data.name }}</a>'\n})\nclass MyTreeNodeTemplate {\n  @Input() node: TreeNode;\n}\n\noptions = { treeNodeTemplate: MyTreeNodeTemplate }\n```"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "This could be either a string, or a component. This template will be used when loading children asynchronously.\n\n**Default value: 'loading...'**\n\nExamples:\n*String*\n```\noptions = { loadingComponent: 'loading, please wait...' }\n``` \n*Component*\n```\n@Component({\n    template: '<img src=\"loading.gif\"/>'\n})\nclass MyLoadingComponent {\n}\n\noptions = { loadingComponent: MyLoadingComponent }\n```",
  "title": "loadingComponent"
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
  "title": "hasCustomContextMenu",
  "body": "Determines whether the native context menu should be prevented on right-click.\nOpening the actual context menu can be handled using the onContextMenu, or inside a custom template.\n\n**Default value: false**"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "context",
  "body": "This can be used inside the custom template, when you want to call methods or use properties from the encapsulating component.\n\n**Default value: null**\n\nExample:\n```\nMyComponent {\n  treeOptions = {\n    treeNodeTemplate: '{{ node.data.name }} <button ng-click=\"context.doSomething()\">Go!</button>'\n    context: this\n  }\n\n  doSomething() {\n  }\n}\n```"
}
[/block]