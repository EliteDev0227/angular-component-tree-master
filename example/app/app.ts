import { Component } from 'angular2/core';
import { TreeComponent } from '../../lib/components/tree.component';

@Component({
    selector: 'app',
    directives: [TreeComponent],
    template: `
    <Tree [nodes]="nodes"></Tree>
  `
})
export class App {
    nodes = [
        {
            name: 'root1',
            children: [
                {
                    name: 'root1.child1'
                }, {
                    name: 'root1.child2'
                }
            ]
        }, {
            name: 'root2',
            children: [{
                name: 'root2.child1'
            }, {
                    name: 'root2.child2'
                }]
        }
    ];
    constructor() {

    }
}
