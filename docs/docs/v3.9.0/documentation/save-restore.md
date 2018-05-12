---
title: "Tree State"
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
      "code": "<tree-root [(state)]=\"state\" [nodes]=\"nodes\"></tree-root>\n\nimport { ITreeState } from 'angular-tree-component';\n\nclass MyComponent {\n  state:ITreeState;\n\n  collapseAll() {\n    this.state = {\n      ...this.state,\n      expandedNodeIds: {}\n    };\n  }\n  \n  hideFolders() {\n    const hiddenNodeIds = {};\n\n    this.nodes.forEach((node) => {\n      if (node.data.isFolder) {\n        hiddenNodeIds[node.id] = true;\n      }\n    });\n\n    this.state = {\n      ...this.state,\n      hiddenNodeIds\n    };\n  }\n}",
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