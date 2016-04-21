import { Component } from 'angular2/core';
import { TreeComponent } from '../../lib/angular2-tree';
const uuid = require('uuid').v4;

const CUSTOM_TEMPLATE_STRING = '{{ node.data.name }}';

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
    template: `
    <Tree
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
      [disabled]="!tree.treeModel.focusedNode"
      (click)="tree.treeModel.focusedNode.toggleActivated()">
      {{ tree.treeModel.focusedNode?.isActive ? 'deactivate' : 'activate' }}
    </button>
    <button
      [disabled]="!tree.treeModel.focusedNode"
      (click)="tree.treeModel.focusedNode.toggle()">
      {{ tree.treeModel.focusedNode?.isExpanded ? 'collapse' : 'expand' }}
    </button>
    <button
      [disabled]="!tree.treeModel.focusedNode"
      (click)="tree.treeModel.focusedNode.blur()">
      blur
    </button>

  `
})
export class App {
    nodes = [
        {
          id: uuid(),
          name: 'root1',
          subTitle: 'the root',
          children: [
            {
              id: uuid(),
              name: 'child1',
              subTitle: 'a good child'
            }, {
              id: uuid(), 
              name: 'child2',
              subTitle: 'a bad child',
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
              subTitle: 'new and improved'
            }, {
              id: uuid(), 
              name: 'child2.2',
              subTitle: 'new and improved2',
              children: [
                {
                  id: uuid(), 
                  name: 'subsub',
                      subTitle: 'subsub'
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

    getChildren(node) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(this.asyncChildren.map((c) => {
          return Object.assign(c, {
            hasChildren: node.level < 5,
            id: uuid()
          });
        })), 1000);
      });
    }

    // customNameFieldOptions = { displayField: 'subTitle' };
    // customTemplateOptions = { treeNodeTemplate: MyTreeNodeTemplate };
    customTemplateStringOptions = {
      treeNodeTemplate: CUSTOM_TEMPLATE_STRING,
      getChildren: this.getChildren.bind(this)
    }
    onEvent = ($event) => console.log($event);
}

@Component({
    template: CUSTOM_TEMPLATE_STRING
})
class MyTreeNodeTemplate {
}
