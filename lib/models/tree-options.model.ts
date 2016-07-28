import { TreeNode } from './tree-node.model';
import { TreeModel } from './tree.model';
import * as _ from 'lodash';

export const TREE_ACTIONS = {
  TOGGLE_SELECTED: (tree:TreeModel, node:TreeNode, $event:any) => node.toggleActivated(),
  SELECT: (tree:TreeModel, node:TreeNode, $event:any) => node.toggleActivated(),
  MULTI_SELECT: (tree:TreeModel, node:TreeNode, $event:any) => node.toggleActivated(true),
  FOCUS: (tree:TreeModel, node:TreeNode, $event:any) => node.focus(),
  TOGGLE: (tree:TreeModel, node:TreeNode, $event:any) => node.toggle(),
  EXPAND: (tree:TreeModel, node:TreeNode, $event:any) => node.expand(),
  COLLAPSE: (tree:TreeModel, node:TreeNode, $event:any) => node.collapse(),
  DRILL_DOWN: (tree:TreeModel, node:TreeNode, $event:any) => tree.focusDrillDown(),
  DRILL_UP: (tree:TreeModel, node:TreeNode, $event:any) => tree.focusDrillUp(),
  NEXT_NODE: (tree:TreeModel, node:TreeNode, $event:any) =>  tree.focusNextNode(),
  PREVIOUS_NODE: (tree:TreeModel, node:TreeNode, $event:any) =>  tree.focusPreviousNode(),
}

export const defaultActionMapping = {
  mouse: {    
    click: TREE_ACTIONS.TOGGLE_SELECTED,
    dblClick: null,
    contextMenu: null,
    expanderClick: TREE_ACTIONS.TOGGLE
  },
  keys: {
    right: TREE_ACTIONS.DRILL_DOWN,
    left: TREE_ACTIONS.DRILL_UP,
    down: TREE_ACTIONS.NEXT_NODE,
    up: TREE_ACTIONS.PREVIOUS_NODE,
    space: TREE_ACTIONS.TOGGLE_SELECTED,
    enter: TREE_ACTIONS.TOGGLE_SELECTED
  }
};

export interface ITreeOptions {
  childrenField: string;
  displayField: string;
  idField: string;
  isExpandedField:string;
  treeNodeTemplate: any;
  loadingComponent: any;
  getChildren(node:TreeNode): any;
  hasCustomContextMenu: boolean;
  context: any;
  actionMapping: any;
}

export class TreeOptions {
  constructor(options:any = {}) {
    const optionsWithDefaults = _.defaultsDeep({}, options, {
      childrenField: 'children',
      displayField: 'name',
      idField: 'id',
      isExpandedField: 'isExpanded',
      treeNodeTemplate: '{{ node.displayField }}',
      loadingComponent: 'loading...',
      getChildren: null,
      hasCustomContextMenu: false,
      context: null,
      actionMapping: defaultActionMapping
    });

    _.extend(this, optionsWithDefaults);
  }
}
