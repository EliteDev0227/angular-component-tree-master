---
title: "Custom Fields"
excerpt: ""
---
Node field names are customizable using the following options:
- childrenField
- displayField
- idField
- isExpandedField
- hasChildrenField
[block:api-header]
{
  "title": "Example"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "  nodes = [\n    {\n      _id: '1',\n      title: 'root1',\n      nodes: [{_id: '3', title: 'child1'}]\n    },\n    {\n      _id: '2',\n      title: 'root2'\n    }\n  ];\n\n  options: ITreeOptions = {\n    idField: '_id',\n    displayField: 'title',\n    childrenField: 'nodes'\n  };\n",
      "language": "javascript"
    }
  ]
}
[/block]