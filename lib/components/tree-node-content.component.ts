import { Component, Input, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

export interface ITreeNodeTemplate {
  node: TreeNode;
  context: any;
}

@Component({
  selector: 'TreeNodeContent',
  template: `<span *ngIf="!treeNodeContentTemplate">{{ node.displayField }}</span>
  <template [ngTemplateOutlet]="treeNodeContentTemplate" [ngOutletContext]="{ $implicit: node }"></template>`,
})
export class TreeNodeContent {
  @Input() node: TreeNode;
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
}
