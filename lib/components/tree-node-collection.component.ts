import {
  Component, Input, ViewEncapsulation, OnInit, OnDestroy, ElementRef
} from '@angular/core';
import { reaction, autorun } from 'mobx';
import { observable, computed } from 'ng2-mobx';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TreeNode } from '../models/tree-node.model';
import { deprecatedSelector } from '../deprecated-selector';

import * as _ from 'lodash';

@Component({
  selector: 'tree-node-collection, TreeNodeCollection',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div *mobxAutorun>
      <div
        [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: index"
          [node]="node"
          [index]="i"
          [templates]="templates">
        </tree-node>
      </div>
    </div>
  `
})
export class TreeNodeCollectionComponent implements OnInit, OnDestroy {
  @Input()
  get nodes() { return this._nodes; }
  set nodes(nodes) { this._nodes = nodes; }

  @observable _nodes;

  @Input() templates;

  @observable viewportNodes: TreeNode[];
  @computed get marginTop(): string {
    const firstNode = this.viewportNodes && this.viewportNodes[0];
    const relativePosition = firstNode ? firstNode.position - firstNode.parent.position - firstNode.parent.getSelfHeight() : 0;

    return `${relativePosition}px`;
  }

  _dispose = [];

  constructor(private virtualScroll: TreeVirtualScroll, private elementRef: ElementRef) {
    deprecatedSelector('TreeNodeCollection', 'tree-node-collection', elementRef);
  }

  ngOnInit() {
    this._dispose = [
      // return node indexes so we can compare structurally,
      reaction(() => {
        return this.virtualScroll.getViewportNodes(this.nodes).map(n => n.index);
      }, (nodeIndexes) => {
          this.viewportNodes = nodeIndexes.map((i) => this.nodes[i]);
        }, { compareStructural: true, fireImmediately: true }
      ),
      reaction(() => this.nodes, (nodes) => {
        this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
      })
    ];
  }

  ngOnDestroy() {
    this._dispose.forEach(d => d());
  }
}
