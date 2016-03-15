import { Component } from 'angular2/core';
import { TreeComponent } from '../../lib/ng2tree';

const CUSTOM_TEMPLATE_STRING = '{{ node.name }} ({{ node.subTitle }})';

@Component({
    selector: 'app',
    directives: [TreeComponent],
    template: `
    <p>default options:</p>
    <Tree [nodes]="nodes"></Tree>

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
    <Tree [nodes]="nodes" (onToggle)="onToggle($event)"></Tree>
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
        }
    ];

    customNameFieldOptions = { displayField: 'subTitle' };
    customTemplateOptions = { treeNodeTemplate: MyTreeNodeTemplate };
    customTemplateStringOptions = { treeNodeTemplate: CUSTOM_TEMPLATE_STRING }
    onToggle = ($event) => console.log($event);
}

@Component({
    template: CUSTOM_TEMPLATE_STRING
})
class MyTreeNodeTemplate {
}
