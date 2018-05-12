---
title: "TreeModel"
excerpt: ""
---
[block:api-header]
{
  "title": "How to invoke methods"
}
[/block]
Get a reference to the `treeModel` attribute to access the API.
For example:
[block:code]
{
  "codes": [
    {
      "code": "\t<tree-root #tree [nodes]=\"nodes\"></tree-root>\n\n  <button (click)=\"tree.treeModel.focusNextNode()\">Next</button>\n  <button (click)=\"tree.treeModel.focusPreviousNode()\">Prev</button>\n",
      "language": "html"
    }
  ]
}
[/block]
Or using a `ViewChild`:
[block:code]
{
  "codes": [
    {
      "code": "import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';\n\nclass MyComponent {\n  @ViewChild('tree') treeComponent: TreeComponent;\n\n  ngAfterInit() {\n    const treeModel:TreeModel = this.treeComponent.treeModel;\n    const firstNode:TreeNode = treeModel.getFirstRoot();\n    \n    firstNode.setActiveAndVisible();\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Complete API"
}
[/block]
You can find the complete API of the TreeModel here:
[block:embed]
{
  "html": false,
  "url": "https://rawgit.com/500tech/angular-tree-component/master/doc/interfaces/_api_.itreemodel.html",
  "title": "ITreeModel | angular-tree-component",
  "favicon": "https://rawgit.com/favicon.ico",
  "iframe": true,
  "height": "2000px"
}
[/block]