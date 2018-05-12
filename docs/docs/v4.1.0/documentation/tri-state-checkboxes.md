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
      "code": "import { ITreeOptions, IActionMapping } from 'angular-tree-component';\nimport { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-checkboxes',\n  template: `\n    <h3>tri-state checkboxes</h3>\n    <tree-root\n      #tree\n      [nodes]=\"nodes\"\n      [options]=\"options\">\n\n      <ng-template #treeNodeTemplate let-node=\"node\" let-index=\"index\" >\n        <input\n          (change)=\"check(node, !node.data.checked)\"\n          type=\"checkbox\"\n          [indeterminate]=\"node.data.indeterminate\"\n          [checked]=\"node.data.checked\">\n\n          {{ node.data.name }}\n      </ng-template>\n    </tree-root>\n  `,\n  styles: []\n})\nexport class CheckboxesComponent {\n  nodes = [\n    {\n      name: 'root1',\n      checked: true,\n    },\n    {\n      name: 'root2',\n      checked: false,\n      children: [\n        { name: 'child1', checked: false },\n        { name: 'child2', checked: false, children: [\n          { name: 'grandchild1', checked: false },\n          { name: 'grandchild2', checked: false }\n        ] }\n      ]\n    }\n  ];\n\n  actionMapping: IActionMapping = {\n    mouse: {\n      click: (tree, node) => this.check(node, !node.data.checked)\n    }\n  };\n\n  options: ITreeOptions = {\n    actionMapping: this.actionMapping\n  };\n\n  public check(node, checked) {\n    this.updateChildNodeCheckbox(node, checked);\n    this.updateParentNodeCheckbox(node.realParent);\n  }\n  public updateChildNodeCheckbox(node, checked) {\n    node.data.checked = checked;\n    if( node.data.indeterminate){\n       node.data.indeterminate = false;\n    }\n    if (node.children) {\n      node.children.forEach((child) => this.updateChildNodeCheckbox(child, checked));\n    }\n  }\n  public updateParentNodeCheckbox(node) {\n    if (!node) {\n      return;\n    }\n\n    let allChildrenChecked = true;\n    let noChildChecked = true;\n\n    for (const child of node.children) {\n      if (!child.data.checked || child.data.indeterminate) {\n        allChildrenChecked = false;\n      }\n      if (child.data.checked) {\n        noChildChecked = false;\n      }\n    }\n\n    if (allChildrenChecked) {\n      node.data.checked = true;\n      node.data.indeterminate = false;\n    } else if (noChildChecked) {\n      node.data.checked = false;\n      node.data.indeterminate = false;\n    } else {\n      node.data.checked = true;\n      node.data.indeterminate = true;\n    }\n    this.updateParentNodeCheckbox(node.parent);\n  }\n}\n",
      "language": "javascript"
    }
  ]
}
[/block]