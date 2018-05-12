---
title: "Redux / Immutable Data"
excerpt: ""
---
[block:api-header]
{
  "title": "Use ID"
}
[/block]

Working with the tree using immutable data is possible.

Make sure that:
1. You provide a unique `id` property on each node
2. If you have a different key property, then set the `idField` in the options
3. You override drop action as stated below
[block:api-header]
{
  "title": "Override drop action"
}
[/block]
Drag and drop by default mutates the children.
If working with immutable data, you must override the action and supply your custom behaviour:
```
options = {
  actionMapping: {
    mouse: {
      drop: (tree: TreeModel, node: TreeNode, $event: any, {from , to}: {from: any, to: any}) => {
        // custom action. parameters: from = node, to = {parent, index}
      }
    }
  }
}
```
[block:api-header]
{
  "title": "Rebuilding the tree"
}
[/block]
Every time the nodes array changes, the entire tree model is rebuilt.
This might be costly if you have a huge amount of nodes that change very frequently.