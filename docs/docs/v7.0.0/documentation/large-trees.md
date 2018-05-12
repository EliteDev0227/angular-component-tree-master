---
title: "Large Trees & Virtual Scroll"
excerpt: ""
---
When having a large amount of nodes and experiencing performance issues, it is recommended to use the virtual scroll option.

To use this option, one must supply the height of the container, and the height of each node in the tree.

You can also specify height for the dropSlot which is located between nodes.

Example:
[block:code]
{
  "codes": [
    {
      "code": "<div style=\"height: 400px\">\n  <tree-root [nodes]=\"nodes\" [options]=\"options\"></tree-root>\n</div>",
      "language": "html"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Fixed node height\noptions = {\n  useVirtualScroll: true,\n  nodeHeight: 22\n}\n\n// Or using a function\noptions = {\n  useVirtualScroll: true,\n  nodeHeight: (node: TreeNode) => node.myHeight,\n  dropSlotHeight: 3\n}\n\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Hidden trees"
}
[/block]
If the tree is hidden (for example inside tab or modal), it will not be rendered when it becomes visible.
After it becomes visible (preferably using setTimeout) - you need to call `tree.sizeChanged()`, which recalculates the rendered nodes according to the actual viewport size.
[block:api-header]
{
  "title": "Demo"
}
[/block]
Initializing 100,000 nodes, please be patient...
[block:html]
{
  "html": "<iframe src=\"https://rawgit.com/500tech/angular-tree-component/master/example/cli/dist/#/virtual\" width=\"520px\" height=\"862px\"></iframe>\n"
}
[/block]

[block:html]
{
  "html": "<a href=\"https://github.com/500tech/angular-tree-component/blob/master/example/cli/src/app/virtualscroll/virtualscroll.component.ts\" target=\"_blank\">Source code for this demo</a>"
}
[/block]