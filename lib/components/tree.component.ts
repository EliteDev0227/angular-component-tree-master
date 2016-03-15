import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter } from 'angular2/core';
import { TreeNodeComponent } from './tree-node.component';
import { TreeModel } from '../models/tree.model';
import { ITreeOptions } from '../models/tree-defs.model';
const _ = require('lodash');

@Component({
  selector: 'Tree',
  directives: [TreeNodeComponent],
  providers: [TreeModel],
  styles: [
    '.tree-children { padding-left: 20px }'
  ],
  template: `
    <TreeNode
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

  @Output() onToggle;
  @Output() onActiveChanged;
  @Output() onActivate;
  @Output() onDeactivate;

  ngOnChanges(changes) {
    this.treeModel.setData({
      options: changes.options && changes.options.currentValue,
      nodes: changes.nodes && changes.nodes.currentValue,
      events: _.pick(this, this.treeModel.eventNames)
    });
  }
}
