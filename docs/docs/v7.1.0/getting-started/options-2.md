---
title: "Options"
excerpt: ""
---
[block:code]
{
  "codes": [
    {
      "code": "    <tree-root [nodes]=\"nodes\" [options]=\"options\"></tree-root>\n",
      "language": "javascript"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "options"
}
[/block]
Object of type `ITreeOptions`.
See [TreeOptions](doc:options) for a complete list, or visit the Guides category for specific use cases.

Example:
[block:code]
{
  "codes": [
    {
      "code": "import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';\n\nclass MyComponent {\n  ...\n\toptions: ITreeOptions = {\n    displayField: 'nodeName',\n    isExpandedField: 'expanded',\n    idField: 'uuid',\n    hasChildrenField: 'nodes',\n    actionMapping: {\n      mouse: {\n        dblClick: (tree, node, $event) => {\n      \t\tif (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);\n    \t\t}\n      },\n      keys: {\n        [KEYS.ENTER]: (tree, node, $event) => {\n          node.expandAll();\n        }\n      }\n    },\n    nodeHeight: 23,\n    allowDrag: (node) => {\n      return true;\n    },\n    allowDrop: (node) => {\n      return true;\n    },\n    useVirtualScroll: true,\n    animateExpand: true,\n    scrollOnActivate: true,\n    animateSpeed: 30,\n    animateAcceleration: 1.2\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]