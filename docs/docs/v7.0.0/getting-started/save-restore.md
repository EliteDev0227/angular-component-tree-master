---
title: "2-way binding to state"
excerpt: ""
---
You can control the tree state using 2-way binding.
The state includes the following:
- expandedNodeIds - dictionary of node IDs to booleans
- selectedLeafNodeIds - dictionary of node IDs to booleans
- activeNodeIds - dictionary of node IDs to booleans
- hiddenNodeIds - dictionary of node IDs to booleans
- focusedNodeId - node ID

You can change the state reference and the tree will respond automatically, and also access the tree state at any time, as it is always updated via the 2-way binding.

Example:
[block:code]
{
  "codes": [
    {
      "code": "import { Component } from '@angular/core';\nimport { ITreeState } from 'angular-tree-component';\n\n@Component({\n  selector: 'app-saverestore',\n  template: `\n    <tree-root [(state)]=\"state\" [nodes]=\"nodes\"></tree-root>\n    <button (click)=\"collapseAll()\">collapse all</button>\n    <button (click)=\"hideFolders()\">hide folders</button>\n  `,\n  styles: []\n})\nexport class MyComponent {\n  state: ITreeState;\n  nodes = [\n    { id: 1, isFolder: true, name: 'folder1', children: [\n      { id: 2, name: 'file1', isFolder: false },\n      { id: 3, name: 'file2', isFolder: false }\n    ] },\n    { id: 4, isFolder: false, name: 'flatfile1' },\n    { id: 5, isFolder: false, name: 'flatfile2' }\n  ];\n\n  collapseAll() {\n    this.state = {\n      ...this.state,\n      expandedNodeIds: {}\n    };\n  }\n\n  hideFolders() {\n    const hiddenNodeIds = {};\n\n    this.nodes.forEach((node) => {\n      if (node.isFolder) {\n        hiddenNodeIds[node.id] = true;\n      }\n    });\n\n    this.state = {\n      ...this.state,\n      hiddenNodeIds\n    };\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Persist state to localstorage"
}
[/block]
This example is using the 2 way binding to tree state to auto save & restore from localstorage:
[block:code]
{
  "codes": [
    {
      "code": "<tree-root\n\t[(state)]=\"state\"\n  [nodes]=\"nodes\">\n</tree-root>\n\nclass MyComponent {\n  get state() {\n    return localStorage.treeState && JSON.parse(localStorage.treeState);\n  }\n  set state(state) {\n    localStorage.treeState = JSON.stringify(state);\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]
Demo:
[block:html]
{
  "html": "<iframe src=\"https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/#/save-restore\" width=\"100%\" height=\"300px\"></iframe>\n"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/save-restore/save-restore.component.ts\" target=\"_blank\">Source code for this demo</a>"
}
[/block]

[block:api-header]
{
  "title": "Using API"
}
[/block]
Alternatively, you can use `getState`, `setState` and `subscribe` on treeModel API.
`subscribe` will callback a function every time state changes.
[block:code]
{
  "codes": [
    {
      "code": "<tree-root\n\t#tree\n  (initialize)=\"onInit(tree)\"\n  [nodes]=\"nodes\">\n</tree-root>\n\nclass MyComponent {\n  onInit(tree) {\n    if (localStorage.treeState) {\n    \ttree.treeModel.setState(JSON.parse(localStorage.treeState);\n    }\n    tree.treeModel.subscribe((state) => {\n      localStorage.treeState = JSON.stringify(state);\n    });\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]