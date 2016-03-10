import { Component } from 'angular2/core';
import { TreeComponent } from '../../lib/components/tree.component';
import { ITreeNodeTemplateComponent } from '../../lib/components/tree-node-template.component';

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

    customNameFieldOptions = { nameField: 'subTitle' };
    customTemplateOptions = { treeNodeTemplate: MyTreeNodeTemplate };
    customTemplateStringOptions = { treeNodeTemplate: CUSTOM_TEMPLATE_STRING }
}

@Component({
    template: CUSTOM_TEMPLATE_STRING
})
class MyTreeNodeTemplate {
}
