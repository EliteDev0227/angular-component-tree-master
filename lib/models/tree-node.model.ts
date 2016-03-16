import { TreeModel } from './tree.model';
import { TREE_EVENTS } from './tree-defs.model';

const _ = require('lodash');

export class TreeNode {
  name: string;
  children: TreeNode[] = [];
  isExpanded: boolean = false;
  isActive: boolean = false;
  isVirtualRoot: boolean = false;
  get isFocused() { return this.treeModel.focusedNode == this };
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
  get isLeaf() { return !this.children.length }
  get hasChildren() { return !this.isLeaf }
  get isRoot() { return this.parent.isVirtualRoot }
  get realParent() { return this.isRoot ? null : this.parent }

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

  // traversing:
  findAdjacentSibling(steps) {
    let index = this._getIndexInParent();
    return this.parent && this.parent.childrenField[index + steps];
  }

  findNextSibling() {
    return this.findAdjacentSibling(+1);
  }

  findPreviousSibling() {
    return this.findAdjacentSibling(-1);
  }

  getFirstChild() {
    return this.childrenField && _.first(this.childrenField);
  }
  getLastChild() {
    return this.childrenField && _.last(this.childrenField);
  }

  findNextNode(goInside = true) {
    return goInside && this.isExpanded && this.getFirstChild() ||
           this.findNextSibling() ||
           this.parent && this.parent.findNextNode(false);
  }

  findPreviousNode() {
    let previousSibling = this.findPreviousSibling();
    if (!previousSibling) {
      return this.realParent
    }
    return previousSibling.isCollapsed
      ? previousSibling
      : previousSibling.getLastChild();
  }

  private _getIndexInParent() {
    return this.parent && this.parent.childrenField.indexOf(this);
  }

  // helper methods:
  toggle() {
    this.isExpanded = !this.isExpanded;
    this.fireEvent({ eventName: TREE_EVENTS.onToggle, node: this, isExpanded: this.isExpanded });
  }

  private _activate() {
    this.isActive = true;
    this.fireEvent({ eventName: TREE_EVENTS.onActivate, node: this });
    this.focus();
  }

  private _deactivate() {
    this.isActive = false;
    this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node: this });
  }

  toggleActivated() {
    if (this.isActive) {
      this._deactivate();
      this.treeModel.activeNode = null;
    }
    else {
      if (this.treeModel.activeNode) {
        this.treeModel.activeNode._deactivate();
      }
      this._activate();
      this.treeModel.activeNode = this;
    }
    this.fireEvent({ eventName: TREE_EVENTS.onActiveChanged, node: this, isActive: this.isActive });
  }

  focus() {
    let previousNode = this.treeModel.focusedNode;
    this.treeModel.focusedNode = this;
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: this.treeModel.focusedNode });
    }
    this.fireEvent({ eventName: TREE_EVENTS.onFocus, node: this });
  }
}
