import { TreeNode } from './tree-node.model';
const _ = require('lodash');

export interface ITreeNodeTemplateComponent {
  node: TreeNode;
}

export interface ITreeOptions {
  childrenField:string;
  displayField:string;
  treeNodeTemplate:any;
}

export class TreeOptions implements ITreeOptions {
  childrenField:string = 'children';
  displayField:string = 'name';
  treeNodeTemplate:any = '{{ node.displayField }}';
  constructor(options = {}) {
    _.extend(this, options);
  }
}

export const TREE_EVENTS = {
  onToggle: 'onToggle',
  onActiveChanged: 'onActiveChanged',
  onActivate: 'onActivate',
  onDeactivate: 'onDeactivate',
  onFocus: 'onFocus',
  onBlur: 'onBlur'
}
