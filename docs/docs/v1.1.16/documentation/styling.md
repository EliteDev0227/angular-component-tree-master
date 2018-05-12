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
* .toggle-children-wrapper
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
  "title": "Example styles"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Pull right"
}
[/block]
This theme allows placing items in the right side of the tree nodes using `pull-right` class.
It is based on flexbox, so relevant only to browsers who support it
[block:code]
{
  "codes": [
    {
      "code": ".tree {\n  width: 500px;\n}\n\n.tree-node {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n}\n\n.node-content-wrapper {\n  flex-grow: 1;\n  position: relative;\n}\n\n.tree-children {\n  flex-grow: 1;\n  width: 100%;\n}\n\n.pull-right {\n  position: absolute;\n  right: 10px;\n}\n",
      "language": "css"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Send me your theme"
}
[/block]
If you've created a nice style for the tree, I will appreciate if you send me and I will showcase it here.
adam@500tech.com