import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { TREE_ACTIONS, IActionMapping, IActionHandler } from './models/tree-options.model';
import { ITreeOptions } from './defs/api';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { LoadingComponent } from './components/loading.component';
import { LoadingComponent as DeprecatedLoadingComponent } from './components/deprecated-loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeContent as DeprecatedTreeNodeContent } from './components/deprecated-tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { AdHocComponentFactoryCreator } from './components/adhoc-component-factory.service';

import './polyfills';
import { deprecated } from './deprecated';

export {
  TreeModel,
  TreeNode,
  ITreeOptions,
  TREE_ACTIONS,
  KEYS,
  IActionMapping,
  IActionHandler,
  LoadingComponent,
  TreeComponent,
  TreeNodeComponent,
  TreeNodeContent,
  TreeNodeDropSlot
};

@NgModule({
  declarations: [
    DeprecatedLoadingComponent,
    TreeComponent,
    TreeNodeComponent,
    DeprecatedTreeNodeContent,
    TreeNodeDropSlot
  ],
  exports: [
    TreeComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    AdHocComponentFactoryCreator,
  ],
})
export class DeprecatedTreeModule {
  constructor() {
    deprecated('DeprecatedTreeModule', 'TreeModule for AoT compilation');
  }
}
@NgModule({
  declarations: [
    LoadingComponent,
    TreeComponent,
    TreeNodeComponent,
    TreeNodeContent,
    TreeNodeDropSlot
  ],
  exports: [
    TreeComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class TreeModule {}
export default TreeModule;
