import { Component, Input, Output, EventEmitter, DynamicComponentLoader, QueryList, Query, ElementRef, AfterViewInit } from 'angular2/core';
import { TreeNode, ITreeOptions } from '../models/tree.model';

@Component({
  selector: 'TreeNode',
  directives: [TreeNodeComponent],
  styles: [
    '.tree-children { padding-left: 50px }'
  ],
  template: `
    <div class="tree-node" [class.expanded]="node.expanded">
      <button *ngIf="node.hasChildren" class="toggle-children" (click)="node.toggle()">*</button>
      <span #treeNodeContent></span>
      <div class="tree-children" [hidden]="node.collapsed">
        <TreeNode
          *ngFor="#node of children"
          [node]="node"
          [options]="options">
        </TreeNode>
      </div>
    </div>
  `
})

export class TreeNodeComponent implements AfterViewInit {
  @Input() node:TreeNode;

  @Input() options: ITreeOptions;
  @Output() onToggle = new EventEmitter();

  private get children() { return this.node[this.options.childrenField] }

  constructor(private componentLoader: DynamicComponentLoader, private elementRef: ElementRef) {
  }

  getTreeNodeTemplate() {
      let treeNodeTemplate = this.options.treeNodeTemplate;
      if (typeof treeNodeTemplate === 'string') {
          @Component({
              selector: 'TreeNodeTemplate',
              template: treeNodeTemplate
          })
          class AdHocTreeNodeTemplateComponent {
              node: TreeNode;
              options: ITreeOptions;
          }
          return AdHocTreeNodeTemplateComponent;
      }
      else return treeNodeTemplate;
  }

  loadTreeNodeContent(treeNodeTemplateComponent) {
    this.componentLoader.loadIntoLocation(treeNodeTemplateComponent,
                                          this.elementRef,
                                          'treeNodeContent')
      .then((componentRef) => {
        componentRef.instance.node = this.node;
        componentRef.instance.options = this.options;
      });
  }

  ngAfterViewInit() {
      this.loadTreeNodeContent(this.getTreeNodeTemplate());
  }
}
