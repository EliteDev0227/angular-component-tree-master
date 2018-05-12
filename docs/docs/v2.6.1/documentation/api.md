---
title: "API"
excerpt: ""
---
You can access the tree API by using the `treeModel` attribute on the element:
[block:code]
{
  "codes": [
    {
      "code": "\t<Tree #tree [nodes]=\"nodes\"></Tree>\n\n  <button (click)=\"tree.treeModel.focusNextNode()\">next node</button>\n  <button (click)=\"tree.treeModel.focusPreviousNode()\">previous node</button>\n  <button (click)=\"tree.treeModel.focusDrillDown()\">drill down</button>\n  <button (click)=\"tree.treeModel.focusDrillUp()\">drill up</button>\n",
      "language": "javascript"
    }
  ]
}
[/block]
Or by accessing the treeNode that is passed through [Events](doc:events) or using [Action Mapping](doc:action-mapping).

Here is the Typedoc documentation of the interfaces:
[block:embed]
{
  "html": false,
  "url": "https://rawgit.com/500tech/angular2-tree-component/master/doc/modules/_api_.html",
  "title": "\"api\" | angular2-tree-component",
  "favicon": "https://rawgit.com/favicon.ico",
  "iframe": true,
  "width": "100%",
  "height": "1500px"
}
[/block]