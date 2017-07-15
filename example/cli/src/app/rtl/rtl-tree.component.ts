import { Component } from '@angular/core';

@Component({
  selector: 'app-basictree',
  template: `
    <tree-root class="rtl" [focused]="true" [nodes]="nodes"></tree-root>
  `,
  styles: []
})
export class RtlTreeComponent {
  nodes = [
    {
      name: 'עץ תיקיות',
      children: [
        { name: 'קובץ 1' },
        { name: 'קובץ 2' }
      ]
    },
    {
      name: 'עוד עץ',
      children: [
        { name: 'עלה', children: [] },
        { name: 'ענף', children: [
          {name: 'בן של ענף'}
        ] }
      ]
    }
  ];
}
