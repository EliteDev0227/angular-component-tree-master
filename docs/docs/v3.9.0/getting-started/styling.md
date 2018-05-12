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
* .tree-node-collapsed
* .tree-node-focused
* .tree-node-active
* .tree-node-level-X
* .tree-node-leaf
* .node-wrapper
* .toggle-children-wrapper
* .toggle-children
* .toggle-children-placeholder
* .node-content-wrapper
* .tree-children
* .tree-node-loading
* .node-drop-slot
* .is-dragging-over
* .is-dragging-over-disabled


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
  "title": "ACE Admin theme"
}
[/block]
[ACE Admin theme](http://ace.jeka.by/treeview.html) style.
Credit to Viet Anh Do for sending this theme!
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0bd50e1-treecss.png",
        "treecss.png",
        230,
        462,
        "#efddb3"
      ]
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "div.tree div.tree-children::before,\ndiv.tree::before {\n    content: \"\";\n    position: absolute;\n    border-left: 1px dotted #23527c;\n    height: 100%;\n    top: -14px;\n    left: 12px\n}\n\ndiv.tree {\n    padding-left: 0;\n    margin-left: -5px\n}\n\ndiv.tree div.tree-children {\n    position: relative;\n    padding-left: 0;\n    margin-left: 16px\n}\n\ndiv.tree div.tree-children::before {\n    left: 5px\n}\n\ndiv.tree treenode>div>.node-wrapper {\n    margin-left: 24px\n}\n\ndiv.tree treenode>div>.node-wrapper>.node-content-wrapper {\n    margin-left: 4px\n}\n\ndiv.tree treenode>div.tree-node-leaf>.node-wrapper {\n    margin-left: 0\n}\n\ndiv.tree treenode>div::before {\n    content: \"\";\n    position: absolute;\n    border-bottom: 1px dotted #23527c;\n    width: 7px;\n    margin-top: 12px;\n    left: 7px\n}\n\ndiv.tree treenode>div .toggle-children-wrapper {\n    width: 13px;\n    height: 13px;\n    border: 1px solid #23527c;\n    position: absolute;\n    left: 15px;\n    margin-top: 5px;\n    margin-left: 0;\n    display: inline-block;\n    background-color: #fff;\n    z-index: 1\n}\n\ndiv.tree treenode>div .toggle-children-wrapper::before {\n    content: \"\";\n    display: inline-block;\n    width: 7px;\n    border-top: 1px solid #23527c;\n    position: absolute;\n    top: 5px;\n    left: 2px\n}\n\ndiv.tree treenode>div .toggle-children-wrapper.toggle-children-wrapper-collapsed::after {\n    content: \"\";\n    display: inline-block;\n    height: 7px;\n    border-left: 1px solid #23527c;\n    position: absolute;\n    top: 2px;\n    left: 5px\n}\n\ndiv.tree treenode>div .toggle-children-wrapper .toggle-children {\n    display: none\n}\n\ndiv.tree treenode>div .node-content-wrapper {\n    margin-left: 4px\n}\n\ndiv.tree>treenode>div::before {\n    left: 14px\n}\n\ndiv.tree>treenode>div>.node-wrapper>treenodeexpander>.toggle-children-wrapper {\n    left: 22px\n}",
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
If you've created a nice style for the tree, I will appreciate if you send me and I will showcase it here and give you credit.
You can suggest an edit using the top right link.