import { Component, Input, TemplateRef, ElementRef, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { deprecatedSelector } from '../deprecated-selector';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'LoadingComponent, tree-loading-component',
  template: `
    <span *ngIf="!template">loading...</span>
    <ng-container
      [ngTemplateOutlet]="template"
      [ngOutletContext]="{ $implicit: node }">
    </ng-container>
  `,
})
export class LoadingComponent {
  @Input() template: TemplateRef<any>;
  @Input() node: TreeNode;

  constructor(private elementRef: ElementRef) {
    deprecatedSelector('LoadingComponent', 'tree-loading-component', elementRef);
  }
}
