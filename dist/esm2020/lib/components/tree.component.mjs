var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ContentChild, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { observable, computed, action, reaction } from 'mobx';
import * as i0 from "@angular/core";
import * as i1 from "../models/tree.model";
import * as i2 from "../models/tree-dragged-element.model";
import * as i3 from "./tree-viewport.component";
import * as i4 from "./tree-node-drop-slot.component";
import * as i5 from "@angular/common";
import * as i6 from "./tree-node-wrapper.component";
import * as i7 from "../mobx-angular/tree-mobx-autorun.directive";
import * as i8 from "./loading.component";
import * as i9 from "../directives/tree-animate-open.directive";
export class TreeComponent {
    constructor(treeModel, treeDraggedElement) {
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
        treeModel.subscribeToState((state) => this.stateChange.emit(state));
    }
    // Will be handled in ngOnChanges
    set nodes(nodes) {
    }
    ;
    set options(options) {
    }
    ;
    set focused(value) {
        this.treeModel.setFocus(value);
    }
    set state(state) {
        this.treeModel.setState(state);
    }
    onKeydown($event) {
        if (!this.treeModel.isFocused)
            return;
        if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase()))
            return;
        const focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    }
    onMousedown($event) {
        function isOutsideClick(startElement, nodeName) {
            return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick(startElement.parentElement, nodeName);
        }
        if (isOutsideClick($event.target, 'tree-root')) {
            this.treeModel.setFocus(false);
        }
    }
    ngOnChanges(changes) {
        if (changes.options || changes.nodes) {
            this.treeModel.setData({
                options: changes.options && changes.options.currentValue,
                nodes: changes.nodes && changes.nodes.currentValue,
                events: this.pick(this, this.treeModel.eventNames)
            });
        }
    }
    sizeChanged() {
        this.viewportComponent.setViewport();
    }
    pick(object, keys) {
        return keys.reduce((obj, key) => {
            if (object && object.hasOwnProperty(key)) {
                obj[key] = object[key];
            }
            return obj;
        }, {});
    }
}
/** @nocollapse */ TreeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeComponent, deps: [{ token: i1.TreeModel }, { token: i2.TreeDraggedElement }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TreeComponent, selector: "Tree, tree-root", inputs: { nodes: "nodes", options: "options", focused: "focused", state: "state" }, outputs: { toggleExpanded: "toggleExpanded", activate: "activate", deactivate: "deactivate", nodeActivate: "nodeActivate", nodeDeactivate: "nodeDeactivate", select: "select", deselect: "deselect", focus: "focus", blur: "blur", updateData: "updateData", initialized: "initialized", moveNode: "moveNode", copyNode: "copyNode", loadNodeChildren: "loadNodeChildren", changeFilter: "changeFilter", event: "event", stateChange: "stateChange" }, host: { listeners: { "body: keydown": "onKeydown($event)", "body: mousedown": "onMousedown($event)" } }, providers: [TreeModel], queries: [{ propertyName: "loadingTemplate", first: true, predicate: ["loadingTemplate"], descendants: true }, { propertyName: "treeNodeTemplate", first: true, predicate: ["treeNodeTemplate"], descendants: true }, { propertyName: "treeNodeWrapperTemplate", first: true, predicate: ["treeNodeWrapperTemplate"], descendants: true }, { propertyName: "treeNodeFullTemplate", first: true, predicate: ["treeNodeFullTemplate"], descendants: true }], viewQueries: [{ propertyName: "viewportComponent", first: true, predicate: ["viewport"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
      <tree-viewport #viewport>
          <div
                  class="angular-tree-component"
                  [class.node-dragging]="treeDraggedElement.isDragging()"
                  [class.angular-tree-component-rtl]="treeModel.options.rtl">
              <tree-node-collection
                      *ngIf="treeModel.roots"
                      [nodes]="treeModel.roots"
                      [treeModel]="treeModel"
                      [templates]="{
            loadingTemplate: loadingTemplate,
            treeNodeTemplate: treeNodeTemplate,
            treeNodeWrapperTemplate: treeNodeWrapperTemplate,
            treeNodeFullTemplate: treeNodeFullTemplate
          }">
              </tree-node-collection>
              <tree-node-drop-slot
                      class="empty-tree-drop-slot"
                      *ngIf="treeModel.isEmptyTree()"
                      [dropIndex]="0"
                      [node]="treeModel.virtualRoot">
              </tree-node-drop-slot>
          </div>
      </tree-viewport>
  `, isInline: true, components: [{ type: i0.forwardRef(function () { return i3.TreeViewportComponent; }), selector: "tree-viewport" }, { type: i0.forwardRef(function () { return TreeNodeCollectionComponent; }), selector: "tree-node-collection", inputs: ["nodes", "treeModel", "templates"] }, { type: i0.forwardRef(function () { return i4.TreeNodeDropSlot; }), selector: "TreeNodeDropSlot, tree-node-drop-slot", inputs: ["node", "dropIndex"] }], directives: [{ type: i0.forwardRef(function () { return i5.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'Tree, tree-root',
                    providers: [TreeModel],
                    styles: [],
                    template: `
      <tree-viewport #viewport>
          <div
                  class="angular-tree-component"
                  [class.node-dragging]="treeDraggedElement.isDragging()"
                  [class.angular-tree-component-rtl]="treeModel.options.rtl">
              <tree-node-collection
                      *ngIf="treeModel.roots"
                      [nodes]="treeModel.roots"
                      [treeModel]="treeModel"
                      [templates]="{
            loadingTemplate: loadingTemplate,
            treeNodeTemplate: treeNodeTemplate,
            treeNodeWrapperTemplate: treeNodeWrapperTemplate,
            treeNodeFullTemplate: treeNodeFullTemplate
          }">
              </tree-node-collection>
              <tree-node-drop-slot
                      class="empty-tree-drop-slot"
                      *ngIf="treeModel.isEmptyTree()"
                      [dropIndex]="0"
                      [node]="treeModel.virtualRoot">
              </tree-node-drop-slot>
          </div>
      </tree-viewport>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.TreeModel }, { type: i2.TreeDraggedElement }]; }, propDecorators: { loadingTemplate: [{
                type: ContentChild,
                args: ['loadingTemplate', { static: false }]
            }], treeNodeTemplate: [{
                type: ContentChild,
                args: ['treeNodeTemplate', { static: false }]
            }], treeNodeWrapperTemplate: [{
                type: ContentChild,
                args: ['treeNodeWrapperTemplate', { static: false }]
            }], treeNodeFullTemplate: [{
                type: ContentChild,
                args: ['treeNodeFullTemplate', { static: false }]
            }], viewportComponent: [{
                type: ViewChild,
                args: ['viewport', { static: false }]
            }], nodes: [{
                type: Input
            }], options: [{
                type: Input
            }], focused: [{
                type: Input
            }], state: [{
                type: Input
            }], toggleExpanded: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], nodeActivate: [{
                type: Output
            }], nodeDeactivate: [{
                type: Output
            }], select: [{
                type: Output
            }], deselect: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], updateData: [{
                type: Output
            }], initialized: [{
                type: Output
            }], moveNode: [{
                type: Output
            }], copyNode: [{
                type: Output
            }], loadNodeChildren: [{
                type: Output
            }], changeFilter: [{
                type: Output
            }], event: [{
                type: Output
            }], stateChange: [{
                type: Output
            }], onKeydown: [{
                type: HostListener,
                args: ['body: keydown', ['$event']]
            }], onMousedown: [{
                type: HostListener,
                args: ['body: mousedown', ['$event']]
            }] } });
