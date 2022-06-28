import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../mobx-angular/tree-mobx-autorun.directive";
export class TreeNodeCheckboxComponent {
}
/** @nocollapse */ TreeNodeCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TreeNodeCheckboxComponent, selector: "tree-node-checkbox", inputs: { node: "node" }, ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <input
        class="tree-node-checkbox"
        type="checkbox"
        (click)="node.mouseAction('checkboxClick', $event)"
        [checked]="node.isSelected"
        [indeterminate]="node.isPartiallySelected"
      />
    </ng-container>
  `, isInline: true, directives: [{ type: i1.TreeMobxAutorunDirective, selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeCheckboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tree-node-checkbox',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <input
        class="tree-node-checkbox"
        type="checkbox"
        (click)="node.mouseAction('checkboxClick', $event)"
        [checked]="node.isSelected"
        [indeterminate]="node.isPartiallySelected"
      />
    </ng-container>
  `
                }]
        }], propDecorators: { node: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNoZWNrYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQW1CcEUsTUFBTSxPQUFPLHlCQUF5Qjs7MElBQXpCLHlCQUF5Qjs4SEFBekIseUJBQXlCLG9GQVoxQjs7Ozs7Ozs7OztHQVVUOzRGQUVVLHlCQUF5QjtrQkFoQnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO2lCQUNGOzhCQUVVLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtY2hlY2tib3gnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgY2xhc3M9XCJ0cmVlLW5vZGUtY2hlY2tib3hcIlxuICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAoY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignY2hlY2tib3hDbGljaycsICRldmVudClcIlxuICAgICAgICBbY2hlY2tlZF09XCJub2RlLmlzU2VsZWN0ZWRcIlxuICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJub2RlLmlzUGFydGlhbGx5U2VsZWN0ZWRcIlxuICAgICAgLz5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50IHtcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG59XG4iXX0=