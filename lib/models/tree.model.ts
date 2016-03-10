export interface ITreeOptions {
  childrenField?: string
  nameField?: string
  treeNodeTemplate: any
}

export class TreeModel {
  roots: TreeNode[];
  constructor(nodes) {
    Object.assign(this, {
      roots: nodes.map(n => new TreeNode(n))
    });
  }
}

export class TreeNode {
  name: string;
  children: TreeNode[] = [];
  expanded: boolean = false;
  parent: TreeNode;

  constructor(data, parent:TreeNode = null) {
    Object.assign(this, data, { parent });
    this.children = this.children.map(c => new TreeNode(c, this));
  }

  get collapsed() { return !this.expanded }
  get isRoot() { return !this.parent }

  get isLeaf() { return !this.children.length }
  get hasChildren() { return !this.isLeaf }

  toggle() {
    this.expanded = !this.expanded;
  }
}
