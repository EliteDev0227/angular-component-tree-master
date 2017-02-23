import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component({
  selector: 'TreeNodeChildren',
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
        <TreeNodeCollection
          [nodes]="node.children"
          [templates]="templates">
        </TreeNodeCollection>
      </div>
      <LoadingComponent
        [style.padding-left]="node.getNodePadding()"
        class="tree-node-loading"
        *ngIf="!node.children"
        [template]="templates.loadingTemplate"
      ></LoadingComponent>
    </div>
  `
})
export class TreeNodeChildrenComponent {
  @Input() node: TreeNode;
  @Input() templates: any;
}
