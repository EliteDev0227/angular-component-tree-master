import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeNodeDrag } from '../models/tree-node-drag.model';

@Component({
  selector: 'TreeNodeDropSlot',
  encapsulation: ViewEncapsulation.None,
  styles: [
    '.node-drop-slot { display: block; height: 2px; width: 100%}',
    '.node-drop-slot.is-dragging-over { background: #ddffee; height: 20px; border: 2px dotted #888; }'
  ],
  template: `
    <div
      class="node-drop-slot"
      [class.is-dragging-over]="treeNodeDrag.isDraggingOver(this)"
      (drop)="onDrop($event)"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave()"
      >
    </div>
  `
})
export class TreeNodeDropSlot {
  @Input() node: TreeNode;
  @Input() dropIndex: number;

  constructor(private treeNodeDrag: TreeNodeDrag) {
  }

  onDragOver($event) {
    $event.preventDefault();
    this.treeNodeDrag.setDropLocation({ component: this, node: this.node, index: this.dropIndex });
  }

  onDragLeave() {
    if (this.treeNodeDrag.isDraggingOver(this)) {
      this.treeNodeDrag.setDropLocation(null);
    }
  }

  onDrop($event) {
    $event.preventDefault();
    this.node.mouseAction('drop', $event, {
      from: this.treeNodeDrag.getDragNode(),
      to: { node: this.node, index: this.dropIndex }
    });
    this.treeNodeDrag.setDropLocation(null);
  }
}
