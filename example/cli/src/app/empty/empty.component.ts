import { Component } from '@angular/core';

@Component({
  selector: 'app-empty',
  template: `
    <tree-root #tree1 class="tree1" [focused]="true" [nodes]="nodes"></tree-root>
    <tree-root #tree2 class="tree2" [focused]="true" [nodes]="nodes2"></tree-root>
    <button (click)="do(tree1)">do</button>
    <button (click)="do(tree2)">do2</button>
  `,
  styles: []
})
export class EmptyComponent {
  nodes = [];
  nodes2 = null;

  do(tree) {
    console.log(tree.treeModel.getNodeById(10));
  }
}
