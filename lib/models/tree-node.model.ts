import { TreeModel } from './tree.model';

export class TreeNode {
  name: string;
  children: TreeNode[] = [];
  isExpanded: boolean = false;
  parent: TreeNode;
  treeModel: TreeModel;
  _originalNode: any;

  constructor(data, parent:TreeNode = null, treeModel:TreeModel) {
    Object.assign(this, data, { parent, treeModel });
    this._originalNode = data;
    this.childrenField = this.childrenField
      .map(c => new TreeNode(c, this, treeModel));
  }

  // helper get functions:
  get isCollapsed() { return !this.isExpanded }
  get isRoot() { return !this.parent }

  get isLeaf() { return !this.children.length }
  get hasChildren() { return !this.isLeaf }

  // proxy to treeModel:
  get options() { return this.treeModel.options }
  fireEvent(event) { this.treeModel.fireEvent(event) }

  // field accessors:
  get displayField() {
    return this[this.options.displayField];
  }
  get childrenField() {
    return this[this.options.childrenField]; 
  }
  set childrenField(value) {
    this[this.options.childrenField] = value;
  }

  // helper methods:
  toggle() {
    this.isExpanded = !this.isExpanded;
    this.fireEvent({ eventName: 'onToggle', node: this, isExpanded: this.isExpanded });
  }
}
