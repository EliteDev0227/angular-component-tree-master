import { Component, ViewContainerRef, ComponentFactoryResolver, Input, ComponentFactory, TemplateRef, AfterViewInit } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { AdHocComponentFactoryCreator } from './adhoc-component-factory.service';
import { deprecatedSelector } from '../deprecated-selector';

@Component({
  selector: 'LoadingComponent, loading-component',
  template: ''
})
export class LoadingComponent implements AfterViewInit {
  @Input() loadingTemplate: TemplateRef<any>;

  constructor(private treeModel: TreeModel,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private adHocComponentFactoryCreator: AdHocComponentFactoryCreator) {
    deprecatedSelector('LoadingComponent', 'loading-component');
  }

  ngAfterViewInit() {
    this._loadTreeNodeContent();
  }

  _loadTreeNodeContent() {
    let componentFactory;
    try {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.treeModel.loadingComponent);
    } catch (error) {
      componentFactory = this.adHocComponentFactoryCreator.getFactory(this.treeModel.loadingComponent);
    }
    let componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
  }
}
