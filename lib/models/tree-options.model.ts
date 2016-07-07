import { TreeNode } from './tree-node.model';

import * as _ from 'lodash';

export interface ITreeOptions {
  childrenField: string;
  displayField: string;
  idField: string;
  isExpandedField:string;
  treeNodeTemplate: any;
  loadingComponent: any;
  getChildren(node:TreeNode): any;
  hasCustomContextMenu: boolean;
}

export class TreeOptions {
  childrenField:string = 'children';
  displayField:string = 'name';
  idField:string = 'id';
  isExpandedField:string = 'isExpanded';
  treeNodeTemplate: any = '{{ node.displayField }}';
  loadingComponent: any = 'loading...';
  getChildren = null;
  hasCustomContextMenu = false;

  constructor(options = {}) {
    _.extend(this, options);
  }
}
