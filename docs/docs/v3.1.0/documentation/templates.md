---
title: "Custom Templates"
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
      "code": "<tree-root [nodes]=\"nodes\">\n  <template #treeNodeTemplate let-node=\"node\" let-index=\"index\">\n\t  <span>{{ node.data.name }}</span>\n\t  <button (click)=\"go($event)\">Custom Action</button>\n  </template>\n</tree-root>",
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
      "code": "<template #treeNodeFullTemplate\n          let-node=\"node\"\n          let-index=\"index\"\n          let-templates=\"templates\">\n  <div\n       *ngIf=\"!templates.treeNodeFullTemplate\"\n       class=\"tree-node tree-node-level-{{ node.level }}\"\n       [class]=\"node.getClass()\"\n       [class.tree-node-expanded]=\"node.isExpanded && node.hasChildren\"\n       [class.tree-node-collapsed]=\"node.isCollapsed && node.hasChildren\"\n       [class.tree-node-leaf]=\"node.isLeaf\"\n       [class.tree-node-active]=\"node.isActive\"\n       [class.tree-node-focused]=\"node.isFocused\">\n\n    <tree-node-drop-slot\n                         *ngIf=\"index === 0\"\n                         [dropIndex]=\"node.index\"\n                         [node]=\"node.parent\">\n    </tree-node-drop-slot>\n\n    <div class=\"node-wrapper\" [style.padding-left]=\"node.getNodePadding()\">\n      <tree-node-expander [node]=\"node\"></tree-node-expander>\n      <div class=\"node-content-wrapper\"\n           (click)=\"node.mouseAction('click', $event)\"\n           (dblclick)=\"node.mouseAction('dblClick', $event)\"\n           (contextmenu)=\"node.mouseAction('contextMenu', $event)\"\n           (treeDrop)=\"node.onDrop($event)\"\n           [treeAllowDrop]=\"node.allowDrop\"\n           [treeDrag]=\"node\"\n           [treeDragEnabled]=\"node.allowDrag()\">\n\n        <tree-node-content\n                           [node]=\"node\"\n                           [index]=\"index\"\n                           [template]=\"templates.treeNodeTemplate\">\n        </tree-node-content>\n      </div>\n    </div>\n\n    <tree-node-children [node]=\"node\" [templates]=\"templates\">\n    </tree-node-children>\n    <tree-node-drop-slot [dropIndex]=\"node.index + 1\" [node]=\"node.parent\">\n    </tree-node-drop-slot>\n  </div>\n</template>\n",
      "language": "html"
    }
  ]
}
[/block]