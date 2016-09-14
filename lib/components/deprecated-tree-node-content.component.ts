import { Component, Input, ComponentFactoryResolver, ComponentFactory, ComponentRef, AfterViewInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';
import { AdHocComponentFactoryCreator } from './adhoc-component-factory.service';

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
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;

  constructor(
    private treeModel: TreeModel,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private adHocComponentFactoryCreator: AdHocComponentFactoryCreator
    ) {
  }

  ngAfterViewInit() {
    this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    let componentFactory;
    try {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.treeModel.treeNodeContentComponent);
    } catch(error) {
      componentFactory = this.adHocComponentFactoryCreator.getFactory(this.treeModel.treeNodeContentComponent);
    }
    let componentRef: ComponentRef<ITreeNodeTemplate>
      = this.viewContainerRef.createComponent<ITreeNodeTemplate>(componentFactory, 0, this.viewContainerRef.injector);
    componentRef.instance.node = this.node;
    componentRef.instance.context = this.node.context;

    componentRef.changeDetectorRef.detectChanges();
  }
}