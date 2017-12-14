import { ITreeOptions } from 'angular-tree-component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkboxes',
  template: `
    <h3>tri-state checkboxes</h3>
    <tree-root
      [nodes]="nodes"
      [options]="options">
    </tree-root>
    <h3>The tree is using flexbox.<br>
    Switch expander and checkbox with CSS 'order' attribute:</h3>
    <tree-root
      class="reverse"
      [nodes]="nodes"
      [options]="options">
    </tree-root>
  `,
  styles: [
  ]
})
export class CheckboxesComponent {
  nodes = [
    {
      name: 'root1'
    },
    {
      name: 'root2',
      children: [
        { name: 'child1' },
        { name: 'child2', children: [
          { name: 'grandchild1' },
          { name: 'grandchild2' }
        ] }
      ]
    }
  ];

  options: ITreeOptions = {
    useCheckbox: true
  };
}
