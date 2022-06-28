import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMobxAutorunDirective } from './mobx-angular/tree-mobx-autorun.directive';
import { TREE_ACTIONS } from './models/tree-options.model';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent, TreeNodeComponent, TreeNodeChildrenComponent, TreeNodeCollectionComponent } from './components/tree.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeWrapperComponent } from './components/tree-node-wrapper.component';
import { TreeViewportComponent } from './components/tree-viewport.component';
import { TreeNodeCheckboxComponent } from './components/tree-node-checkbox.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { TreeAnimateOpenDirective } from './directives/tree-animate-open.directive';
import * as i0 from "@angular/core";
export class TreeModule {
}
/** @nocollapse */ TreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ TreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeModule, declarations: [TreeComponent,
        TreeNodeComponent,
        TreeNodeContent,
        LoadingComponent,
        TreeDropDirective,
        TreeDragDirective,
        TreeNodeExpanderComponent,
        TreeNodeChildrenComponent,
        TreeNodeDropSlot,
        TreeNodeCollectionComponent,
        TreeViewportComponent,
        TreeNodeWrapperComponent,
        TreeNodeCheckboxComponent,
        TreeAnimateOpenDirective,
        TreeMobxAutorunDirective], imports: [CommonModule], exports: [TreeComponent,
        TreeNodeComponent,
        TreeNodeContent,
        LoadingComponent,
        TreeDropDirective,
        TreeDragDirective,
        TreeNodeExpanderComponent,
        TreeNodeChildrenComponent,
        TreeNodeDropSlot,
        TreeNodeCollectionComponent,
        TreeViewportComponent,
        TreeNodeWrapperComponent,
        TreeNodeCheckboxComponent,
        TreeAnimateOpenDirective,
        TreeMobxAutorunDirective] });
/** @nocollapse */ TreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeModule, providers: [], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        TreeComponent,
                        TreeNodeComponent,
                        TreeNodeContent,
                        LoadingComponent,
                        TreeDropDirective,
                        TreeDragDirective,
                        TreeNodeExpanderComponent,
                        TreeNodeChildrenComponent,
                        TreeNodeDropSlot,
                        TreeNodeCollectionComponent,
                        TreeViewportComponent,
                        TreeNodeWrapperComponent,
                        TreeNodeCheckboxComponent,
                        TreeAnimateOpenDirective,
                        TreeMobxAutorunDirective
                    ],
                    exports: [
                        TreeComponent,
                        TreeNodeComponent,
                        TreeNodeContent,
                        LoadingComponent,
                        TreeDropDirective,
                        TreeDragDirective,
                        TreeNodeExpanderComponent,
                        TreeNodeChildrenComponent,
                        TreeNodeDropSlot,
                        TreeNodeCollectionComponent,
                        TreeViewportComponent,
                        TreeNodeWrapperComponent,
                        TreeNodeCheckboxComponent,
                        TreeAnimateOpenDirective,
                        TreeMobxAutorunDirective
                    ],
                    imports: [CommonModule],
                    providers: []
                }]
        }] });
