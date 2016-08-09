import { TreeNode } from './tree-node.model';
import { TreeModel } from './tree.model';
import { KEYS } from '../constants/keys';
import { deprecated } from './deprecated';

import * as _ from 'lodash';

export interface IActionHandler {
  (tree:TreeModel, node:TreeNode, $event:any);
}

export const TREE_ACTIONS = {
  TOGGLE_SELECTED: (tree:TreeModel, node:TreeNode, $event:any) => node.toggleActivated(),
  TOGGLE_SELECTED_MULTI: (tree:TreeModel, node:TreeNode, $event:any) => node.toggleActivated(true),
  SELECT: (tree:TreeModel, node:TreeNode, $event:any) => node.setIsActive(true),
  DESELECT: (tree:TreeModel, node:TreeNode, $event:any) => node.setIsActive(false),
  FOCUS: (tree:TreeModel, node:TreeNode, $event:any) => node.focus(),
  TOGGLE_EXPANDED: (tree:TreeModel, node:TreeNode, $event:any) => node.toggleExpanded(),
  EXPAND: (tree:TreeModel, node:TreeNode, $event:any) => node.expand(),
  COLLAPSE: (tree:TreeModel, node:TreeNode, $event:any) => node.collapse(),
  DRILL_DOWN: (tree:TreeModel, node:TreeNode, $event:any) => tree.focusDrillDown(),
  DRILL_UP: (tree:TreeModel, node:TreeNode, $event:any) => tree.focusDrillUp(),
  NEXT_NODE: (tree:TreeModel, node:TreeNode, $event:any) =>  tree.focusNextNode(),
  PREVIOUS_NODE: (tree:TreeModel, node:TreeNode, $event:any) =>  tree.focusPreviousNode(),
}

const defaultActionMapping:IActionMapping = {
  mouse: {    
    click: TREE_ACTIONS.TOGGLE_SELECTED,
    dblClick: null,
    contextMenu: null,
    expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
    shift: {},
    ctrl: {},
    alt: {}
  },
  keys: {
    [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
    [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
    [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
    [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
    [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_SELECTED,
    [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_SELECTED
  }
};

export interface IActionMapping {
  mouse?: {
    click?: IActionHandler,
    dblClick?: IActionHandler,
    contextMenu?: IActionHandler,
    expanderClick?: IActionHandler,
    shift?: {
      click?: IActionHandler,
      dblClick?: IActionHandler,
      contextMenu?: IActionHandler,
      expanderClick?: IActionHandler,
    },
    ctrl?: {
      click?: IActionHandler,
      dblClick?: IActionHandler,
      contextMenu?: IActionHandler,
      expanderClick?: IActionHandler,
    }
    alt?: {
      click?: IActionHandler,
      dblClick?: IActionHandler,
      contextMenu?: IActionHandler,
      expanderClick?: IActionHandler,
    }
  },
  keys?: {
    [key:number]: IActionHandler
  }
}

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
  childrenField: string;
  displayField: string;
  idField: string;
  isExpandedField:string;
  treeNodeTemplate: any;
  loadingComponent: any;
  getChildren: any = null;
  hasCustomContextMenu: boolean;
  context: any;
  actionMapping: any;

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

    if (options.hasCustomContextMenu) {
      deprecated('hasCustomContextMenu', 'actionMapping: mouse: contextMenu');
    }
  }
}
