import { Component, Input, Output, EventEmitter, DynamicComponentLoader, QueryList, Query, ElementRef, AfterViewInit } from 'angular2/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'TreeNode',
  directives: [TreeNodeComponent],
  styles: [
    '.tree-children { padding-left: 50px }',
    '.node-content-wrapper { display: inline-block }',
    '.tree-node.active > .node-content-wrapper { background: #AAF }'
  ],
  template: `
    <div class="tree-node" [class.expanded]="node.isExpanded" [class.active]="node.isActive">
      <button *ngIf="node.hasChildren" class="toggle-children" (click)="node.toggle()">*</button>
      <div class="node-content-wrapper" (click)="node.toggleActivated()">
        <span #treeNodeContent></span>
      </div>
      <div class="tree-children" [hidden]="node.isCollapsed">
        <TreeNode
          *ngFor="#node of node.children"
          [node]="node">
        </TreeNode>
      </div>
    </div>
  `
})

export class TreeNodeComponent implements AfterViewInit {
  @Input() node:TreeNode;

  constructor(private componentLoader: DynamicComponentLoader,
              private elementRef: ElementRef,
              private treeModel:TreeModel) {
  }

  ngAfterViewInit() {
      this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    this.componentLoader.loadIntoLocation(this.treeModel.treeNodeContentComponent,
                                          this.elementRef,
                                          'treeNodeContent')
      .then((componentRef) => {
        componentRef.instance.node = this.node;
      });
  }
}
