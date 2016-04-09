/**
 * Welcome to ng2tree
 */

import { EventEmitter, ElementRef } from 'angular2/core';

/**
 * This is the interface for a TreeNode custom template Component
 */
export interface ITreeNodeTemplateComponent {
  node: ITreeNode;
}

/**
 * This is the interface for the options passed along to the tree component
 */
export interface ITreeOptions {
  childrenField:string;
  displayField:string;
  treeNodeTemplate:any;
}

/**
 * This is the interface of the tree component, with all inputs, outputs, and API
 * example usage:  
 * ```html
 * <Tree #tree [nodes]="nodes"></Tree>
 * ```  
 * ```
 * nodes = [
 *   {
 *       name: 'root1',
 *       children: [
 *           {
 *               name: 'child1',
 *           }, {
 *               name: 'child2',
 *           }
 *       ]
 *   }
 * ]
 * ```
 */
export interface ITreeComponent {
  // inputs
  nodes: any[];
  options: ITreeOptions;
  focused: boolean;

  // outputs
  onToggle: EventEmitter<{ eventName: string, node: ITreeNode, isExpanded: boolean }>;
  onActiveChanged: EventEmitter<{ eventName: string, node: ITreeNode, isActive: boolean }>;
  onActivate: EventEmitter<{ eventName: string, node: ITreeNode }>;
  onDeactivate: EventEmitter<{ eventName: string, node: ITreeNode }>;
  onFocus: EventEmitter<{ eventName: string, node: ITreeNode }>;
  onBlur: EventEmitter<{ eventName: string, node: ITreeNode }>;

  // API
  treeModel: ITreeModel
}

/**
 * This is the interface of a single Tree Node
 */
export interface ITreeNode {
  // properties
  parent: ITreeNode;
  displayField: string;
  childrenField: ITreeNode[];
  originalNode: any;
  elementRef: ElementRef;
  level: number;
  // helpers
  isExpanded: boolean;
  isActive: boolean;
  isFocused:boolean;
  isCollapsed:boolean;
  isLeaf:boolean;
  hasChildren:boolean;
  isRoot:boolean;

  // traversing
  findNextSibling(): ITreeNode;
  findPreviousSibling(): ITreeNode;
  getFirstChild(): ITreeNode;
  getLastChild(): ITreeNode;
  findNextNode(goInside:boolean): ITreeNode;
  findPreviousNode(): ITreeNode;

  // actions
  toggle();
  toggleActivated();
  focus();
  blur();
  fireEvent(event: any);
}

/**
 * This is the interface of the TreeModel
 */
export interface ITreeModel {
  // properties
  roots: ITreeNode[];
  activeNode: ITreeNode;
  focusedNode: ITreeNode;
  options: ITreeOptions;
  isFocused: boolean;

  // helpers
  /**
   * @returns      first root of the tree
   */
  getFirstRoot(): ITreeNode;
  getLastRoot(): ITreeNode;

  // actions
  /**
   * @param value  true or false - whether to set focus or blur.
   */
  setFocus(value: boolean);
  focusNextNode();
  focusPreviousNode();
  focusDrillDown();
  focusDrillUp();
}
