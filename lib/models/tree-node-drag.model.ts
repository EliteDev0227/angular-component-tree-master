import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node.model';

@Injectable()
export class TreeNodeDrag {
  _dragNode: { node: TreeNode, index: number } = null;
  _dropLocation:{ component:any, node: TreeNode, index: number } = null;
  // TODO: move to a different service:
  setDragNode(dragNode:{ node: TreeNode, index:number }) {
    this._dragNode = dragNode;
  }

  getDragNode():{ node: TreeNode, index:number } {
    return this._dragNode || { node:null, index: null };
  }

  isDragging() {
    return this.getDragNode().node;
  }

  setDropLocation(dropLocation: { component: any, node: TreeNode, index: number }) {
    this._dropLocation = dropLocation;
  }

  getDropLocation(): { component: any, node: TreeNode, index: number } {
    return this._dropLocation || {component: null, node: null, index: null};
  }

  isDraggingOver(component) {
    return this.getDropLocation().component === component;
  }

  endDrag() {
    this.setDropLocation(null);
    this.setDragNode(null);
  }
}
