---
title: "Updating the tree"
excerpt: ""
---
[block:api-header]
{
  "type": "basic",
  "title": "Changing node attributes"
}
[/block]
Changing any attributes on the node itself will be reflected immediately, since change detection will force the tree node components to re-render.
[block:api-header]
{
  "type": "basic",
  "title": "Adding / Removing nodes"
}
[/block]
After adding or removing nodes from the tree, one must call the `update` method on the treeModel for it to take affect.

For example:
[block:code]
{
  "codes": [
    {
      "code": "<tree-root #tree nodes=\"nodes\"></tree-root>\n\nclass MyComponent {\n  nodes = [{ name: 'node' }];\n\n  @ViewChild(TreeComponent)\n  private tree: TreeComponent;\n\n  addNode() {\n    this.nodes.push({ name: 'another node' });\n    this.tree.treeModel.update();\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]
This is due to the fact that the treeModel builds its own model around the nodes data, to calculate node levels, paths, parent links etc. So it must be informed of any change to the nodes' structure.

Calling update will have no effect on the tree status, i.e. current selected node, current focused node, current expanded nodes, etc.
[block:api-header]
{
  "type": "basic",
  "title": "Working with immutable data"
}
[/block]
Changing the reference to nodes will also trigger an `update` automatically. So if you work for example with immutable data and replace the nodes array instead of mutating it - there is no need to call any method.
[block:code]
{
  "codes": [
    {
      "code": "<tree-root nodes=\"nodes\"></tree-root>\n\nnodes = [...]\n\naddNode(newNode) {\n  // Just add node and replace nodes variable:\n  this.nodes = [...this.nodes, newNode];\n}",
      "language": "javascript"
    }
  ]
}
[/block]