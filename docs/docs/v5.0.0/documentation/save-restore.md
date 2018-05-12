---
title: "Tree State Binding"
excerpt: ""
---
[block:api-header]
{
  "title": "2 way binding to state"
}
[/block]
You can control the tree state using 2 way binding.
The state includes the following:
- expandedNodeIds - dictionary of node IDs to booleans
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
      "code": "<tree-root\n\t[state]=\"state\"\n  (stateChange)=\"setState($event)\"\n  [nodes]=\"nodes\">\n</tree-root>\n\nclass MyComponent {\n  state = localStorage.treeState && JSON.parse(localStorage.treeState);\n  setState(state) {\n    localStorage.treeState = JSON.stringify(state);\n  }\n}",
      "language": "javascript"
    }
  ]
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