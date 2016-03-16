import { Component } from 'angular2/core';
import { TreeComponent } from '../../lib/ng2tree';

const CUSTOM_TEMPLATE_STRING = '{{ node.name }} ({{ node.subTitle }})';

@Component({
    selector: 'app',
    directives: [TreeComponent],
    template: `
    <p>default options:</p>
    <Tree [nodes]="nodes" [focused]="true"></Tree>

    <br>
    <p>custom name field:</p>
    <Tree [nodes]="nodes" [options]="customNameFieldOptions"></Tree>

    <br>
    <p>custom template:</p>
    <Tree [nodes]="nodes" [options]="customTemplateOptions"></Tree>

    <br>
    <p>custom template string:</p>
    <Tree [nodes]="nodes" [options]="customTemplateStringOptions"></Tree>

    <br>
    <p>events:</p>
    <Tree [nodes]="nodes"
        (onToggle)="onEvent($event)"
        (onActiveChanged)="onEvent($event)"
        (onFocus)="onEvent($event)"
        (onBlur)="onEvent($event)"></Tree>
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
