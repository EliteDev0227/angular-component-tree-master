import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter } from 'angular2/core';
import { TreeNodeComponent } from './tree-node.component';
import { TreeModel } from '../models/tree.model';
import { ITreeOptions } from '../models/tree-defs.model';
import { KEYS } from '../constants/keys';

const _ = require('lodash');

@Component({
  selector: 'Tree',
  directives: [TreeNodeComponent],
  host: {
    '(body: keydown)': "onKeydown($event)",
    '(body: mousedown)': "onMousedown($event)"
  },
  providers: [TreeModel],
  styles: [
    '.tree-children { padding-left: 20px }'
  ],
  template: `
    <button (click)="treeModel.focusNextNode()">next node</button>
    <button (click)="treeModel.focusPreviousNode()">previous node</button>
    <button (click)="treeModel.focusDrillDown()">drill down</button>
    <button (click)="treeModel.focusDrillUp()">drill up</button>
    <TreeNode
      (click)="treeModel.setFocus(true)"
      *ngFor="#node of treeModel.roots"
      [node]="node">
    </TreeNode>
  `
})
export class TreeComponent implements OnChanges {
  constructor(public treeModel:TreeModel) {
    treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
  }

  // delegating to TreeModel service:
  _nodes:any[];
  @Input() set nodes(nodes:any[]) { };
  _options:ITreeOptions;
  @Input() set options(options:ITreeOptions) { };

  @Input() set focused(value) {
    this.treeModel.setFocus(value);
  }

  @Output() onToggle;
  @Output() onActiveChanged;
  @Output() onActivate;
  @Output() onDeactivate;
  @Output() onFocus;
  @Output() onBlur;

  onKeydown($event) {
    let focusedNode = this.treeModel.focusedNode;
    if (this.treeModel.isFocused) {
      switch ($event.keyCode) {
        case KEYS.DOWN:
          return this.treeModel.focusNextNode();
        case KEYS.UP:
          return this.treeModel.focusPreviousNode();
        case KEYS.LEFT:
          if (focusedNode.isExpanded) {
            focusedNode.toggle();
          }
          else {
            this.treeModel.focusDrillUp();
          }
          return;
        case KEYS.RIGHT:
          if (focusedNode.isCollapsed) {
            focusedNode.toggle();
          }
          else {
            this.treeModel.focusDrillDown();
          }
          return;
        case KEYS.ENTER:
        case KEYS.SPACE:
          return focusedNode && focusedNode.toggleActivated();
      }
    }
  }

  onMousedown($event) {
    let insideClick = $event.target.closest('Tree');
    if (!insideClick) {
      this.treeModel.setFocus(false);
    }
  }

  ngOnChanges(changes) {
    this.treeModel.setData({
      options: changes.options && changes.options.currentValue,
      nodes: changes.nodes && changes.nodes.currentValue,
      events: _.pick(this, this.treeModel.eventNames)
    });
  }
}
