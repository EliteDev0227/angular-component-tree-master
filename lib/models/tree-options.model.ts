import { TreeNode } from './tree-node.model';

const _ = require('lodash');

export interface ITreeOptions {
  childrenField: string;
  displayField: string;
  idField: string;
  treeNodeTemplate: any;
  getChildren(node:TreeNode): any;
}

export class TreeOptions implements ITreeOptions {
  childrenField:string = 'children';
  displayField:string = 'name';
  treeNodeTemplate:any = '{{ node.displayField }}';
  idField:string = 'id';
  getChildren = null;
  constructor(options = {}) {
    _.extend(this, options);
  }
}
