import { Component } from 'angular2/core';
import { TreeComponent } from '../../lib/ng2tree';

const CUSTOM_TEMPLATE_STRING = '{{ node.name }} ({{ node.subTitle }})';

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
            name: 'root1',
            subTitle: 'the root',
            children: [
                {
                    name: 'child1',
                    subTitle: 'a good child'
                }, {
                    name: 'child2',
                    subTitle: 'a bad child',
                }
            ]
        },
        {
          name: 'root2',
          subTitle: 'the second root',
          children: [
            {
              name: 'child2.1',
              subTitle: 'new and improved'
            }, {
              name: 'child2.2',
              subTitle: 'new and improved2',
              children: [
                  {
                      name: 'subsub',
                      subTitle: 'subsub'
                  }
              ]
            }
          ]
        }
    ];

    customNameFieldOptions = { displayField: 'subTitle' };
    customTemplateOptions = { treeNodeTemplate: MyTreeNodeTemplate };
    customTemplateStringOptions = { treeNodeTemplate: CUSTOM_TEMPLATE_STRING }
    onEvent = ($event) => console.log($event);
}

@Component({
    template: CUSTOM_TEMPLATE_STRING
})
class MyTreeNodeTemplate {
}
