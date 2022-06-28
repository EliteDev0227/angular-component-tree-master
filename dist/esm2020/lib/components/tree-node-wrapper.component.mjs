import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./tree-node-checkbox.component";
import * as i2 from "./tree-node-expander.component";
import * as i3 from "./tree-node-content.component";
import * as i4 from "@angular/common";
import * as i5 from "../directives/tree-drag.directive";
import * as i6 from "../directives/tree-drop.directive";
export class TreeNodeWrapperComponent {
}
/** @nocollapse */ TreeNodeWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeNodeWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TreeNodeWrapperComponent, selector: "tree-node-wrapper", inputs: { node: "node", index: "index", templates: "templates" }, ngImport: i0, template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper"
               [class.node-content-wrapper-active]="node.isActive"
               [class.node-content-wrapper-focused]="node.isFocused"
               (click)="node.mouseAction('click', $event)"
               (dblclick)="node.mouseAction('dblClick', $event)"
               (mouseover)="node.mouseAction('mouseOver', $event)"
               (mouseout)="node.mouseAction('mouseOut', $event)"
               (contextmenu)="node.mouseAction('contextMenu', $event)"
               (treeDrop)="node.onDrop($event)"
               (treeDropDragOver)="node.mouseAction('dragOver', $event)"
               (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
               (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
               [treeAllowDrop]="node.allowDrop"
               [allowDragoverStyling]="node.allowDragoverStyling()"
               [treeDrag]="node"
               [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
          </div>
      </div>
      <ng-container
              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </ng-container>
  `, isInline: true, components: [{ type: i1.TreeNodeCheckboxComponent, selector: "tree-node-checkbox", inputs: ["node"] }, { type: i2.TreeNodeExpanderComponent, selector: "tree-node-expander", inputs: ["node"] }, { type: i3.TreeNodeContent, selector: "tree-node-content", inputs: ["node", "index", "template"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.TreeDragDirective, selector: "[treeDrag]", inputs: ["treeDrag", "treeDragEnabled"] }, { type: i6.TreeDropDirective, selector: "[treeDrop]", inputs: ["allowDragoverStyling", "treeAllowDrop"], outputs: ["treeDrop", "treeDropDragOver", "treeDropDragLeave", "treeDropDragEnter"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeNodeWrapperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tree-node-wrapper',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper"
               [class.node-content-wrapper-active]="node.isActive"
               [class.node-content-wrapper-focused]="node.isFocused"
               (click)="node.mouseAction('click', $event)"
               (dblclick)="node.mouseAction('dblClick', $event)"
               (mouseover)="node.mouseAction('mouseOver', $event)"
               (mouseout)="node.mouseAction('mouseOut', $event)"
               (contextmenu)="node.mouseAction('contextMenu', $event)"
               (treeDrop)="node.onDrop($event)"
               (treeDropDragOver)="node.mouseAction('dragOver', $event)"
               (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
               (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
               [treeAllowDrop]="node.allowDrop"
               [allowDragoverStyling]="node.allowDragoverStyling()"
               [treeDrag]="node"
               [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
          </div>
      </div>
      <ng-container
              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </ng-container>
  `
                }]
        }], propDecorators: { node: [{
                type: Input
            }], index: [{
                type: Input
            }], templates: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUcsS0FBSyxFQUFHLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQXVDdEUsTUFBTSxPQUFPLHdCQUF3Qjs7eUlBQXhCLHdCQUF3Qjs2SEFBeEIsd0JBQXdCLDJIQWhDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUOzRGQUdVLHdCQUF3QjtrQkFwQ3BDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7aUJBQ0Y7OEJBSVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50ICwgSW5wdXQgLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLXdyYXBwZXInICxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSAsXG4gIHN0eWxlczogW10gLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiAqbmdJZj1cIiF0ZW1wbGF0ZXMudHJlZU5vZGVXcmFwcGVyVGVtcGxhdGVcIiBjbGFzcz1cIm5vZGUtd3JhcHBlclwiIFtzdHlsZS5wYWRkaW5nLWxlZnRdPVwibm9kZS5nZXROb2RlUGFkZGluZygpXCI+XG4gICAgICAgICAgPHRyZWUtbm9kZS1jaGVja2JveCAqbmdJZj1cIm5vZGUub3B0aW9ucy51c2VDaGVja2JveFwiIFtub2RlXT1cIm5vZGVcIj48L3RyZWUtbm9kZS1jaGVja2JveD5cbiAgICAgICAgICA8dHJlZS1ub2RlLWV4cGFuZGVyIFtub2RlXT1cIm5vZGVcIj48L3RyZWUtbm9kZS1leHBhbmRlcj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm9kZS1jb250ZW50LXdyYXBwZXJcIlxuICAgICAgICAgICAgICAgW2NsYXNzLm5vZGUtY29udGVudC13cmFwcGVyLWFjdGl2ZV09XCJub2RlLmlzQWN0aXZlXCJcbiAgICAgICAgICAgICAgIFtjbGFzcy5ub2RlLWNvbnRlbnQtd3JhcHBlci1mb2N1c2VkXT1cIm5vZGUuaXNGb2N1c2VkXCJcbiAgICAgICAgICAgICAgIChjbGljayk9XCJub2RlLm1vdXNlQWN0aW9uKCdjbGljaycsICRldmVudClcIlxuICAgICAgICAgICAgICAgKGRibGNsaWNrKT1cIm5vZGUubW91c2VBY3Rpb24oJ2RibENsaWNrJywgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAobW91c2VvdmVyKT1cIm5vZGUubW91c2VBY3Rpb24oJ21vdXNlT3ZlcicsICRldmVudClcIlxuICAgICAgICAgICAgICAgKG1vdXNlb3V0KT1cIm5vZGUubW91c2VBY3Rpb24oJ21vdXNlT3V0JywgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAoY29udGV4dG1lbnUpPVwibm9kZS5tb3VzZUFjdGlvbignY29udGV4dE1lbnUnLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICh0cmVlRHJvcCk9XCJub2RlLm9uRHJvcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICh0cmVlRHJvcERyYWdPdmVyKT1cIm5vZGUubW91c2VBY3Rpb24oJ2RyYWdPdmVyJywgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAodHJlZURyb3BEcmFnTGVhdmUpPVwibm9kZS5tb3VzZUFjdGlvbignZHJhZ0xlYXZlJywgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAodHJlZURyb3BEcmFnRW50ZXIpPVwibm9kZS5tb3VzZUFjdGlvbignZHJhZ0VudGVyJywgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICBbdHJlZUFsbG93RHJvcF09XCJub2RlLmFsbG93RHJvcFwiXG4gICAgICAgICAgICAgICBbYWxsb3dEcmFnb3ZlclN0eWxpbmddPVwibm9kZS5hbGxvd0RyYWdvdmVyU3R5bGluZygpXCJcbiAgICAgICAgICAgICAgIFt0cmVlRHJhZ109XCJub2RlXCJcbiAgICAgICAgICAgICAgIFt0cmVlRHJhZ0VuYWJsZWRdPVwibm9kZS5hbGxvd0RyYWcoKVwiPlxuXG4gICAgICAgICAgICAgIDx0cmVlLW5vZGUtY29udGVudCBbbm9kZV09XCJub2RlXCIgW2luZGV4XT1cImluZGV4XCIgW3RlbXBsYXRlXT1cInRlbXBsYXRlcy50cmVlTm9kZVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgIDwvdHJlZS1ub2RlLWNvbnRlbnQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVzLnRyZWVOb2RlV3JhcHBlclRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlLCBub2RlOiBub2RlLCBpbmRleDogaW5kZXgsIHRlbXBsYXRlczogdGVtcGxhdGVzIH1cIj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgdGVtcGxhdGVzOiBhbnk7XG5cbn1cbiJdfQ==