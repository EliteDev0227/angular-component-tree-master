import { Injectable, Component, Input } from 'angular2/core';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-defs.model';

@Injectable()
export class TreeModel {
  roots: TreeNode[];
  options: TreeOptions;

  setData({ nodes, options }) {
    this.options = new TreeOptions(options);
    this.roots = nodes.map(n => new TreeNode(n, null, this));
    this.treeNodeContentComponent = this._getTreeNodeContentComponent();
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
