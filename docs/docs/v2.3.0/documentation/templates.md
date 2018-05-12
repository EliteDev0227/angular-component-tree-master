---
title: "Templates"
excerpt: ""
---
You can customize the tree's templates using embedded `template` tags
[block:api-header]
{
  "type": "basic",
  "title": "#treeNodeTemplate"
}
[/block]
Use `#treeNodeTemplate` for the content of the node.
You will have access to a `node` variable, which exposes many useful methods, as well as a `data` attribute with the original node's data.

For example:
[block:code]
{
  "codes": [
    {
      "code": "<Tree [nodes]=\"nodes\">\n  <template #treeNodeTemplate let-node>\n\t  <span>{{ node.data.name }}</span>\n\t  <button (click)=\"go($event)\">Custom Action</button>\n  </template>\n</Tree>",
      "language": "html"
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "#loadingTemplate"
}
[/block]
For asynchronous data loading, use `#loadingTemplate` to customize the message that appears while loading the children.

For example:
[block:code]
{
  "codes": [
    {
      "code": "<Tree [nodes]=\"nodes\">\n  <template #loadingTemplate>Loading, please hold....</template>\n</Tree>",
      "language": "text"
    }
  ]
}
[/block]