---
title: "Expanding nodes on init"
excerpt: ""
---
A common use case is to start with the tree expanded completely.
You can achieve this by calling treeModel.expandAll() after view init:
[block:code]
{
  "codes": [
    {
      "code": "<tree-root #tree [nodes]=\"nodes\"></tree-root>\n\n@Component {\n  nodes = [...];\n  @ViewChild('tree') tree;\n\n  ngAfterViewInit() {\n    this.tree.treeModel.expandAll();\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]
Or to expand / activate specific nodes:
[block:code]
{
  "codes": [
    {
      "code": "<tree-root #tree [nodes]=\"nodes\"></tree-root>\n\n@Component {\n  nodes = [...];\n  @ViewChild('tree') tree;\n\n  ngAfterViewInit() {\n    const someNode = this.tree.treeModel.getNodeById('someId');\n    someNode.expand();\n           \n    const firstRoot = this.tree.treeModel.roots[0];\n    firstRoot.setActiveAndVisible();\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]