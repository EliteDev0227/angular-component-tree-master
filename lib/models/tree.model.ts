import { Injectable, Component, Input, EventEmitter } from 'angular2/core';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-defs.model';

@Injectable()
export class TreeModel {
  roots: TreeNode[];
  options: TreeOptions;
  events: {
    onToggle: EventEmitter<{eventName:string, node:TreeNode, isExpanded: boolean}>
  }

  eventNames = ['onToggle'];

  setData({ nodes, options, events }) {
    this.options = new TreeOptions(options);
    this.roots = nodes.map(n => new TreeNode(n, null, this));
    this.treeNodeContentComponent = this._getTreeNodeContentComponent();
    this.events = events;
  }

  fireEvent(event) {
    this.events[event.eventName].next(event);
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
}