export { TreeModel, TreeNode, TreeDraggedElement, TreeVirtualScroll, TREE_ACTIONS, KEYS, LoadingComponent, TreeAnimateOpenDirective, TreeComponent, TreeNodeComponent, TreeNodeWrapperComponent, TreeNodeContent, TreeDropDirective, TreeDragDirective, TreeNodeExpanderComponent, TreeNodeChildrenComponent, TreeNodeDropSlot, TreeNodeCollectionComponent, TreeViewportComponent, TreeNodeCheckboxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10cmVlLWNvbXBvbmVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvYW5ndWxhci10cmVlLWNvbXBvbmVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFdEYsT0FBTyxFQUdMLFlBQVksRUFDYixNQUFNLDZCQUE2QixDQUFDO0FBT3JDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUseUJBQXlCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2SSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBd0NwRixNQUFNLE9BQU8sVUFBVTs7MkhBQVYsVUFBVTs0SEFBVixVQUFVLGlCQXBDbkIsYUFBYTtRQUNiLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6QixnQkFBZ0I7UUFDaEIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4Qix3QkFBd0IsYUFtQmhCLFlBQVksYUFoQnBCLGFBQWE7UUFDYixpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsZ0JBQWdCO1FBQ2hCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6Qix3QkFBd0I7UUFDeEIsd0JBQXdCOzRIQUtmLFVBQVUsYUFGVixFQUFFLFlBREosQ0FBQyxZQUFZLENBQUM7NEZBR1osVUFBVTtrQkF0Q3RCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLHlCQUF5Qjt3QkFDekIseUJBQXlCO3dCQUN6QixnQkFBZ0I7d0JBQ2hCLDJCQUEyQjt3QkFDM0IscUJBQXFCO3dCQUNyQix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsd0JBQXdCO3dCQUN4Qix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQix5QkFBeUI7d0JBQ3pCLHlCQUF5Qjt3QkFDekIsZ0JBQWdCO3dCQUNoQiwyQkFBMkI7d0JBQzNCLHFCQUFxQjt3QkFDckIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3FCQUN6QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxFQUFFO2lCQUNkOztBQUdELE9BQU8sRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixpQkFBaUIsRUFFakIsWUFBWSxFQUNaLElBQUksRUFLSixnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsZ0JBQWdCLEVBQ2hCLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIseUJBQXlCLEVBRTFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyZWVNb2J4QXV0b3J1bkRpcmVjdGl2ZSB9IGZyb20gJy4vbW9ieC1hbmd1bGFyL3RyZWUtbW9ieC1hdXRvcnVuLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7XG4gIElBY3Rpb25IYW5kbGVyLFxuICBJQWN0aW9uTWFwcGluZyxcbiAgVFJFRV9BQ1RJT05TXG59IGZyb20gJy4vbW9kZWxzL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQge1xuICBJQWxsb3dEcmFnRm4sXG4gIElBbGxvd0Ryb3BGbixcbiAgSVRyZWVPcHRpb25zLFxuICBJVHJlZVN0YXRlXG59IGZyb20gJy4vZGVmcy9hcGknO1xuaW1wb3J0IHsgS0VZUyB9IGZyb20gJy4vY29uc3RhbnRzL2tleXMnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuL21vZGVscy90cmVlLWRyYWdnZWQtZWxlbWVudC5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlVmlydHVhbFNjcm9sbCB9IGZyb20gJy4vbW9kZWxzL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xuaW1wb3J0IHsgTG9hZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlQ29tcG9uZW50LCBUcmVlTm9kZUNvbXBvbmVudCwgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCwgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlQ29udGVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVEcm9wU2xvdCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZUV4cGFuZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1leHBhbmRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVEcm9wRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RyZWUtZHJvcC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVHJlZURyYWdEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1kcmFnLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUcmVlQW5pbWF0ZU9wZW5EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVHJlZUNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNvbnRlbnQsXG4gICAgTG9hZGluZ0NvbXBvbmVudCxcbiAgICBUcmVlRHJvcERpcmVjdGl2ZSxcbiAgICBUcmVlRHJhZ0RpcmVjdGl2ZSxcbiAgICBUcmVlTm9kZUV4cGFuZGVyQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgVHJlZU5vZGVEcm9wU2xvdCxcbiAgICBUcmVlTm9kZUNvbGxlY3Rpb25Db21wb25lbnQsXG4gICAgVHJlZVZpZXdwb3J0Q29tcG9uZW50LFxuICAgIFRyZWVOb2RlV3JhcHBlckNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50LFxuICAgIFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSxcbiAgICBUcmVlTW9ieEF1dG9ydW5EaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRyZWVDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDb250ZW50LFxuICAgIExvYWRpbmdDb21wb25lbnQsXG4gICAgVHJlZURyb3BEaXJlY3RpdmUsXG4gICAgVHJlZURyYWdEaXJlY3RpdmUsXG4gICAgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNoaWxkcmVuQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlRHJvcFNsb3QsXG4gICAgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50LFxuICAgIFRyZWVWaWV3cG9ydENvbXBvbmVudCxcbiAgICBUcmVlTm9kZVdyYXBwZXJDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDaGVja2JveENvbXBvbmVudCxcbiAgICBUcmVlQW5pbWF0ZU9wZW5EaXJlY3RpdmUsXG4gICAgVHJlZU1vYnhBdXRvcnVuRGlyZWN0aXZlXG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNb2R1bGUge31cblxuZXhwb3J0IHtcbiAgVHJlZU1vZGVsLFxuICBUcmVlTm9kZSxcbiAgVHJlZURyYWdnZWRFbGVtZW50LFxuICBUcmVlVmlydHVhbFNjcm9sbCxcbiAgSVRyZWVPcHRpb25zLFxuICBUUkVFX0FDVElPTlMsXG4gIEtFWVMsXG4gIElBY3Rpb25NYXBwaW5nLFxuICBJQWN0aW9uSGFuZGxlcixcbiAgSUFsbG93RHJvcEZuLFxuICBJQWxsb3dEcmFnRm4sXG4gIExvYWRpbmdDb21wb25lbnQsXG4gIFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSxcbiAgVHJlZUNvbXBvbmVudCxcbiAgVHJlZU5vZGVDb21wb25lbnQsXG4gIFRyZWVOb2RlV3JhcHBlckNvbXBvbmVudCxcbiAgVHJlZU5vZGVDb250ZW50LFxuICBUcmVlRHJvcERpcmVjdGl2ZSxcbiAgVHJlZURyYWdEaXJlY3RpdmUsXG4gIFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQsXG4gIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQsXG4gIFRyZWVOb2RlRHJvcFNsb3QsXG4gIFRyZWVOb2RlQ29sbGVjdGlvbkNvbXBvbmVudCxcbiAgVHJlZVZpZXdwb3J0Q29tcG9uZW50LFxuICBUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50LFxuICBJVHJlZVN0YXRlXG59O1xuIl19