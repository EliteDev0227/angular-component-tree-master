import { Component, Input, TemplateRef, ElementRef } from '@angular/core';
import { deprecatedSelector } from '../deprecated-selector';

@Component({
  selector: 'LoadingComponent, tree-loading-component',
  template: `<span *ngIf="!template">loading...</span>
  <template [ngTemplateOutlet]="template"></template>`,
})
export class LoadingComponent {
  @Input() template: TemplateRef<any>;

  constructor(private elementRef: ElementRef) {
    deprecatedSelector('LoadingComponent', 'tree-loading-component', elementRef);
  }
}
