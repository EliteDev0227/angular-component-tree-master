import { Component, Input, TemplateRef } from '@angular/core';
import { deprecatedSelector } from '../deprecated-selector';

@Component({
  selector: 'LoadingComponent, loading-component',
  template: `<span *ngIf="!template">loading...</span>
  <template [ngTemplateOutlet]="template"></template>`,
})
export class LoadingComponent {
  @Input() template: TemplateRef<any>;

  constructor() {
    deprecatedSelector('LoadingComponent', 'loading-component');
  }
}
