---
title: "Calling methods"
excerpt: ""
---
You can access the tree API by using the `treeModel` attribute on the element:
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