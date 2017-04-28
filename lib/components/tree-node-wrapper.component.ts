import { Component, Input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component({
  selector: 'tree-node-wrapper',
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
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
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
      <ng-container 
        [ngTemplateOutlet]="templates.treeNodeWrapperTemplate" 
        [ngOutletContext]="{ $implicit: node, node: node, index: index }">
      </ng-container>
    `
})

export class TreeNodeWrapperComponent {

  @Input() node: TreeNode;
  @Input() index: number;
  @Input() templates: any;

  constructor() { }

}
