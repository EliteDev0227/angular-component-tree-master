import { Component, Input, ComponentResolver, ComponentFactory, ComponentRef, AfterViewInit, ViewContainerRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';

export interface ITreeNodeTemplate {
  node: TreeNode;
  context: any;
}

@Component({
  selector: 'TreeNodeContent',
  template: '',
})
export class TreeNodeContent implements AfterViewInit {
  @Input() node: TreeNode;

  constructor(
    private treeModel: TreeModel,
    private componentResolver: ComponentResolver,
    private viewContainerRef: ViewContainerRef
    ) {
  }

  ngAfterViewInit() {
    this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    this.componentResolver.resolveComponent(this.treeModel.treeNodeContentComponent)
      .then((componentFactory: ComponentFactory<ITreeNodeTemplate>) => {
        let componentRef: ComponentRef<ITreeNodeTemplate>
          = this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
        componentRef.instance.node = this.node;
        componentRef.instance.context = this.node.context;

        componentRef.changeDetectorRef.detectChanges();
      });
  }
}
