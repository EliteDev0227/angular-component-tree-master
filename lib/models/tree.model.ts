import { Injectable, Component, Input, EventEmitter } from 'angular2/core';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-defs.model';
import { TREE_EVENTS } from '../constants/events';

const _ = require('lodash');

@Injectable()
export class TreeModel {
  roots: TreeNode[];
  options: TreeOptions;
  activeNode: TreeNode = null;
  focusedNode: TreeNode = null;
  static focusedTree = null;
  events: {
    onToggle: EventEmitter<{eventName:string, node:TreeNode, isExpanded: boolean}>
  }

  eventNames = Object.keys(TREE_EVENTS);

  setData({ nodes, options, events }) {
    this.options = new TreeOptions(options);

    const virtualRoot = new TreeNode({ isVirtualRoot : true }, null, this);

    this.roots = nodes.map(n => new TreeNode(n, virtualRoot, this));

    virtualRoot[this.options.childrenField] = this.roots;

    this.treeNodeContentComponent = this._getTreeNodeContentComponent();
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

  // if treeNodeTemplate is a component - use it,
  // otherwise - it's a template, so wrap it with an AdHoc component
  treeNodeContentComponent:any;
  _getTreeNodeContentComponent() {
    let treeNodeContentComponent = this.options.treeNodeTemplate;
    if (typeof treeNodeContentComponent === 'string') {
      return this._createAdHocComponent(treeNodeContentComponent);
    }
    return treeNodeContentComponent;
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
