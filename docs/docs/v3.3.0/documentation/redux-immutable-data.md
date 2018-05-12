---
title: "Redux / Immutable Data"
excerpt: ""
---
[block:api-header]
{
  "title": "Use ID"
}
[/block]

Working with the tree using immutable data is completely possible.

The only thing the tree will try to change in your data is add an `id` property in case it doesn't exist.

So make sure to either:
1. Provide a unique `id` property on each node
2. If you have a different property that represents the id, then set the `idField` in the options
[block:api-header]
{
  "title": "Override drop action"
}
[/block]
If you are using drag and drop, then the default behaviour is to call `moveNode`, which tries to alter the `children` array.
If you wish to implement drag and drop, you must override the action and supply your custom behaviour:
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
The model rebuilds the internal `TreeNode`s for the entire tree whenever the data changes.
This might be costly if you have a huge amount of nodes that change all the time.