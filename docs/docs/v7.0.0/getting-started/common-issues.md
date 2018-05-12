---
title: "Common Issues"
excerpt: ""
---
[block:api-header]
{
  "title": "Tree not rendered"
}
[/block]
Case: when tree is hidden (for example inside tab or modal), it is not rendered when it becomes visible.
Solution: after it becomes visible (preferably using setTimeout) - call `tree.sizeChanged()`, which recalculates the rendered nodes according to the actual viewport size.
[block:api-header]
{
  "title": "Tree state (expanded / selected nodes) gets lost"
}
[/block]
Maybe you are not supplying unique IDs to the nodes.
The tree maintains its state by using IDs, and if you don't supply ones the tree will generate random ones automatically. Which means that if you update the data - the state will be lost.