import { Component, Input, ViewEncapsulation, TemplateRef, ElementRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { deprecatedSelector } from '../deprecated-selector';

@Component({
  selector: 'TreeNodeContent, tree-node-content',
  encapsulation: ViewEncapsulation.None,
  template: `
  <span *ngIf="!template">{{ node.displayField }}</span>
  <template
    [ngTemplateOutlet]="template"
    [ngOutletContext]="{ $implicit: node, node: node, index: index }">
  </template>`,
})
export class TreeNodeContent {
  @Input() node: TreeNode;
  @Input() index: number;
  @Input() template: TemplateRef<any>;

  constructor(private elementRef: ElementRef) {
    deprecatedSelector('TreeNodeContent', 'tree-node-content', elementRef);
  }
}
