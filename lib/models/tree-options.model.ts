import { ITreeOptions } from '../defs/api';
const _ = require('lodash');

export class TreeOptions implements ITreeOptions {
  childrenField:string = 'children';
  displayField:string = 'name';
  treeNodeTemplate:any = '{{ node.displayField }}';
  constructor(options = {}) {
    _.extend(this, options);
  }
}
