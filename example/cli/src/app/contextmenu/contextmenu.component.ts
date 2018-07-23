import { Component, HostListener } from '@angular/core';
import { ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';

@Component({
  selector: 'app-contextmenu',
  template: `
    <tree-root [focused]="true" [options]="options" [nodes]="nodes"></tree-root>
    <div class="menu" *ngIf="contextMenu" [style.left.px]="contextMenu.x" [style.top.px]="contextMenu.y">
      <div>Menu for {{ contextMenu.node.data.name }}</div>
      <hr>
      <ul>
        <li><a (click)="closeMenu()">Copy</a></li>
        <li><a (click)="closeMenu()">Paste</a></li>
        <li><a (click)="closeMenu()">Cut</a></li>
      </ul>
    </div>
    <br>
    <p>Keys:</p>
    down | up | left | right | space | enter
  `,
  styles: [
    `.menu {
      position: absolute;
      background: rgba(255, 255, 255, 0.9);
      padding: 7px;
      border-radius: 5px;
      box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);
    }`,
    `ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }`,
    `li {
      padding: 7px;
      border-radius: 3px;
      cursor: pointer;
    }`,
    `li:hover {
      background-color: aliceblue;
    }`,
  ]
})
export class ContextmenuComponent {
  contextMenu = null;
  nodes = [
    {
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'root2',
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [
          {name: 'grandchild2.2.1'}
        ] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];

  options: ITreeOptions = {
    actionMapping: {
      mouse: {
        contextMenu: (treeModel, treeNode, e) => {
          e.preventDefault();
          if (this.contextMenu && treeNode === this.contextMenu.node) {
            return this.closeMenu();
          }
          this.contextMenu = {
            node: treeNode,
            x: e.pageX,
            y: e.pageY
          };
        },
        click: (treeModel, treeNode, e) => {
          this.closeMenu();
          TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e);
        }
      }
    }
  };

  closeMenu = () => {
    this.contextMenu = null;
  }
}
