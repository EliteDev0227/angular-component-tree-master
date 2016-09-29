import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

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
      [class.is-dragging-over]="node.treeModel.isDraggingOver(this)"
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

  onDragOver($event) {
    $event.preventDefault();
    this.node.treeModel.setDropLocation({ component: this, node: this.node, index: this.dropIndex });
  }

  onDragLeave() {
    if (this.node.treeModel.isDraggingOver(this)) {
      this.node.treeModel.setDropLocation(null);
    }
  }

  onDrop($event) {
    $event.preventDefault();
    this.node.mouseAction('drop', $event, { node: this.node, index: this.dropIndex });
  }
}
