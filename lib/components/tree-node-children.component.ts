import { Component, Input, ViewEncapsulation, ElementRef } from '@angular/core';
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
    <div *mobxAutorun>
      <div [class.tree-children]="true"
          [class.tree-children-no-padding]="node.options.levelPadding"
          *ngIf="node.isExpanded">
        <div *ngIf="node.children">
          <tree-node-collection
            [nodes]="node.children"
            [templates]="templates">
          </tree-node-collection>
        </div>
        <tree-loading-component
          [style.padding-left]="node.getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [template]="templates.loadingTemplate"
        ></tree-loading-component>
      </div>
    </div>
  `
})
export class TreeNodeChildrenComponent {
  @Input() node: TreeNode;
  @Input() templates: any;

  constructor(private elementRef: ElementRef) {
    deprecatedSelector('TreeNodeChildren', 'tree-node-children', elementRef);
  }
}
