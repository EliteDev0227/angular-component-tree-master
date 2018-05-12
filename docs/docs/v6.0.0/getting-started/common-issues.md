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