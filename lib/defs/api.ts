/**
 * Welcome to ng2tree
 */

import { EventEmitter, ElementRef } from '@angular/core';
import { TreeOptions } from '../models/tree-options.model';
/**
 * This is the interface of a single Tree Node
 */
export interface ITreeNode {
  // properties
  /**
   * Parent node
   */
  parent: ITreeNode;
  /**
   * The value of the node's field that is used for displaying its content.
   * By default 'name', unless stated otherwise in the options
   */
  displayField: string;
  /**
   * The children of the node.
   * By default is determined by 'node.data.children', unless stated otherwise in the options
   */
  children: ITreeNode[];
  /**
   * Pointer to the original data.
   */
  data: any;
  /**
   * Pointer to the ElementRef of the TreeNodeComponent that's displaying this node
   */
  elementRef: ElementRef;
  /**
   * Level in the tree (starts from 1).
   */
  level: number;
  /**
   * Path in the tree: Array of IDs.
   */
  path: string[];

  /**
   * A unique key of this node among its siblings.
   * By default it's the 'id' of the original node, unless stated otherwise in options.idField
   */
  id: any;

  /**
   * The context that was given in the options object.
   */
  context:any;

  // helpers
  isExpanded: boolean;
  isActive: boolean;
  isFocused:boolean;
  isCollapsed:boolean;
  isLeaf:boolean;
  hasChildren:boolean;
  isRoot:boolean;

  // traversing
  /**
   * @returns next sibling (or null)
   */
  findNextSibling(): ITreeNode;
  /**
   * @returns previous sibling (or null)
   */
  findPreviousSibling(): ITreeNode;
  /**
   * @returns first child (or null)
   */
  getFirstChild(): ITreeNode;
  /**
   * @returns last child (or null)
   */
  getLastChild(): ITreeNode;
  /**
   * Finds the visually next node in the tree.
   * @returns next node.
   * @param goInside whether to look for children or just siblings
   */
  findNextNode(goInside: boolean): ITreeNode;
  /**
   * Finds the visually previous node in the tree.
   * @returns previous node.
   */
  findPreviousNode(): ITreeNode;

  // actions
  /**
   * Expands / Collapses the node
   */
  toggleExpanded();
  /**
   * Expands the node
   */
  expand();
  /**
   * Collapses the node
   */
  collapse();
  /**
   * Activates / Deactivates the node (selects / deselects)
   */
  toggleActivated();
  /**
   * Focus on the node
   */
  focus();
  /**
   * Blur (unfocus) the node
   */
  blur();
  /**
   * Scroll the screen to make the node visible
   */
  scrollIntoView();
  /**
   * Fire an event to the renderer of the tree (if it was registered)
   */
  fireEvent(event: any);
}

/**
 * This is the interface of the TreeModel
 */
export interface ITreeModel {
  // properties
  /**
   * All root nodes
   */
  roots: ITreeNode[];
  /**
   * Current active (selected) node
   */
  getActiveNode(): ITreeNode;
  /**
   * Current focused node
   */
  focusedNode: ITreeNode;
  /**
   * Options that were passed to the tree component
   */
  options: TreeOptions;

  /**
   * Is the tree currently focused
   */
  isFocused: boolean;

  // helpers
  /**
   * @returns      first root of the tree
   */
  getFirstRoot(): ITreeNode;
  /**
   * @returns      last root of the tree
   */
  getLastRoot(): ITreeNode;

  // actions
  /**
   * Focuses or blurs the tree
   * @param value  true or false - whether to set focus or blur.
   */
  setFocus(value: boolean);
  /**
   * Focuses on the next node in the tree (same as down arrow)
   */
  focusNextNode();
  /**
   * Focuses on the previous node in the tree (same as up arrow)
   */
  focusPreviousNode();
  /**
   * Focuses on the inner child of the current focused node (same as right arrow on an expanded node)
   */
  focusDrillDown();
  /**
   * Focuses on the parent of the current focused node (same as left arrow on a collapsed node)
   */
  focusDrillUp();
}
