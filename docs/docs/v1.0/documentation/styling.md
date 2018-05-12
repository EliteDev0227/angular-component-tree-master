---
title: "Styling"
excerpt: ""
---
The tree comes with very basic style.
The following classes are available for customization:

* .tree
* .tree-node
* .tree-node-expanded
* .tree-node-focused
* .tree-node-active
* .tree-node-leaf
* .toggle-children
* .toggle-children-placeholder
* .node-content-wrapper
* .tree-children
* .tree-node-level-X

Here is the result HTML of the tree:
[block:code]
{
  "codes": [
    {
      "code": "<tree>\n  <div class=\"tree\">\n    <treenode>\n      <div class=\"tree-node tree-node-expanded tree-node-focused tree-node-active tree-node-level-1\">\n        <span class=\"toggle-children\">\n        </span>\n\n        <div class=\"node-content-wrapper\">\n          <treenodetemplate>root1</treenodetemplate>\n        </div>\n        <div class=\"tree-children\">\n          <treenode>\n            <div class=\"tree-node tree-node-leaf tree-node-level-2\">\n              <span class=\"toggle-children-placeholder\">\n              </span>\n              <div class=\"node-content-wrapper\">\n                <treenodetemplate>child1</treenodetemplate>\n              </div>\n              <div class=\"tree-children\" hidden=\"\">\n              </div>\n            </div>\n          </treenode>\n        </div>\n      </div>\n    </treenode>\n  </div>\n</tree>\n",
      "language": "html"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Example theme"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "TBD",
      "language": "css"
    }
  ]
}
[/block]