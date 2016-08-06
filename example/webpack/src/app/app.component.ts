import { Component, Input } from '@angular/core';
import { TreeComponent, TreeNode } from 'angular2-tree-component';

const CUSTOM_TEMPLATE_STRING = `
  <span title="{{node.data.subTitle}}">{{ node.data.name }}</span> {{ childrenCount() }}`;

const CUSTOM_TEMPLATE_STRING_WITH_CONTEXT = `{{ node.data.name }} {{ childrenCount() }}
  <button (click)="context.go($event)">Custom Action</button>`;

@Component({
  selector: 'app',
  directives: [TreeComponent],
  styles: [
    `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
  ],
  template: `<Tree
    #tree
    [nodes]="nodes"
    [focused]="true"
    [options]="customTemplateStringOptions"
    (onToggle)="onEvent($event)"
    (onActivate)="onEvent($event)"
    (onDeactivate)="onEvent($event)"
    (onActiveChanged)="onEvent($event)"
    (onFocus)="onEvent($event)"
    (onBlur)="onEvent($event)"
  ></Tree>
  <br>
  <p>Keys:</p>
  down | up | left | right | space | enter
  <p>API:</p>
  <button (click)="tree.treeModel.focusNextNode()">next node</button>
  <button (click)="tree.treeModel.focusPreviousNode()">previous node</button>
  <button (click)="tree.treeModel.focusDrillDown()">drill down</button>
  <button (click)="tree.treeModel.focusDrillUp()">drill up</button>
  <p></p>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleActivated()">
    {{ tree.treeModel.getFocusedNode()?.isActive ? 'deactivate' : 'activate' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleExpanded()">
    {{ tree.treeModel.getFocusedNode()?.isExpanded ? 'collapse' : 'expand' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().blur()">
    blur
  </button>
  <button
    (click)="addNode(tree)">
    Add Node
  </button>`
})
export class App {
  nodes:any[] = [
    {
      id: uuid(),
      expanded: true,
      name: 'root expanded',
      subTitle: 'the root',
      children: [
        {
          id: uuid(),
          name: 'child1',
          subTitle: 'a good child',
          hasChildren: false
        }, {
          id: uuid(),
          name: 'child2',
          subTitle: 'a bad child',
          hasChildren: false
        }
      ]
    },
    {
      id: uuid(),
      name: 'root2',
      subTitle: 'the second root',
      children: [
        {
          id: uuid(),
          name: 'child2.1',
          subTitle: 'new and improved',
          hasChildren: false
        }, {
          id: uuid(),
          name: 'child2.2',
          subTitle: 'new and improved2',
          children: [
            {
              id: uuid(),
              name: 'subsub',
              subTitle: 'subsub',
              hasChildren: false
            }
          ]
        }
      ]
    },
    {
      id: uuid(),
      name: 'asyncroot',
      hasChildren: true
    }
  ];

  asyncChildren = [
    {
      name: 'child2.1',
      subTitle: 'new and improved'
    }, {
      name: 'child2.2',
      subTitle: 'new and improved2'
    }
  ];

  getChildren(node:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5,
          id: uuid()
        });
      })), 1000);
    });
  }

  addNode(tree) {
    this.nodes[0].children.push({
      id: uuid(),
      name: 'a new child'
    });
    tree.treeModel.update();
  }

  customTemplateStringOptions = {
    // treeNodeTemplate: CUSTOM_TEMPLATE_STRING,
    treeNodeTemplate: MyTreeNodeTemplate,
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    loadingComponent: MyTreeLoadingTemplate,
    getChildren: this.getChildren.bind(this),
    context: this
  }
  onEvent = ($event:any) => console.log($event);

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component')
  }
}

@Component({
  template: CUSTOM_TEMPLATE_STRING
})
class MyTreeNodeTemplate {
  @Input() node:TreeNode;

  childrenCount() {
    return this.node.children ? `(${this.node.children.length})` : '';
  }
}

@Component({
  template: 'Loading, please hold....'
})
class MyTreeLoadingTemplate {
}

let id = 0;
function uuid() {
  id = id + 1;
  return id;
}
