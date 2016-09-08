import { Component, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core'
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'LoadingComponent',
  template: '{{ loadingMessage }}'
})
export class LoadingComponent {
  loadingMessage: string;

  constructor(private treeModel: TreeModel,
              private componentResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngAfterViewInit() {
    this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    if (typeof this.treeModel.loadingComponent === 'string') {
      this.loadingMessage = this.treeModel.options.loadingComponent;
    } else {
      let componentFactory = this.componentResolver.resolveComponentFactory(this.treeModel.loadingComponent);
      this.viewContainerRef.createComponent(componentFactory);
    }
  }  
}
