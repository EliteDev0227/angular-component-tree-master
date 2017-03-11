import { Component, Input, ViewEncapsulation, TemplateRef, ElementRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { deprecatedSelector } from '../deprecated-selector';

@Component({
  selector: 'TreeNode, tree-node',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `.node-content-wrapper {
      display: inline-block;
      padding: 2px 5px;
      border-radius: 2px;
      transition: background-color .15s,box-shadow .15s;
    }`,
    '.node-wrapper {display: flex; align-items: flex-start;}',
    '.tree-node-active > .node-wrapper > .node-content-wrapper { background: #beebff }',
    '.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #beebff }',
    '.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #e7f4f9 }',
    '.node-content-wrapper:hover { background: #f7fbff }',
    `.tree-node-active > .node-wrapper > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover {
      box-shadow: inset 0 0 1px #999;
    }`,
    '.node-content-wrapper.is-dragging-over { background: #ddffee; box-shadow: inset 0 0 1px #999; }',
    '.node-content-wrapper.is-dragging-over-disabled { opacity: 0.5 }'
  ],
  template: `
    <ng-container *mobxAutorun>
      <div
        *ngIf="!templates.treeNodeFullTemplate"
        [class]="node.getClass()"
        [class.tree-node]="true"
        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
        [class.tree-node-leaf]="node.isLeaf"
        [class.tree-node-active]="node.isActive"
        [class.tree-node-focused]="node.isFocused">

        <tree-node-drop-slot *ngIf="index === 0" [dropIndex]="node.index" [node]="node.parent"></tree-node-drop-slot>

          <div class="node-wrapper" [style.padding-left]="node.getNodePadding()">
            <tree-node-expander [node]="node"></tree-node-expander>
            <div class="node-content-wrapper"
              (click)="node.mouseAction('click', $event)"
              (dblclick)="node.mouseAction('dblClick', $event)"
              (contextmenu)="node.mouseAction('contextMenu', $event)"
              (treeDrop)="node.onDrop($event)"
              [treeAllowDrop]="node.allowDrop"
              [treeDrag]="node"
              [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
            </div>
          </div>

        <tree-node-children [node]="node" [templates]="templates"></tree-node-children>
        <tree-node-drop-slot [dropIndex]="node.index + 1" [node]="node.parent"></tree-node-drop-slot>
      </div>
      <template
        [ngTemplateOutlet]="templates.treeNodeFullTemplate"
        [ngOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </template>
    </ng-container>`
})

export class TreeNodeComponent {
  @Input() node: TreeNode;
  @Input() index: number;
  @Input() templates: any;

  constructor(private elementRef: ElementRef) {
    deprecatedSelector('TreeNode', 'tree-node', elementRef);
  }

}
