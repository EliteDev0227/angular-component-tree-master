import { Component, Input } from 'angular2/core';
import { TreeNode, ITreeOptions } from '../models/tree.model';

export interface ITreeNodeTemplateComponent {
  node: TreeNode
  options: ITreeOptions
}

@Component({
    selector: 'TreeNodeTemplate',
    template: '{{ nodeName }}'
})
export class TreeNodeTemplateComponent implements ITreeNodeTemplateComponent {
  @Input() node:TreeNode;
  @Input() options: ITreeOptions;
  private get nodeName() { return this.node[this.options.nameField] }
}
