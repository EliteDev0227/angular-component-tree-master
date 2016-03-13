import { Component, Input, OnChanges, SimpleChange } from 'angular2/core';
import { TreeNodeComponent } from './tree-node.component';
import { TreeModel } from '../models/tree.model';
import { ITreeOptions } from '../models/tree-defs.model';

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
  }

  // delegating to TreeModel service:
  _nodes:any[];
  @Input() set nodes(nodes:any[]) { };
  _options:ITreeOptions;
  @Input() set options(options:ITreeOptions) { };

  ngOnChanges(changes) {
    this.treeModel.setData({
      options: changes.options && changes.options.currentValue,
      nodes: changes.nodes && changes.nodes.currentValue
    });
  }
}
