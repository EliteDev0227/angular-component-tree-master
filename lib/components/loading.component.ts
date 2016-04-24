import { Component, ElementRef, DynamicComponentLoader } from 'angular2/core'
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'LoadingComponent',
  template: '<span #loadingComponent></span>'
})
export class LoadingComponent {
  constructor(private componentLoader: DynamicComponentLoader,
              private elementRef: ElementRef,
              private treeModel:TreeModel) {
  }

  ngAfterViewInit() {
    this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    this.componentLoader.loadIntoLocation(this.treeModel.loadingComponent,
      this.elementRef,
      'loadingComponent');
  }  
}
