import { Component, Input, Output, EventEmitter, DynamicComponentLoader, QueryList, Query, ElementRef, AfterViewInit } from 'angular2/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'TreeNode',
  directives: [TreeNodeComponent],
  styles: [
    '.tree-children { padding-left: 20px }',
    `.node-content-wrapper {
      display: inline-block;
      padding: 2px 5px;
      border-radius: 2;
    }`,
    '.tree-node.active > .node-content-wrapper { background: #6CF }',
    '.tree-node.active.focused > .node-content-wrapper { background: #6CF }',
    '.tree-node.focused > .node-content-wrapper { background: #FFA }',
    '.tree-node.expanded > .toggle-children { background-image: url(\'data:image / png;base64, iVBORw0KGgoAAAANSUhEUgAAABIAAAAECAYAAACDQW/RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/ IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8 + IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjY1RTYzOTA2ODZDRjExREJBNkUyRDg4N0NFQUNCNDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ2QTJEN0RDODUzQzExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1Q0YwRTQ0ODUzQzExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk5NzA1OGEtZDI3OC00NDZkLWE4ODgtNGM4MGQ4YWI1NzNmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzRkZmQxMGMtY2NlNS0xMTc4LWE5OGQtY2NkZmM5ODk5YWYwIi8 + IDxkYzp0aXRsZT4gPHJkZjpBbHQ + IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI + Z2x5cGhpY29uczwvcmRmOmxpPiA8L3JkZjpBbHQ + IDwvZGM6dGl0bGU + IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY + IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8 + nZiGMwAAAChJREFUeNpiZGBg + ADE / AyUgY + MQOI / AxUAEwOVAMigj1Qw5yNAgAEACtUE2P6X / W4AAAAASUVORK5CYII=\') }',
    '.tree-node.collapsed > .toggle-children { background-image: url(\'data:image / png;base64, iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+ IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjY1RTYzOTA2ODZDRjExREJBNkUyRDg4N0NFQUNCNDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM1Q0YwRTQxODUzQzExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1Q0YwRTQwODUzQzExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk5NzA1OGEtZDI3OC00NDZkLWE4ODgtNGM4MGQ4YWI1NzNmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzRkZmQxMGMtY2NlNS0xMTc4LWE5OGQtY2NkZmM5ODk5YWYwIi8 + IDxkYzp0aXRsZT4gPHJkZjpBbHQ + IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI + Z2x5cGhpY29uczwvcmRmOmxpPiA8L3JkZjpBbHQ + IDwvZGM6dGl0bGU + IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY + IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8 + eUOB4gAAAFBJREFUeNpi / P//PwM+wMjI+AFI8UO5H4HqBfCqJ8JAFAVA9Yz41DMxUBmMGjgIDQQlgf9UNO8jtQ2kTRh+pKqXR7PeqIG0MfAjDjZWABBgACMcHM7LVR6AAAAAAElFTkSuQmCC\') }',
    `.toggle-children {
        height: 10px;
        width: 10px;
        background-size: contain;
        display: inline-block;
        position: relative;
        top: 1px;
        background-repeat: no-repeat;
        background-position: center;        
    }`,
    `.toggle-children-placeholder {
        display: inline-block;
        height: 10px;
        width: 10px;
        position: relative;
        top: 1px;
    }`
  ],
  template: `
    <div class="tree-node"
      [class.expanded]="node.isExpanded && node.hasChildren"
      [class.collapsed]="node.isCollapsed && node.hasChildren"
      [class.leaf]="node.isLeaf"
      [class.active]="node.isActive"
      [class.focused]="node.isFocused">
      <span
        *ngIf="node.hasChildren"
        class="toggle-children"
        (click)="node.toggle()">
      </span>
      <span
        *ngIf="!node.hasChildren"
        class="toggle-children-placeholder">
      </span>
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
