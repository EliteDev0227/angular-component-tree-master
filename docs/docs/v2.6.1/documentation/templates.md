---
title: "Templates"
excerpt: ""
---
You can customize the tree's templates using embedded `template` tags
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
      "code": "<Tree [nodes]=\"nodes\">\n  <template #treeNodeTemplate let-node=\"node\" let-index=\"index\">\n\t  <span>{{ node.data.name }}</span>\n\t  <button (click)=\"go($event)\">Custom Action</button>\n  </template>\n</Tree>",
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
      "code": "<Tree [nodes]=\"nodes\">\n  <template #loadingTemplate>Loading, please hold....</template>\n</Tree>",
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
      "code": "<template #treeNodeFullTemplate\n          let-node=\"node\"\n          let-index=\"index\"\n          let-templates=\"templates\">\n  <div\n       *ngIf=\"!node.isHidden\"\n       class=\"tree-node tree-node-level-{{ node.level }}\"\n       [class]=\"node.getClass()\"\n       [class.tree-node-expanded]=\"node.isExpanded && node.hasChildren\"\n       [class.tree-node-collapsed]=\"node.isCollapsed && node.hasChildren\"\n       [class.tree-node-leaf]=\"node.isLeaf\"\n       [class.tree-node-active]=\"node.isActive\"\n       [class.tree-node-focused]=\"node.isFocused\">\n\n    <TreeNodeDropSlot *ngIf=\"index === 0\" [dropIndex]=\"index\" [node]=\"node.parent\">\n    </TreeNodeDropSlot>\n\n        <div class=\"node-wrapper\" [style.padding-left]=\"node.getNodePadding()\">\n          <TreeNodeExpander [node]=\"node\"></TreeNodeExpander>\n          <div class=\"node-content-wrapper\"\n            (click)=\"node.mouseAction('click', $event)\"\n            (dblclick)=\"node.mouseAction('dblClick', $event)\"\n            (contextmenu)=\"node.mouseAction('contextMenu', $event)\"\n            (treeDrop)=\"node.onDrop($event)\"\n            [treeAllowDrop]=\"node.allowDrop\"\n            [treeDrag]=\"node\"\n            [treeDragEnabled]=\"node.allowDrag()\">\n\n            <TreeNodeContent [node]=\"node\" [index]=\"index\" [template]=\"templates.treeNodeTemplate\">\n            </TreeNodeContent>\n          </div>\n        </div>\n\n      <TreeNodeChildren [node]=\"node\" [templates]=\"templates\"></TreeNodeChildren>\n      <TreeNodeDropSlot [dropIndex]=\"index + 1\" [node]=\"node.parent\"></TreeNodeDropSlot>\n    </div>\n  </template>\n",
      "language": "html"
    }
  ]
}
[/block]