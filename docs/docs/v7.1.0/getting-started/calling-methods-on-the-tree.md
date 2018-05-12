---
title: "Calling API Methods"
excerpt: ""
---
You can access the tree API by using the `treeModel` attribute on the element:
[block:api-header]
{
  "title": "Demo"
}
[/block]

[block:html]
{
  "html": "<iframe src=\"https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/#/api\" width=\"100%\" height=\"400px\"></iframe>\n"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/api/api.component.ts\" target=\"_blank\">Source code for this demo</a>"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "\t<tree-root #tree [nodes]=\"nodes\"></tree-root>\n\n  <button (click)=\"tree.treeModel.focusNextNode()\">next node</button>\n  <button (click)=\"tree.treeModel.focusPreviousNode()\">previous node</button>\n  <button (click)=\"tree.treeModel.focusDrillDown()\">drill down</button>\n  <button (click)=\"tree.treeModel.focusDrillUp()\">drill up</button>\n",
      "language": "html"
    }
  ]
}
[/block]
Or by accessing the treeNode that is passed through [Events](doc:events) or using [Action Mapping](doc:action-mapping).

You can find the complete API for TreeModel here:
[TreeModel](doc:treemodel) 

And the complete API for TreeNode here:
[TreeNode](doc:api)