import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../mobx-angular/tree-mobx-autorun.directive";
import * as i2 from "@angular/common";
export class TreeNodeExpanderComponent {
}
/** @nocollapse */ TreeNodeExpanderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeExpanderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeExpanderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TreeNodeExpanderComponent, selector: "tree-node-expander", inputs: { node: "node" }, ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <span
        *ngIf="node.hasChildren"
        [class.toggle-children-wrapper-expanded]="node.isExpanded"
        [class.toggle-children-wrapper-collapsed]="node.isCollapsed"
        class="toggle-children-wrapper"
        (click)="node.mouseAction('expanderClick', $event)"
      >
        <span class="toggle-children"></span>
      </span>
      <span *ngIf="!node.hasChildren" class="toggle-children-placeholder">
      </span>
    </ng-container>
  `, isInline: true, directives: [{ type: i1.TreeMobxAutorunDirective, selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeExpanderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tree-node-expander',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <span
        *ngIf="node.hasChildren"
        [class.toggle-children-wrapper-expanded]="node.isExpanded"
        [class.toggle-children-wrapper-collapsed]="node.isCollapsed"
        class="toggle-children-wrapper"
        (click)="node.mouseAction('expanderClick', $event)"
      >
        <span class="toggle-children"></span>
      </span>
      <span *ngIf="!node.hasChildren" class="toggle-children-placeholder">
      </span>
    </ng-container>
  `
                }]
        }], propDecorators: { node: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWV4cGFuZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1leHBhbmRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUF1QnBFLE1BQU0sT0FBTyx5QkFBeUI7OzBJQUF6Qix5QkFBeUI7OEhBQXpCLHlCQUF5QixvRkFoQjFCOzs7Ozs7Ozs7Ozs7OztHQWNUOzRGQUVVLHlCQUF5QjtrQkFwQnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtpQkFDRjs4QkFFVSxJQUFJO3NCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLWV4cGFuZGVyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICp0cmVlTW9ieEF1dG9ydW49XCJ7IGRvbnREZXRhY2g6IHRydWUgfVwiPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCJub2RlLmhhc0NoaWxkcmVuXCJcbiAgICAgICAgW2NsYXNzLnRvZ2dsZS1jaGlsZHJlbi13cmFwcGVyLWV4cGFuZGVkXT1cIm5vZGUuaXNFeHBhbmRlZFwiXG4gICAgICAgIFtjbGFzcy50b2dnbGUtY2hpbGRyZW4td3JhcHBlci1jb2xsYXBzZWRdPVwibm9kZS5pc0NvbGxhcHNlZFwiXG4gICAgICAgIGNsYXNzPVwidG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXJcIlxuICAgICAgICAoY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignZXhwYW5kZXJDbGljaycsICRldmVudClcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlblwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwiIW5vZGUuaGFzQ2hpbGRyZW5cIiBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlbi1wbGFjZWhvbGRlclwiPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbn1cbiJdfQ==