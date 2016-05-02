import { Component, ViewContainerRef, DynamicComponentLoader, Input } from 'angular2/core'
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'LoadingComponent',
  template: ''
})
export class LoadingComponent {
  constructor(private treeModel: TreeModel,
              private componentLoader: DynamicComponentLoader,
              private viewContainerRef: ViewContainerRef) {
  }

  ngAfterViewInit() {
    this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    this.componentLoader.loadNextToLocation(this.treeModel.loadingComponent,
      this.viewContainerRef);
  }  
}
