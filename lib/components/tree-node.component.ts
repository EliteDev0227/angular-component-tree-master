import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { TreeNode, ITreeOptions } from '../models/tree.model';

@Component({
  selector: 'TreeNode',
  directives: [TreeNodeComponent],
  styles: [
    '.tree-children { padding-left: 50px }'
  ],
  template: `
    <div class="tree-node" [class.expanded]="node.expanded">
      <button *ngIf="node.hasChildren" class="toggle-children" (click)="node.toggle()">*</button>
      <span class="tree-name" >{{ nodeName }}</span>
      <div class="tree-children" [hidden]="node.collapsed">
        <TreeNode
          *ngFor="#node of children"
          [node]="node"
          [options]="options">
        </TreeNode>
      </div>
    </div>
  `
})

export class TreeNodeComponent {
  @Input() node:TreeNode;

  @Input() options: ITreeOptions;
  @Output() onToggle = new EventEmitter();

  private get children() { return this.options && this.node[this.options.childrenAttr] }
  private get nodeName() { return this.options && this.node[this.options.nameAttr] }
}
