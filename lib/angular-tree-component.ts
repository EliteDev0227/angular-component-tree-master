import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobxAngularModule } from 'mobx-angular';

import { TREE_ACTIONS, IActionMapping, IActionHandler } from './models/tree-options.model';
import { ITreeOptions, IAllowDropFn, IAllowDragFn } from './defs/api';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeChildrenComponent } from './components/tree-node-children.component';
import { TreeNodeCollectionComponent } from './components/tree-node-collection.component';
import { TreeViewportComponent } from './components/tree-viewport.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';

import './polyfills';

const exportedDirectives = [
  TreeComponent,
  TreeNodeComponent,
  TreeNodeContent,
  LoadingComponent,
  TreeDropDirective,
  TreeDragDirective,
  TreeNodeExpanderComponent,
  TreeNodeChildrenComponent,
  TreeNodeDropSlot,
  TreeNodeCollectionComponent,
  TreeViewportComponent
];

export {
  TreeModel,
  TreeNode,
  TreeDraggedElement,
  TreeVirtualScroll,
  ITreeOptions,
  TREE_ACTIONS,
  KEYS,
  IActionMapping,
  IActionHandler,
  IAllowDropFn,
  IAllowDragFn,
  LoadingComponent,
  TreeComponent,
  TreeNodeComponent,
  TreeNodeContent,
  TreeDropDirective,
  TreeDragDirective,
  TreeNodeExpanderComponent,
  TreeNodeChildrenComponent,
  TreeNodeDropSlot,
  TreeNodeCollectionComponent,
  TreeViewportComponent
};

@NgModule({
  declarations: [
    ...exportedDirectives
  ],
  exports: [
    ...exportedDirectives
  ],
  imports: [
    CommonModule,
    MobxAngularModule
  ],
  providers: [
    TreeDraggedElement
  ]
})
export class TreeModule {}

export default TreeModule;
