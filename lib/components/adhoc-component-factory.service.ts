import { Injectable, NgModule, ComponentFactory, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable()
export class AdHocComponentFactoryCreator {
  factories: ComponentFactory<any>[] = [];

  constructor(private compiler: Compiler) {
  }

  getFactory(component: any): ComponentFactory<any> {
    let factory = this.factories.find(factory => factory.componentType === component);
    if (!factory) {
      factory = this._createAdHocComponentFactory(component);
    }
    return factory;
  }

  _createAdHocComponentFactory(component: any): ComponentFactory<any> {
    @NgModule({
      declarations: [component],
      entryComponents: [component],
      imports: [CommonModule],
    })
    class AdHocModule {}
    let factory = this.compiler.compileModuleAndAllComponentsSync(AdHocModule).componentFactories
      .find(factory => factory.componentType === component);
    this.factories.push(factory);
    return factory;
  }
}