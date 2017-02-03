import { Component, Input, TemplateRef } from '@angular/core';
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'LoadingComponent',
  template: `<span *ngIf="!template">loading...</span>
  <template [ngTemplateOutlet]="template"></template>`,
})
export class LoadingComponent {
  @Input() template: TemplateRef<any>;
}
