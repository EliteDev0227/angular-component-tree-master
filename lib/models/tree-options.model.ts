const _ = require('lodash');

export interface ITreeOptions {
  childrenField: string;
  displayField: string;
  treeNodeTemplate: any;
}

export class TreeOptions implements ITreeOptions {
  childrenField:string = 'children';
  displayField:string = 'name';
  treeNodeTemplate:any = '{{ node.displayField }}';
  constructor(options = {}) {
    _.extend(this, options);
  }
}
