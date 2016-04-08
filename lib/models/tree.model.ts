import { Injectable, Component, Input, EventEmitter } from 'angular2/core';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { ITreeModel } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';

const _ = require('lodash');

@Injectable()
export class TreeModel implements ITreeModel {
  roots: TreeNode[];
  options: TreeOptions;
  activeNode: TreeNode = null;
  focusedNode: TreeNode = null;
  static focusedTree = null;
  private events: any;

  eventNames = Object.keys(TREE_EVENTS);

  setData({ nodes, options, events }) {
    this.options = new TreeOptions(options);

    const virtualRoot = new TreeNode({ isVirtualRoot : true }, null, this);

    this.roots = nodes.map(n => new TreeNode(n, virtualRoot, this));

    virtualRoot[this.options.childrenField] = this.roots;

    this._loadTreeNodeContentComponent();
    this.events = events;
  }

  fireEvent(event) {
    this.events[event.eventName].next(event);
  }

  getFirstRoot() {
    return _.first(this.roots);
  }

  getLastRoot() {
    return _.last(this.roots);
  }

  get isFocused() {
    return TreeModel.focusedTree === this;
  }

  setFocus(value) {
    TreeModel.focusedTree = value ? this : null;
  }

  private _treeNodeContentComponent:any;
  get treeNodeContentComponent() { return this._treeNodeContentComponent };

  // if treeNodeTemplate is a component - use it,
  // otherwise - it's a template, so wrap it with an AdHoc component
  _loadTreeNodeContentComponent() {
    this._treeNodeContentComponent = this.options.treeNodeTemplate;
    if (typeof this._treeNodeContentComponent === 'string') {
      this._treeNodeContentComponent = this._createAdHocComponent(this._treeNodeContentComponent);
    }
  }

  _createAdHocComponent(templateStr) {
    @Component({
        selector: 'TreeNodeTemplate',
        template: templateStr
    })
    class AdHocTreeNodeTemplateComponent {
        @Input() node: TreeNode;
    }
    return AdHocTreeNodeTemplateComponent;
  }

  focusNextNode() {
    let previousNode = this.focusedNode;
    let nextNode = previousNode ? previousNode.findNextNode() : this.getFirstRoot();
    nextNode && nextNode.focus();
  }

  focusPreviousNode() {
    let previousNode = this.focusedNode;
    let nextNode = previousNode ? previousNode.findPreviousNode() : this.getLastRoot();
    nextNode && nextNode.focus();
  }

  focusDrillDown() {
    let previousNode = this.focusedNode;
    let nextNode = previousNode && previousNode.getFirstChild();
    nextNode && nextNode.focus();
  }

  focusDrillUp() {
    let previousNode = this.focusedNode;
    let nextNode = previousNode && previousNode.realParent;
    nextNode && nextNode.focus();
  }
}
