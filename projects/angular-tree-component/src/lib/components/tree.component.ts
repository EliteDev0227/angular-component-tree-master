import { Component, ContentChild, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { ITreeOptions, TreeNode } from '../defs/api';
import { TreeViewportComponent } from './tree-viewport.component';
import {observable, computed, action, reaction} from 'mobx';
import {TreeVirtualScroll} from '../angular-tree-component.module';

@Component({
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
})
export class TreeComponent implements OnChanges {
  _nodes: any[];
  _options: TreeOptions;

  @ContentChild('loadingTemplate', { static: false }) loadingTemplate: TemplateRef<any>;
  @ContentChild('treeNodeTemplate', { static: false }) treeNodeTemplate: TemplateRef<any>;
  @ContentChild('treeNodeWrapperTemplate', { static: false }) treeNodeWrapperTemplate: TemplateRef<any>;
  @ContentChild('treeNodeFullTemplate', { static: false }) treeNodeFullTemplate: TemplateRef<any>;
  @ViewChild('viewport', { static: false }) viewportComponent: TreeViewportComponent;

  // Will be handled in ngOnChanges
  @Input() set nodes(nodes: any[]) {
  };

  @Input() set options(options: ITreeOptions) {
  };

  @Input() set focused(value: boolean) {
    this.treeModel.setFocus(value);
  }

  @Input() set state(state) {
    this.treeModel.setState(state);
  }

  @Output() toggleExpanded;
  @Output() activate;
  @Output() deactivate;
  @Output() nodeActivate;
  @Output() nodeDeactivate;
  @Output() select;
  @Output() deselect;
  @Output() focus;
  @Output() blur;
  @Output() updateData;
  @Output() initialized;
  @Output() moveNode;
  @Output() copyNode;
  @Output() loadNodeChildren;
  @Output() changeFilter;
  @Output() event;
  @Output() stateChange;

  constructor(
    public treeModel: TreeModel,
    public treeDraggedElement: TreeDraggedElement) {

    treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
    treeModel.subscribeToState((state) => this.stateChange.emit(state));
  }

  @HostListener('body: keydown', ['$event'])
  onKeydown($event) {
    if (!this.treeModel.isFocused) return;
    if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) return;

    const focusedNode = this.treeModel.getFocusedNode();

    this.treeModel.performKeyAction(focusedNode, $event);
  }

  @HostListener('body: mousedown', ['$event'])
  onMousedown($event) {
    function isOutsideClick(startElement: Element, nodeName: string) {
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

  private pick(object, keys) {
    return keys.reduce((obj, key) => {
      if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }
}



@Component({
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
})
export class TreeNodeComponent {
  @Input() node: TreeNode;
  @Input() index: number;
  @Input() templates: any;
}



@Component({
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
})
export class TreeNodeCollectionComponent implements OnInit, OnDestroy {
  @Input()
  get nodes() {
    return this._nodes;
  }
  set nodes(nodes) {
    this.setNodes(nodes);
  }

  @Input() treeModel: TreeModel;

  @observable _nodes;
  private virtualScroll: TreeVirtualScroll; // Cannot inject this, because we might be inside treeNodeTemplateFull
  @Input() templates;

  @observable viewportNodes: TreeNode[];

  @computed get marginTop(): string {
    const firstNode =
      this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
    const relativePosition =
      firstNode && firstNode.parent
        ? firstNode.position -
          firstNode.parent.position -
          firstNode.parent.getSelfHeight()
        : 0;

    return `${relativePosition}px`;
  }

  _dispose = [];

  @action setNodes(nodes) {
    this._nodes = nodes;
  }

  ngOnInit() {
    this.virtualScroll = this.treeModel.virtualScroll;
    this._dispose = [
      // return node indexes so we can compare structurally,
      reaction(
        () => {
          return this.virtualScroll
            .getViewportNodes(this.nodes)
            .map(n => n.index);
        },
        nodeIndexes => {
          this.viewportNodes = nodeIndexes.map(i => this.nodes[i]);
        },
        { compareStructural: true, fireImmediately: true } as any
      ),
      reaction(
        () => this.nodes,
        nodes => {
          this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
        }
      )
    ];
  }

  ngOnDestroy() {
    this._dispose.forEach(d => d());
  }

  trackNode(index, node) {
    return node.id;
  }
}



@Component({
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
})
export class TreeNodeChildrenComponent {
  @Input() node: TreeNode;
  @Input() templates: any;
}
