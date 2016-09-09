import { Component, ViewContainerRef, ComponentFactoryResolver, Input, ComponentFactory, TemplateRef, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { TreeModel } from '../models/tree.model';
import { AdHocComponentFactoryCreator } from './adhoc-component-factory.service';

@Component({
  selector: 'LoadingComponent',
  template: ''
})
export class LoadingComponent implements AfterViewInit {
  @Input() loadingTemplate: TemplateRef<any>;

  constructor(private treeModel: TreeModel,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private adHocComponentFactoryCreator: AdHocComponentFactoryCreator) {
  }

  ngAfterViewInit() {
    this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    let componentFactory;
    try {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.treeModel.loadingComponent);
    } catch(error) {
      componentFactory = this.adHocComponentFactoryCreator.getFactory(this.treeModel.loadingComponent);
    }
    let componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
  }
}