export class TreeNodeComponent {
}
/** @nocollapse */ TreeNodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TreeNodeComponent, selector: "TreeNode, tree-node", inputs: { node: "node", index: "index", templates: "templates" }, ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        *ngIf="!templates.treeNodeFullTemplate"
        [class]="node.getClass()"
        [class.tree-node]="true"
        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
        [class.tree-node-leaf]="node.isLeaf"
        [class.tree-node-active]="node.isActive"
        [class.tree-node-focused]="node.isFocused"
      >
        <tree-node-drop-slot
          *ngIf="index === 0"
          [dropIndex]="node.index"
          [node]="node.parent"
        ></tree-node-drop-slot>

        <tree-node-wrapper
          [node]="node"
          [index]="index"
          [templates]="templates"
        ></tree-node-wrapper>

        <tree-node-children
          [node]="node"
          [templates]="templates"
        ></tree-node-children>
        <tree-node-drop-slot
          [dropIndex]="node.index + 1"
          [node]="node.parent"
        ></tree-node-drop-slot>
      </div>
      <ng-container
        [ngTemplateOutlet]="templates.treeNodeFullTemplate"
        [ngTemplateOutletContext]="{
          $implicit: node,
          node: node,
          index: index,
          templates: templates
        }"
      >
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i0.forwardRef(function () { return i4.TreeNodeDropSlot; }), selector: "TreeNodeDropSlot, tree-node-drop-slot", inputs: ["node", "dropIndex"] }, { type: i0.forwardRef(function () { return i6.TreeNodeWrapperComponent; }), selector: "tree-node-wrapper", inputs: ["node", "index", "templates"] }, { type: i0.forwardRef(function () { return TreeNodeChildrenComponent; }), selector: "tree-node-children", inputs: ["node", "templates"] }], directives: [{ type: i0.forwardRef(function () { return i7.TreeMobxAutorunDirective; }), selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }, { type: i0.forwardRef(function () { return i5.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i0.forwardRef(function () { return i5.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'TreeNode, tree-node',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        *ngIf="!templates.treeNodeFullTemplate"
        [class]="node.getClass()"
        [class.tree-node]="true"
        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
        [class.tree-node-leaf]="node.isLeaf"
        [class.tree-node-active]="node.isActive"
        [class.tree-node-focused]="node.isFocused"
      >
        <tree-node-drop-slot
          *ngIf="index === 0"
          [dropIndex]="node.index"
          [node]="node.parent"
        ></tree-node-drop-slot>

        <tree-node-wrapper
          [node]="node"
          [index]="index"
          [templates]="templates"
        ></tree-node-wrapper>

        <tree-node-children
          [node]="node"
          [templates]="templates"
        ></tree-node-children>
        <tree-node-drop-slot
          [dropIndex]="node.index + 1"
          [node]="node.parent"
        ></tree-node-drop-slot>
      </div>
      <ng-container
        [ngTemplateOutlet]="templates.treeNodeFullTemplate"
        [ngTemplateOutletContext]="{
          $implicit: node,
          node: node,
          index: index,
          templates: templates
        }"
      >
      </ng-container>
    </ng-container>
  `
                }]
        }], propDecorators: { node: [{
                type: Input
            }], index: [{
                type: Input
            }], templates: [{
                type: Input
            }] } });
export class TreeNodeCollectionComponent {
    constructor() {
        this._dispose = [];
    }
    get nodes() {
        return this._nodes;
    }
    set nodes(nodes) {
        this.setNodes(nodes);
    }
    get marginTop() {
        const firstNode = this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
        const relativePosition = firstNode && firstNode.parent
            ? firstNode.position -
                firstNode.parent.position -
                firstNode.parent.getSelfHeight()
            : 0;
        return `${relativePosition}px`;
    }
    setNodes(nodes) {
        this._nodes = nodes;
    }
    ngOnInit() {
        this.virtualScroll = this.treeModel.virtualScroll;
        this._dispose = [
            // return node indexes so we can compare structurally,
            reaction(() => {
                return this.virtualScroll
                    .getViewportNodes(this.nodes)
                    .map(n => n.index);
            }, nodeIndexes => {
                this.viewportNodes = nodeIndexes.map(i => this.nodes[i]);
            }, { compareStructural: true, fireImmediately: true }),
            reaction(() => this.nodes, nodes => {
                this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
            })
        ];
    }
    ngOnDestroy() {
        this._dispose.forEach(d => d());
    }
    trackNode(index, node) {
        return node.id;
    }
}
/** @nocollapse */ TreeNodeCollectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeCollectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeCollectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TreeNodeCollectionComponent, selector: "tree-node-collection", inputs: { nodes: "nodes", treeModel: "treeModel", templates: "templates" }, ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates"
        >
        </tree-node>
      </div>
    </ng-container>
  `, isInline: true, components: [{ type: TreeNodeComponent, selector: "TreeNode, tree-node", inputs: ["node", "index", "templates"] }], directives: [{ type: i7.TreeMobxAutorunDirective, selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None });
__decorate([
    observable
], TreeNodeCollectionComponent.prototype, "_nodes", void 0);
__decorate([
    observable
], TreeNodeCollectionComponent.prototype, "viewportNodes", void 0);
__decorate([
    computed
], TreeNodeCollectionComponent.prototype, "marginTop", null);
__decorate([
    action
], TreeNodeCollectionComponent.prototype, "setNodes", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeCollectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tree-node-collection',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates"
        >
        </tree-node>
      </div>
    </ng-container>
  `
                }]
        }], propDecorators: { nodes: [{
                type: Input
            }], treeModel: [{
                type: Input
            }], _nodes: [], templates: [{
                type: Input
            }], viewportNodes: [], marginTop: [], setNodes: [] } });
export class TreeNodeChildrenComponent {
}
/** @nocollapse */ TreeNodeChildrenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeChildrenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeChildrenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TreeNodeChildrenComponent, selector: "tree-node-children", inputs: { node: "node", templates: "templates" }, ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        [class.tree-children]="true"
        [class.tree-children-no-padding]="node.options.levelPadding"
        *treeAnimateOpen="
          node.isExpanded;
          speed: node.options.animateSpeed;
          acceleration: node.options.animateAcceleration;
          enabled: node.options.animateExpand
        "
      >
        <tree-node-collection
          *ngIf="node.children"
          [nodes]="node.children"
          [templates]="templates"
          [treeModel]="node.treeModel"
        >
        </tree-node-collection>
        <tree-loading-component
          [style.padding-left]="node.getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [template]="templates.loadingTemplate"
          [node]="node"
        ></tree-loading-component>
      </div>
    </ng-container>
  `, isInline: true, components: [{ type: TreeNodeCollectionComponent, selector: "tree-node-collection", inputs: ["nodes", "treeModel", "templates"] }, { type: i8.LoadingComponent, selector: "tree-loading-component", inputs: ["template", "node"] }], directives: [{ type: i7.TreeMobxAutorunDirective, selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }, { type: i9.TreeAnimateOpenDirective, selector: "[treeAnimateOpen]", inputs: ["treeAnimateOpenSpeed", "treeAnimateOpenAcceleration", "treeAnimateOpenEnabled", "treeAnimateOpen"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeChildrenComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tree-node-children',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        [class.tree-children]="true"
        [class.tree-children-no-padding]="node.options.levelPadding"
        *treeAnimateOpen="
          node.isExpanded;
          speed: node.options.animateSpeed;
          acceleration: node.options.animateAcceleration;
          enabled: node.options.animateExpand
        "
      >
        <tree-node-collection
          *ngIf="node.children"
          [nodes]="node.children"
          [templates]="templates"
          [treeModel]="node.treeModel"
        >
        </tree-node-collection>
        <tree-loading-component
          [style.padding-left]="node.getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [template]="templates.loadingTemplate"
          [node]="node"
        ></tree-loading-component>
      </div>
    </ng-container>
  `
                }]
        }], propDecorators: { node: [{
                type: Input
            }], templates: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFlLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFLakQsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7QUFrQzVELE1BQU0sT0FBTyxhQUFhO0lBMkN4QixZQUNTLFNBQW9CLEVBQ3BCLGtCQUFzQztRQUR0QyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFFN0MsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDeEUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUF2Q0QsaUNBQWlDO0lBQ2pDLElBQWEsS0FBSyxDQUFDLEtBQVk7SUFDL0IsQ0FBQztJQUFBLENBQUM7SUFFRixJQUFhLE9BQU8sQ0FBQyxPQUFxQjtJQUMxQyxDQUFDO0lBQUEsQ0FBQztJQUVGLElBQWEsT0FBTyxDQUFDLEtBQWM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELElBQWEsS0FBSyxDQUFDLEtBQUs7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQTZCRCxTQUFTLENBQUMsTUFBTTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7WUFBRSxPQUFPO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQUUsT0FBTztRQUV6RixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFHRCxXQUFXLENBQUMsTUFBTTtRQUNoQixTQUFTLGNBQWMsQ0FBQyxZQUFxQixFQUFFLFFBQWdCO1lBQzdELE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkksQ0FBQztRQUVELElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQU87UUFDakIsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWTtnQkFDeEQsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZO2dCQUNsRCxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7YUFDbkQsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM5QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDOzs4SEE3RlUsYUFBYTtrSEFBYixhQUFhLDhwQkE3QmIsQ0FBQyxTQUFTLENBQUMseWxCQUVaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJULGdMQStLVSwyQkFBMkI7NEZBN0szQixhQUFhO2tCQS9CekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ3RCLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDtpQkFDRjtpSUFLcUQsZUFBZTtzQkFBbEUsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ0csZ0JBQWdCO3NCQUFwRSxZQUFZO3VCQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDUyx1QkFBdUI7c0JBQWxGLFlBQVk7dUJBQUMseUJBQXlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUNELG9CQUFvQjtzQkFBNUUsWUFBWTt1QkFBQyxzQkFBc0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ2IsaUJBQWlCO3NCQUExRCxTQUFTO3VCQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRzNCLEtBQUs7c0JBQWpCLEtBQUs7Z0JBR08sT0FBTztzQkFBbkIsS0FBSztnQkFHTyxPQUFPO3NCQUFuQixLQUFLO2dCQUlPLEtBQUs7c0JBQWpCLEtBQUs7Z0JBSUksY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxLQUFLO3NCQUFkLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFXUCxTQUFTO3NCQURSLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVd6QyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBdUY3QyxNQUFNLE9BQU8saUJBQWlCOztrSUFBakIsaUJBQWlCO3NIQUFqQixpQkFBaUIsNkhBOUNsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q1QsdVhBb0lVLHlCQUF5Qjs0RkFsSXpCLGlCQUFpQjtrQkFsRDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q1Q7aUJBQ0Y7OEJBRVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLOztBQXNCUixNQUFNLE9BQU8sMkJBQTJCO0lBakJ4QztRQStDRSxhQUFRLEdBQUcsRUFBRSxDQUFDO0tBcUNmO0lBbEVDLElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSztRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQVVTLElBQUksU0FBUztRQUNyQixNQUFNLFNBQVMsR0FDYixJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsTUFBTSxnQkFBZ0IsR0FDcEIsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNO1lBQzNCLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUTtnQkFDbEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUN6QixTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVIsT0FBTyxHQUFHLGdCQUFnQixJQUFJLENBQUM7SUFDakMsQ0FBQztJQUlPLFFBQVEsQ0FBQyxLQUFLO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2Qsc0RBQXNEO1lBQ3RELFFBQVEsQ0FDTixHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxJQUFJLENBQUMsYUFBYTtxQkFDdEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztxQkFDNUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsRUFDRCxXQUFXLENBQUMsRUFBRTtnQkFDWixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxFQUNELEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQVMsQ0FDMUQ7WUFDRCxRQUFRLENBQ04sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFDaEIsS0FBSyxDQUFDLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs0SUFsRVUsMkJBQTJCO2dJQUEzQiwyQkFBMkIsd0lBZDVCOzs7Ozs7Ozs7Ozs7R0FZVCx1Q0F2QlUsaUJBQWlCO0FBb0NoQjtJQUFYLFVBQVU7MkRBQVE7QUFJUDtJQUFYLFVBQVU7a0VBQTJCO0FBRTVCO0lBQVQsUUFBUTs0REFXUjtBQUlPO0lBQVAsTUFBTTsyREFFTjs0RkFsQ1UsMkJBQTJCO2tCQWpCdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtpQkFDRjs4QkFHSyxLQUFLO3NCQURSLEtBQUs7Z0JBUUcsU0FBUztzQkFBakIsS0FBSztnQkFFTSxNQUFNLE1BRVQsU0FBUztzQkFBakIsS0FBSztnQkFFTSxhQUFhLE1BRVgsU0FBUyxNQWVmLFFBQVE7QUF5RWxCLE1BQU0sT0FBTyx5QkFBeUI7OzBJQUF6Qix5QkFBeUI7OEhBQXpCLHlCQUF5Qiw0R0E5QjFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJULHVDQXZHVSwyQkFBMkI7NEZBeUczQix5QkFBeUI7a0JBbENyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxNQUFNLEVBQUUsRUFBRTtvQkFDVixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQ7aUJBQ0Y7OEJBRVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IElUcmVlT3B0aW9ucywgVHJlZU5vZGUgfSBmcm9tICcuLi9kZWZzL2FwaSc7XG5pbXBvcnQgeyBUcmVlVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtdmlld3BvcnQuY29tcG9uZW50JztcbmltcG9ydCB7b2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiwgcmVhY3Rpb259IGZyb20gJ21vYngnO1xuaW1wb3J0IHtUcmVlVmlydHVhbFNjcm9sbH0gZnJvbSAnLi4vYW5ndWxhci10cmVlLWNvbXBvbmVudC5tb2R1bGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUcmVlLCB0cmVlLXJvb3QnLFxuICBwcm92aWRlcnM6IFtUcmVlTW9kZWxdLFxuICBzdHlsZXM6IFtdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPHRyZWUtdmlld3BvcnQgI3ZpZXdwb3J0PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYW5ndWxhci10cmVlLWNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3Mubm9kZS1kcmFnZ2luZ109XCJ0cmVlRHJhZ2dlZEVsZW1lbnQuaXNEcmFnZ2luZygpXCJcbiAgICAgICAgICAgICAgICAgIFtjbGFzcy5hbmd1bGFyLXRyZWUtY29tcG9uZW50LXJ0bF09XCJ0cmVlTW9kZWwub3B0aW9ucy5ydGxcIj5cbiAgICAgICAgICAgICAgPHRyZWUtbm9kZS1jb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwucm9vdHNcIlxuICAgICAgICAgICAgICAgICAgICAgIFtub2Rlc109XCJ0cmVlTW9kZWwucm9vdHNcIlxuICAgICAgICAgICAgICAgICAgICAgIFt0cmVlTW9kZWxdPVwidHJlZU1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdGVtcGxhdGVzXT1cIntcbiAgICAgICAgICAgIGxvYWRpbmdUZW1wbGF0ZTogbG9hZGluZ1RlbXBsYXRlLFxuICAgICAgICAgICAgdHJlZU5vZGVUZW1wbGF0ZTogdHJlZU5vZGVUZW1wbGF0ZSxcbiAgICAgICAgICAgIHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlOiB0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZSxcbiAgICAgICAgICAgIHRyZWVOb2RlRnVsbFRlbXBsYXRlOiB0cmVlTm9kZUZ1bGxUZW1wbGF0ZVxuICAgICAgICAgIH1cIj5cbiAgICAgICAgICAgICAgPC90cmVlLW5vZGUtY29sbGVjdGlvbj5cbiAgICAgICAgICAgICAgPHRyZWUtbm9kZS1kcm9wLXNsb3RcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImVtcHR5LXRyZWUtZHJvcC1zbG90XCJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInRyZWVNb2RlbC5pc0VtcHR5VHJlZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZHJvcEluZGV4XT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgIFtub2RlXT1cInRyZWVNb2RlbC52aXJ0dWFsUm9vdFwiPlxuICAgICAgICAgICAgICA8L3RyZWUtbm9kZS1kcm9wLXNsb3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L3RyZWUtdmlld3BvcnQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIF9ub2RlczogYW55W107XG4gIF9vcHRpb25zOiBUcmVlT3B0aW9ucztcblxuICBAQ29udGVudENoaWxkKCdsb2FkaW5nVGVtcGxhdGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZVRlbXBsYXRlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRyZWVOb2RlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ3RyZWVOb2RlV3JhcHBlclRlbXBsYXRlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZUZ1bGxUZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQFZpZXdDaGlsZCgndmlld3BvcnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgdmlld3BvcnRDb21wb25lbnQ6IFRyZWVWaWV3cG9ydENvbXBvbmVudDtcblxuICAvLyBXaWxsIGJlIGhhbmRsZWQgaW4gbmdPbkNoYW5nZXNcbiAgQElucHV0KCkgc2V0IG5vZGVzKG5vZGVzOiBhbnlbXSkge1xuICB9O1xuXG4gIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IElUcmVlT3B0aW9ucykge1xuICB9O1xuXG4gIEBJbnB1dCgpIHNldCBmb2N1c2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXModmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0U3RhdGUoc3RhdGUpO1xuICB9XG5cbiAgQE91dHB1dCgpIHRvZ2dsZUV4cGFuZGVkO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlO1xuICBAT3V0cHV0KCkgbm9kZUFjdGl2YXRlO1xuICBAT3V0cHV0KCkgbm9kZURlYWN0aXZhdGU7XG4gIEBPdXRwdXQoKSBzZWxlY3Q7XG4gIEBPdXRwdXQoKSBkZXNlbGVjdDtcbiAgQE91dHB1dCgpIGZvY3VzO1xuICBAT3V0cHV0KCkgYmx1cjtcbiAgQE91dHB1dCgpIHVwZGF0ZURhdGE7XG4gIEBPdXRwdXQoKSBpbml0aWFsaXplZDtcbiAgQE91dHB1dCgpIG1vdmVOb2RlO1xuICBAT3V0cHV0KCkgY29weU5vZGU7XG4gIEBPdXRwdXQoKSBsb2FkTm9kZUNoaWxkcmVuO1xuICBAT3V0cHV0KCkgY2hhbmdlRmlsdGVyO1xuICBAT3V0cHV0KCkgZXZlbnQ7XG4gIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdHJlZU1vZGVsOiBUcmVlTW9kZWwsXG4gICAgcHVibGljIHRyZWVEcmFnZ2VkRWxlbWVudDogVHJlZURyYWdnZWRFbGVtZW50KSB7XG5cbiAgICB0cmVlTW9kZWwuZXZlbnROYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB0aGlzW25hbWVdID0gbmV3IEV2ZW50RW1pdHRlcigpKTtcbiAgICB0cmVlTW9kZWwuc3Vic2NyaWJlVG9TdGF0ZSgoc3RhdGUpID0+IHRoaXMuc3RhdGVDaGFuZ2UuZW1pdChzdGF0ZSkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYm9keToga2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5ZG93bigkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMudHJlZU1vZGVsLmlzRm9jdXNlZCkgcmV0dXJuO1xuICAgIGlmIChbJ2lucHV0JywgJ3RleHRhcmVhJ10uaW5jbHVkZXMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSByZXR1cm47XG5cbiAgICBjb25zdCBmb2N1c2VkTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XG5cbiAgICB0aGlzLnRyZWVNb2RlbC5wZXJmb3JtS2V5QWN0aW9uKGZvY3VzZWROb2RlLCAkZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYm9keTogbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZWRvd24oJGV2ZW50KSB7XG4gICAgZnVuY3Rpb24gaXNPdXRzaWRlQ2xpY2soc3RhcnRFbGVtZW50OiBFbGVtZW50LCBub2RlTmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gIXN0YXJ0RWxlbWVudCA/IHRydWUgOiBzdGFydEVsZW1lbnQubG9jYWxOYW1lID09PSBub2RlTmFtZSA/IGZhbHNlIDogaXNPdXRzaWRlQ2xpY2soc3RhcnRFbGVtZW50LnBhcmVudEVsZW1lbnQsIG5vZGVOYW1lKTtcbiAgICB9XG5cbiAgICBpZiAoaXNPdXRzaWRlQ2xpY2soJGV2ZW50LnRhcmdldCwgJ3RyZWUtcm9vdCcpKSB7XG4gICAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMgfHwgY2hhbmdlcy5ub2Rlcykge1xuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0RGF0YSh7XG4gICAgICAgIG9wdGlvbnM6IGNoYW5nZXMub3B0aW9ucyAmJiBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLFxuICAgICAgICBub2RlczogY2hhbmdlcy5ub2RlcyAmJiBjaGFuZ2VzLm5vZGVzLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgZXZlbnRzOiB0aGlzLnBpY2sodGhpcywgdGhpcy50cmVlTW9kZWwuZXZlbnROYW1lcylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNpemVDaGFuZ2VkKCkge1xuICAgIHRoaXMudmlld3BvcnRDb21wb25lbnQuc2V0Vmlld3BvcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcGljayhvYmplY3QsIGtleXMpIHtcbiAgICByZXR1cm4ga2V5cy5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XG4gICAgICBpZiAob2JqZWN0ICYmIG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sIHt9KTtcbiAgfVxufVxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnVHJlZU5vZGUsIHRyZWUtbm9kZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqdHJlZU1vYnhBdXRvcnVuPVwieyBkb250RGV0YWNoOiB0cnVlIH1cIj5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCIhdGVtcGxhdGVzLnRyZWVOb2RlRnVsbFRlbXBsYXRlXCJcbiAgICAgICAgW2NsYXNzXT1cIm5vZGUuZ2V0Q2xhc3MoKVwiXG4gICAgICAgIFtjbGFzcy50cmVlLW5vZGVdPVwidHJ1ZVwiXG4gICAgICAgIFtjbGFzcy50cmVlLW5vZGUtZXhwYW5kZWRdPVwibm9kZS5pc0V4cGFuZGVkICYmIG5vZGUuaGFzQ2hpbGRyZW5cIlxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWNvbGxhcHNlZF09XCJub2RlLmlzQ29sbGFwc2VkICYmIG5vZGUuaGFzQ2hpbGRyZW5cIlxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWxlYWZdPVwibm9kZS5pc0xlYWZcIlxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWFjdGl2ZV09XCJub2RlLmlzQWN0aXZlXCJcbiAgICAgICAgW2NsYXNzLnRyZWUtbm9kZS1mb2N1c2VkXT1cIm5vZGUuaXNGb2N1c2VkXCJcbiAgICAgID5cbiAgICAgICAgPHRyZWUtbm9kZS1kcm9wLXNsb3RcbiAgICAgICAgICAqbmdJZj1cImluZGV4ID09PSAwXCJcbiAgICAgICAgICBbZHJvcEluZGV4XT1cIm5vZGUuaW5kZXhcIlxuICAgICAgICAgIFtub2RlXT1cIm5vZGUucGFyZW50XCJcbiAgICAgICAgPjwvdHJlZS1ub2RlLWRyb3Atc2xvdD5cblxuICAgICAgICA8dHJlZS1ub2RlLXdyYXBwZXJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgICBbaW5kZXhdPVwiaW5kZXhcIlxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCJcbiAgICAgICAgPjwvdHJlZS1ub2RlLXdyYXBwZXI+XG5cbiAgICAgICAgPHRyZWUtbm9kZS1jaGlsZHJlblxuICAgICAgICAgIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCJcbiAgICAgICAgPjwvdHJlZS1ub2RlLWNoaWxkcmVuPlxuICAgICAgICA8dHJlZS1ub2RlLWRyb3Atc2xvdFxuICAgICAgICAgIFtkcm9wSW5kZXhdPVwibm9kZS5pbmRleCArIDFcIlxuICAgICAgICAgIFtub2RlXT1cIm5vZGUucGFyZW50XCJcbiAgICAgICAgPjwvdHJlZS1ub2RlLWRyb3Atc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXMudHJlZU5vZGVGdWxsVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICAgICRpbXBsaWNpdDogbm9kZSxcbiAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICB0ZW1wbGF0ZXM6IHRlbXBsYXRlc1xuICAgICAgICB9XCJcbiAgICAgID5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHRlbXBsYXRlczogYW55O1xufVxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLWNvbGxlY3Rpb24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XG4gICAgICA8ZGl2IFtzdHlsZS5tYXJnaW4tdG9wXT1cIm1hcmdpblRvcFwiPlxuICAgICAgICA8dHJlZS1ub2RlXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2Ygdmlld3BvcnROb2RlczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tOb2RlXCJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgICBbaW5kZXhdPVwiaVwiXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIlxuICAgICAgICA+XG4gICAgICAgIDwvdHJlZS1ub2RlPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBnZXQgbm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVzO1xuICB9XG4gIHNldCBub2Rlcyhub2Rlcykge1xuICAgIHRoaXMuc2V0Tm9kZXMobm9kZXMpO1xuICB9XG5cbiAgQElucHV0KCkgdHJlZU1vZGVsOiBUcmVlTW9kZWw7XG5cbiAgQG9ic2VydmFibGUgX25vZGVzO1xuICBwcml2YXRlIHZpcnR1YWxTY3JvbGw6IFRyZWVWaXJ0dWFsU2Nyb2xsOyAvLyBDYW5ub3QgaW5qZWN0IHRoaXMsIGJlY2F1c2Ugd2UgbWlnaHQgYmUgaW5zaWRlIHRyZWVOb2RlVGVtcGxhdGVGdWxsXG4gIEBJbnB1dCgpIHRlbXBsYXRlcztcblxuICBAb2JzZXJ2YWJsZSB2aWV3cG9ydE5vZGVzOiBUcmVlTm9kZVtdO1xuXG4gIEBjb21wdXRlZCBnZXQgbWFyZ2luVG9wKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZmlyc3ROb2RlID1cbiAgICAgIHRoaXMudmlld3BvcnROb2RlcyAmJiB0aGlzLnZpZXdwb3J0Tm9kZXMubGVuZ3RoICYmIHRoaXMudmlld3BvcnROb2Rlc1swXTtcbiAgICBjb25zdCByZWxhdGl2ZVBvc2l0aW9uID1cbiAgICAgIGZpcnN0Tm9kZSAmJiBmaXJzdE5vZGUucGFyZW50XG4gICAgICAgID8gZmlyc3ROb2RlLnBvc2l0aW9uIC1cbiAgICAgICAgICBmaXJzdE5vZGUucGFyZW50LnBvc2l0aW9uIC1cbiAgICAgICAgICBmaXJzdE5vZGUucGFyZW50LmdldFNlbGZIZWlnaHQoKVxuICAgICAgICA6IDA7XG5cbiAgICByZXR1cm4gYCR7cmVsYXRpdmVQb3NpdGlvbn1weGA7XG4gIH1cblxuICBfZGlzcG9zZSA9IFtdO1xuXG4gIEBhY3Rpb24gc2V0Tm9kZXMobm9kZXMpIHtcbiAgICB0aGlzLl9ub2RlcyA9IG5vZGVzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsID0gdGhpcy50cmVlTW9kZWwudmlydHVhbFNjcm9sbDtcbiAgICB0aGlzLl9kaXNwb3NlID0gW1xuICAgICAgLy8gcmV0dXJuIG5vZGUgaW5kZXhlcyBzbyB3ZSBjYW4gY29tcGFyZSBzdHJ1Y3R1cmFsbHksXG4gICAgICByZWFjdGlvbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnZpcnR1YWxTY3JvbGxcbiAgICAgICAgICAgIC5nZXRWaWV3cG9ydE5vZGVzKHRoaXMubm9kZXMpXG4gICAgICAgICAgICAubWFwKG4gPT4gbi5pbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGVJbmRleGVzID0+IHtcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0Tm9kZXMgPSBub2RlSW5kZXhlcy5tYXAoaSA9PiB0aGlzLm5vZGVzW2ldKTtcbiAgICAgICAgfSxcbiAgICAgICAgeyBjb21wYXJlU3RydWN0dXJhbDogdHJ1ZSwgZmlyZUltbWVkaWF0ZWx5OiB0cnVlIH0gYXMgYW55XG4gICAgICApLFxuICAgICAgcmVhY3Rpb24oXG4gICAgICAgICgpID0+IHRoaXMubm9kZXMsXG4gICAgICAgIG5vZGVzID0+IHtcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0Tm9kZXMgPSB0aGlzLnZpcnR1YWxTY3JvbGwuZ2V0Vmlld3BvcnROb2Rlcyhub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICBdO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGlzcG9zZS5mb3JFYWNoKGQgPT4gZCgpKTtcbiAgfVxuXG4gIHRyYWNrTm9kZShpbmRleCwgbm9kZSkge1xuICAgIHJldHVybiBub2RlLmlkO1xuICB9XG59XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtY2hpbGRyZW4nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XG4gICAgICA8ZGl2XG4gICAgICAgIFtjbGFzcy50cmVlLWNoaWxkcmVuXT1cInRydWVcIlxuICAgICAgICBbY2xhc3MudHJlZS1jaGlsZHJlbi1uby1wYWRkaW5nXT1cIm5vZGUub3B0aW9ucy5sZXZlbFBhZGRpbmdcIlxuICAgICAgICAqdHJlZUFuaW1hdGVPcGVuPVwiXG4gICAgICAgICAgbm9kZS5pc0V4cGFuZGVkO1xuICAgICAgICAgIHNwZWVkOiBub2RlLm9wdGlvbnMuYW5pbWF0ZVNwZWVkO1xuICAgICAgICAgIGFjY2VsZXJhdGlvbjogbm9kZS5vcHRpb25zLmFuaW1hdGVBY2NlbGVyYXRpb247XG4gICAgICAgICAgZW5hYmxlZDogbm9kZS5vcHRpb25zLmFuaW1hdGVFeHBhbmRcbiAgICAgICAgXCJcbiAgICAgID5cbiAgICAgICAgPHRyZWUtbm9kZS1jb2xsZWN0aW9uXG4gICAgICAgICAgKm5nSWY9XCJub2RlLmNoaWxkcmVuXCJcbiAgICAgICAgICBbbm9kZXNdPVwibm9kZS5jaGlsZHJlblwiXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIlxuICAgICAgICAgIFt0cmVlTW9kZWxdPVwibm9kZS50cmVlTW9kZWxcIlxuICAgICAgICA+XG4gICAgICAgIDwvdHJlZS1ub2RlLWNvbGxlY3Rpb24+XG4gICAgICAgIDx0cmVlLWxvYWRpbmctY29tcG9uZW50XG4gICAgICAgICAgW3N0eWxlLnBhZGRpbmctbGVmdF09XCJub2RlLmdldE5vZGVQYWRkaW5nKClcIlxuICAgICAgICAgIGNsYXNzPVwidHJlZS1ub2RlLWxvYWRpbmdcIlxuICAgICAgICAgICpuZ0lmPVwiIW5vZGUuY2hpbGRyZW5cIlxuICAgICAgICAgIFt0ZW1wbGF0ZV09XCJ0ZW1wbGF0ZXMubG9hZGluZ1RlbXBsYXRlXCJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgPjwvdHJlZS1sb2FkaW5nLWNvbXBvbmVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQge1xuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbiAgQElucHV0KCkgdGVtcGxhdGVzOiBhbnk7XG59XG4iXX0=