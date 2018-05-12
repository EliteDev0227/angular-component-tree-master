---
title: "Tri-State Checkboxes"
excerpt: ""
---
Tri-State checkboxes are not supported as a built-in feature - they can be implemented using custom templates.

Credit to **Debajyoti Maity** for building this and sharing with the community

Here is sample code that introduces Tri-State Checkboxes:
[block:code]
{
  "codes": [
    {
      "code": "<tree-root\n  #tree\n  [nodes]=\"nodes\"\n  [options]=\"treeOptions\"\n  (onActivate)=\"selectNode($event)\">\n\n  <template #treeNodeTemplate let-node=\"node\" let-index=\"index\" >\n    <input\n      (change)=\"check( node, $event)\"\n      type=\"checkbox\"\n      [indeterminate]=\"node.data.indeterminate\"\n      [checked]=\"node.data.checked\">\n\n      {{ node.data.name }}\n  </template>\n</tree-root>\n",
      "language": "html"
    }
  ]
}
[/block]
Component:
[block:code]
{
  "codes": [
    {
      "code": "public check(node, $event) {\n  this.updateChildNodesCheckBox(node, $event.target.checked);\n  this.updateParentNodesCheckBox(node.parent);\n}\npublic updateChildNodesCheckBox(node, checked) {\n  node.data.checked = checked;\n  if (node.children) {\n    node.children.forEach((child) => this.updateChildNodesCheckBox(child, checked));\n  }\n}\npublic updateParentNodesCheckBox(node) {\n  if (node && node.level > 0 && node.children) {\n    let allChildChecked = true;\n    let noChildChecked = true;\n\n    for (let child of node.children) {\n      if (!child.data.checked) {\n        allChildChecked = false;\n      } else if (child.data.checked) {\n        noChildChecked = false;\n      }\n    }\n\n    if (allChildChecked) {\n      node.data.checked = true;\n      node.data.indeterminate = false;\n    } else if (noChildChecked) {\n      node.data.checked = false;\n      node.data.indeterminate = false;\n    } else {\n      node.data.checked = true;\n      node.data.indeterminate = true;\n    }\n    this.updateParentNodesCheckBox(node.parent);\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]