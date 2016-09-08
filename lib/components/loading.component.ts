import { Component, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core'
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'LoadingComponent',
  template: ''
})
export class LoadingComponent {
  constructor(private treeModel: TreeModel,
              private componentResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngAfterViewInit() {
    this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    let componentFactory = this.componentResolver.resolveComponentFactory(this.treeModel.loadingComponent);
    this.viewContainerRef.createComponent(componentFactory);
  }  
}
