import { Component } from '@angular/core';

@Component({
  selector: 'app-templates',
  template: `
    <tree-root id="tree1" [focused]="true" [nodes]="nodes1" [options]="options">
      <template #treeNodeTemplate let-node let-index="index">
        <span [class]="node.data.className + 'Index'">{{ index }}</span>
        <span [class]="node.data.className" [class.title]="true">{{ node.data.title }}</span>
      </template>
      <template #loadingTemplate let-node>
        <div [class]="node.data.className + 'Loading'">Loading {{ node.data.title }}...</div>
      </template>
    </tree-root>

    <tree-root id="tree2" [focused]="true" [nodes]="nodes2">
      <template #treeNodeFullTemplate let-node let-index="index">
        <div
          [class.tree-node]="true"
          [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
          [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
          [class.tree-node-leaf]="node.isLeaf"
          [class.tree-node-active]="node.isActive"
          [class.tree-node-focused]="node.isFocused">

          <input type="checkbox" [checked]="node.isActive" (change)="node.toggleActivated()" />
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper" (click)="node.mouseAction('click', $event)">
            <span [class]="node.data.className + 'Index'">{{ index }}</span>
            <span [class]="node.data.className" [class.title]="true">{{ node.data.title }}</span>
          </div>
          <tree-node-children [node]="node" [templates]="templates"></tree-node-children>
        </div>
      </template>
    </tree-root>
  `,
  styles: []
})
export class TemplatesComponent {
  nodes1 = [
    {
      title: 'root1',
      className: 'root1Class'
    },
    {
      title: 'root2',
      className: 'root2Class',
      hasChildren: true
    }
  ];

  nodes2 = [
    {
      title: 'root1',
      className: 'root1Class'
    },
    {
      title: 'root2',
      className: 'root2Class'
    }
  ];

  options = {
    getChildren: () => new Promise((resolve, reject) => {})
  };
}
