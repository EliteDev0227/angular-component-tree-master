import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { deprecatedSelector } from '../deprecated-selector';

@Component({
  selector: 'TreeNodeChildren, tree-node-children',
  encapsulation: ViewEncapsulation.None,
  styles: [
    '.tree-children.tree-children-no-padding { padding-left: 0 }',
    '.tree-children { padding-left: 20px }'
  ],
  template: `
    <div [class.tree-children]="true"
         [class.tree-children-no-padding]="node.options.levelPadding"
         *ngIf="node.isExpanded">
      <div *ngIf="node.children">
        <tree-node
          *ngFor="let node of node.children; let i = index"
          [node]="node"
          [index]="i"
          [templates]="templates">
        </tree-node>
      </div>
      <loading-component
        [style.padding-left]="node.getNodePadding()"
        class="tree-node-loading"
        *ngIf="!node.children"
        [template]="templates.loadingTemplate"
      ></loading-component>
    </div>
  `
})
export class TreeNodeChildrenComponent {
  @Input() node: TreeNode;
  @Input() templates: any;

  constructor() {
    deprecatedSelector('TreeNodeChildren', 'tree-node-children');
  }
}
