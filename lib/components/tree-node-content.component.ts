import { Component, Input, Output, EventEmitter, DynamicComponentLoader, QueryList, Query, ElementRef, AfterViewInit, ViewContainerRef } from 'angular2/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';
import { LoadingComponent } from './loading.component.ts';

@Component({
  selector: 'TreeNodeContent',
  template: ''
})

export class TreeNodeContent implements AfterViewInit {
  @Input() node:TreeNode;

  constructor(
    private treeModel: TreeModel,
    private componentLoader: DynamicComponentLoader,
    private viewContainerRef: ViewContainerRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => this._loadTreeNodeContent());
  }

  _loadTreeNodeContent() {
    this.componentLoader.loadNextToLocation(this.treeModel.treeNodeContentComponent,
                                            this.viewContainerRef)
      .then((componentRef) => {
        componentRef.instance.node = this.node;
      });
  }
}
