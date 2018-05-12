---
title: "Custom Templates"
excerpt: ""
---
You can customize the tree's templates using embedded `ng-template` tags
[block:callout]
{
  "type": "info",
  "title": "Note: Angular 2 vs. 4",
  "body": "In Angular 2 you should use `<template>` tag, whereas in Angular 4 it's `<ng-template>`"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "#treeNodeTemplate"
}
[/block]
Use `#treeNodeTemplate` for the content of the node.
You will have access to the following variables:
node: of type TreeNode. Exposes many useful methods, as well as a `data` attribute with the original node's data.
index: The index of the current node in the parent's children.

For example:
[block:code]
{
  "codes": [
    {
      "code": "<tree-root [nodes]=\"nodes\">\n  <ng-template #treeNodeTemplate let-node let-index=\"index\">\n\t  <span>{{ node.data.name }}</span>\n\t  <button (click)=\"go($event)\">Custom Action</button>\n  </ng-template>\n</tree-root>",
      "language": "html"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "#treeNodeWrapperTemplate"
}
[/block]
This option is useful in case all you need to further customise the expander location and the node's event listeners.

Start by specifying the following template, and make sure the tree still renders as expected.
Then remove / change whatever you need:
[block:code]
{
  "codes": [
    {
      "code": "<tree-root [nodes]=\"nodes\">\n  <ng-template #treeNodeWrapperTemplate let-node let-index=\"index\">\n    <div class=\"node-wrapper\" [style.padding-left]=\"node.getNodePadding()\">\n      <tree-node-expander [node]=\"node\"></tree-node-expander>\n      <div class=\"node-content-wrapper\"\n        [class.node-content-wrapper-active]=\"node.isActive\"\n        [class.node-content-wrapper-focused]=\"node.isFocused\"\n        (click)=\"node.mouseAction('click', $event)\"\n        (dblclick)=\"node.mouseAction('dblClick', $event)\"\n        (contextmenu)=\"node.mouseAction('contextMenu', $event)\"\n        (treeDrop)=\"node.onDrop($event)\"\n        [treeAllowDrop]=\"node.allowDrop\"\n        [treeDrag]=\"node\"\n        [treeDragEnabled]=\"node.allowDrag()\">\n\n        <tree-node-content [node]=\"node\" [index]=\"index\"></tree-node-content>\n      </div>\n    </div>\n  </ng-template>\n</tree-root>",
      "language": "html"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "#loadingTemplate"
}
[/block]
For asynchronous data loading, use `#loadingTemplate` to customize the message that appears while loading the children.

For example:
[block:code]
{
  "codes": [
    {
      "code": "<tree-root [nodes]=\"nodes\">\n  <template #loadingTemplate>Loading, please hold....</template>\n</tree-root>",
      "language": "text"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "#treeNodeFullTemplate"
}
[/block]
This option is useful in case all other customisation options are not suitable for you.
It allows for full customisation of the node, as it replaces the internal template for the TreeNode component.

Start by specifying the following template, and make sure the tree still renders as expected.
Then remove / change whatever you need:
[block:code]
{
  "codes": [
    {
      "code": "<ng-template #treeNodeFullTemplate\n          let-node\n          let-index=\"index\"\n          let-templates=\"templates\">\n  <div\n    [class]=\"node.getClass()\"\n    [class.tree-node]=\"true\"\n    [class.tree-node-expanded]=\"node.isExpanded && node.hasChildren\"\n    [class.tree-node-collapsed]=\"node.isCollapsed && node.hasChildren\"\n    [class.tree-node-leaf]=\"node.isLeaf\"\n    [class.tree-node-active]=\"node.isActive\"\n    [class.tree-node-focused]=\"node.isFocused\">\n\n    <tree-node-drop-slot\n                         *ngIf=\"index === 0\"\n                         [dropIndex]=\"node.index\"\n                         [node]=\"node.parent\">\n    </tree-node-drop-slot>\n\n    <tree-node-wrapper [node]=\"node\" [index]=\"index\" [templates]=\"templates\">\n    </tree-node-wrapper>\n\n    <tree-node-children [node]=\"node\" [templates]=\"templates\">\n    </tree-node-children>\n    <tree-node-drop-slot [dropIndex]=\"node.index + 1\" [node]=\"node.parent\">\n    </tree-node-drop-slot>\n  </div>\n</ng-template>\n",
      "language": "html"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note!",
  "body": "Do not remove `let-templates=\"templates\"` and passing `[templates]=\"templates\"` to `tree-node-children`. If you do that, the children of your nodes will not receive the custom template you provided."
}
[/block]

[block:api-header]
{
  "title": "Demo"
}
[/block]

[block:html]
{
  "html": "<iframe height=\"400px\" width=\"400px\" src=\"https://rawgit.com/500tech/angular2-tree-component/master/example/cli/dist/index.html#templates\"></iframe>\n\n<style></style>"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/templates/templates.component.ts\" target=\"_blank\">Source code for this demo</a>\n"
}
[/block]