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