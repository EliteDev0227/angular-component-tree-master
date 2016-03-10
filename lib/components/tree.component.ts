import { Component, Input } from 'angular2/core';
import { TreeNodeComponent } from './tree-node.component';
import { TreeModel, TreeNode, ITreeOptions } from '../models/tree.model';
const _ = require('lodash');
const DEFAULT_OPTIONS = {
  childrenAttr: 'children',
  nameAttr: 'name'
}

@Component({
  selector: 'Tree',
  directives: [TreeNodeComponent],
  styles: [
    '.tree-children { padding-left: 20px }'
  ],
  template: `
    <TreeNode
      *ngFor="#node of nodes"
      [node]="node"
      [options]="options">
    </TreeNode>
  `
})
export class TreeComponent {
  private _tree:TreeModel;
  @Input()
  set nodes(nodes:any[]) { this._tree = new TreeModel(nodes) }
  get nodes() { return this._tree.roots }

  private _options: ITreeOptions = DEFAULT_OPTIONS;
  @Input()
  set options(options:ITreeOptions) {
    this._options = _.defaultsDeep(options, DEFAULT_OPTIONS);
  }
  get options() { return this._options }
}
