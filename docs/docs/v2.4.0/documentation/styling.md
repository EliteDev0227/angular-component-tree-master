---
title: "Styling"
excerpt: ""
---
The tree comes with very basic style.
The following classes are available for customization:

* .tree
* .tree-node
* .tree-node-wrapper
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
      "code": "<tree>\n  <div class=\"tree\">\n    <treenode>\n      <div class=\"tree-node tree-node-expanded tree-node-focused tree-node-active tree-node-level-1\">\n        <div class=\"node-wrapper\">\n          <span class=\"toggle-children-wrapper\">\n\t          <span class=\"toggle-children\">\n  \t        </span>\n          </span>\n\n          <div class=\"node-content-wrapper\">\n            <treenodetemplate>root1</treenodetemplate>\n          </div>\n        <div class=\"tree-children\">\n          <treenode>\n            <div class=\"tree-node tree-node-leaf tree-node-level-2\">\n              <div class=\"node-wrapper\">\n                <span class=\"toggle-children-placeholder\">\n                </span>\n                <div class=\"node-content-wrapper\">\n                  <treenodetemplate>child1</treenodetemplate>\n                </div>\n              </div>\n              <div class=\"tree-children\" hidden=\"\">\n              </div>\n            </div>\n          </treenode>\n        </div>\n      </div>\n    </treenode>\n  </div>\n</tree>\n",
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
  "title": "Branch lines"
}
[/block]
This theme puts explorer like branch lines that connect the parents with their children
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f50955b-Screen_Shot_2016-11-29_at_12.11.52_PM.png",
        "Screen Shot 2016-11-29 at 12.11.52 PM.png",
        366,
        390,
        "#111111"
      ]
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": ".node-content-wrapper, .tree-children {\n  position: relative;\n}\n\n.node-content-wrapper::before, .tree-children::after {\n  content: \"\";\n  position: absolute;\n}\n\n.node-content-wrapper::before {\n  border-bottom: 1px solid lightgrey;\n  border-left: 1px solid lightgrey;\n  height: 28px;\n  top: -17px;\n  width: 20px;\n  left: -28px;\n}\n\n.tree-node-leaf > .node-wrapper > .node-content-wrapper::before {\n  width: 25px;\n}\n\n.tree-children::after {\n  border-left: 1px solid lightgrey;\n  height: 100%;\n  top: -15px;\n  left: -15px;\n}\n\ntreenode:last-child > .tree-node > .tree-children::after {\n  border-left: none;\n}\n\n.toggle-children {\n  z-index: 1;\n}",
      "language": "css"
    }
  ]
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
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/28d7625-Screen_Shot_2016-11-29_at_12.11.01_PM.png",
        "Screen Shot 2016-11-29 at 12.11.01 PM.png",
        710,
        414,
        "#181818"
      ]
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": ".tree {\n  width: 300px;\n}\n\n.node-content-wrapper {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n}\n\n.node-content-wrapper {\n  flex-grow: 1;\n  position: relative;\n}\n\n.pull-right {\n  position: absolute;\n  right: 10px;\n}",
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