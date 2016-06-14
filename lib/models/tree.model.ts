import { Injectable, Component, Input, EventEmitter } from '@angular/core';
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
    if (options) {
      this.options = new TreeOptions(options);
    }

    let treeNodeConfig = { virtual: true };
    treeNodeConfig[this.options.childrenField] = nodes;
    const virtualRoot = new TreeNode(treeNodeConfig, null, this);

    this.roots = virtualRoot.children;

    this._initTreeNodeContentComponent();
    this._initLoadingComponent();
    this.events = events;
    this.fireEvent({ eventName: TREE_EVENTS.onInitialized });
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

  private _loadingComponent:any;
  get loadingComponent() { return this._loadingComponent };

  // if treeNodeTemplate is a component - use it,
  // otherwise - it's a template, so wrap it with an AdHoc component
  _initTreeNodeContentComponent() {
    this._treeNodeContentComponent = this.options.treeNodeTemplate;
    if (typeof this._treeNodeContentComponent === 'string') {
      this._treeNodeContentComponent = this._createAdHocComponent(this._treeNodeContentComponent);
    }
  }

  // same for loading component
  _initLoadingComponent() {
    this._loadingComponent = this.options.loadingComponent;
    if (typeof this._loadingComponent === 'string') {
      this._loadingComponent = this._createAdHocComponent(this._loadingComponent);
    }
  }

  _createAdHocComponent(templateStr): any {
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
