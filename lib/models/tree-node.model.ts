import { ElementRef } from '@angular/core';
import { TreeModel } from './tree.model';
import { TreeOptions } from './tree-options.model';
import { ITreeNode } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';
import { deprecated } from '../deprecated';

import * as _ from 'lodash';

export class TreeNode implements ITreeNode {
  get isHidden() { return this.getField('isHidden') };
  set isHidden(value) { this.setField('isHidden', value) };
  get isExpanded() { return this.treeModel.isExpanded(this) };
  get isActive() { return this.treeModel.isActive(this) };
  get isFocused() { return this.treeModel.isNodeFocused(this) };

  level: number;
  path: string[];
  elementRef:ElementRef;
  children: TreeNode[];

  private _originalNode: any;
  get originalNode() { return this._originalNode };

  constructor(public data:any, public parent:TreeNode, public treeModel:TreeModel) {
    this.id = this.id || uuid(); // Make sure there's a unique ID
    this.level = this.parent ? this.parent.level + 1 : 0;
    this.path = this.parent ? [...this.parent.path, this.id] : [];
    
    if (this.getField('children')) {
      this._initChildren();
    }
  }

  // helper get functions:
  get hasChildren():boolean {
    return !!(this.data.hasChildren || (this.children && this.children.length > 0));
  }
  get isCollapsed():boolean { return !this.isExpanded }
  get isLeaf():boolean { return !this.hasChildren }
  get isRoot():boolean { return this.parent.data.virtual }
  get realParent():TreeNode { return this.isRoot ? null : this.parent }

  // proxy functions:
  get options(): TreeOptions { return this.treeModel.options }
  fireEvent(event) { this.treeModel.fireEvent(event) }
  get context():any { return this.options.context }

  // field accessors:
  get displayField() {
    return this.getField('display');
  }

  get id() {
    return this.getField('id');
  }

  set id(value) {
    this.setField('id', value);
  }

  getField(key) {
    return this.data[this.options[`${key}Field`]];
  }

  setField(key, value) {
    this.data[this.options[`${key}Field`]] = value;
  }

  // traversing:
  _findAdjacentSibling(steps) {
    let index = this._getIndexInParent();
    return this._getParentsChildren()[index + steps];
  }

  findNextSibling() {
    return this._findAdjacentSibling(+1);
  }

  findPreviousSibling() {
    return this._findAdjacentSibling(-1);
  }

  getFirstChild() {
    return _.first(this.children || []);
  }

  getLastChild() {
    return _.last(this.children || []);
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
    return previousSibling._getLastOpenDescendant()
  }

  _getLastOpenDescendant() {
    const lastChild = this.getLastChild();
    return (this.isCollapsed || !lastChild)
      ? this
      : lastChild._getLastOpenDescendant();
  }

  private _getParentsChildren():any[] {
    const children = _.get(this, 'parent.children');

    return <any[]>children || [];
  }

  private _getIndexInParent() {
    return this._getParentsChildren().indexOf(this);
  }

  // helper methods:
  loadChildren() {
    if (!this.options.getChildren) {
      throw new Error('Node doesn\'t have children, or a getChildren method');
    }
    Promise.resolve(this.options.getChildren(this))
      .then((children) => {
        if (children) {
          this.setField('children', children);
          this._initChildren();
        }
      });
  }

  expand() {
    if (!this.isExpanded) {    
      this.toggleExpanded();
    }
  }

  collapse() {
    if (this.isExpanded) {    
      this.toggleExpanded();
    }
  }

  toggle() {
    deprecated('toggle', 'toggleExpanded');
    this.toggleExpanded();
  }

  toggleExpanded() {
    this.setIsExpanded(!this.isExpanded);
    this.fireEvent({ eventName: TREE_EVENTS.onToggle, warning: 'this event is deprecated, please use onToggleExpanded instead', node: this, isExpanded: this.isExpanded });
    this.fireEvent({ eventName: TREE_EVENTS.onToggleExpanded, node: this, isExpanded: this.isExpanded });
  }

  setIsExpanded(value) {
    this.treeModel.setExpandedNode(this, value);

    if (!this.children && this.hasChildren && value) {
      this.loadChildren();
    }
  };

  setIsActive(value, multi = false) {
    this.treeModel.setActiveNode(this, value, multi);
    if (value) {
      this.fireEvent({ eventName: TREE_EVENTS.onActivate, node: this });
      this.focus();
    }
    else {
      this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node: this });    
    }
  }

  toggleActivated(multi = false) {
    this.setIsActive(!this.isActive, multi);
    this.fireEvent({ eventName: TREE_EVENTS.onActiveChanged, node: this, isActive: this.isActive });
  }

  scrollIntoView() {
    const nativeElement = this.elementRef.nativeElement;
    nativeElement.scrollIntoViewIfNeeded && nativeElement.scrollIntoViewIfNeeded();
  }

  focus() {
    let previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(this);
    this.scrollIntoView();
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: previousNode });
    }
    this.fireEvent({ eventName: TREE_EVENTS.onFocus, node: this });
  }

  blur() {
    let previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(null);
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: this });
    }
  }

  filter(filterFn) {
    let isVisible = filterFn(this);

    if (this.children) {
      this.children.forEach((child) => {
        child.filter(filterFn);
        isVisible = isVisible || !child.isHidden;
      });
    }

    this.isHidden = !isVisible;
  }

  mouseAction(actionName:string, $event) {
    let extra = null;
    this.treeModel.setFocus(true);

    const actionMapping = this.options.actionMapping.mouse;

    const action = actionMapping[actionName];

    if (action) {
      action(this.treeModel, this, $event, extra);

      // TODO: remove after deprecation of context menu and dbl click
      if (actionName === 'contextMenu') {
        this.fireEvent({ eventName: TREE_EVENTS.onContextMenu, node: this, rawEvent: $event });
      }
      if (actionName === 'dblClick') {
        this.fireEvent({ eventName: TREE_EVENTS.onDoubleClick, warning: 'This event is deprecated, please use actionMapping to handle double clicks', node: this, rawEvent: $event });
      }
    }
  }

  _initChildren() {
    this.children = this.getField('children')
      .map(c => new TreeNode(c, this, this.treeModel));
  }
}

function uuid() {
  return Math.floor(Math.random() * 10000000000000);
}
