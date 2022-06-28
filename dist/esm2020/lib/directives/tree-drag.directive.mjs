import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../models/tree-dragged-element.model";
const DRAG_OVER_CLASS = 'is-dragging-over';
export class TreeDragDirective {
    constructor(el, renderer, treeDraggedElement, ngZone) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
        this.ngZone = ngZone;
        this.dragEventHandler = this.onDrag.bind(this);
    }
    ngAfterViewInit() {
        let el = this.el.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            el.addEventListener('drag', this.dragEventHandler);
        });
    }
    ngDoCheck() {
        this.renderer.setAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? 'true' : 'false');
    }
    ngOnDestroy() {
        let el = this.el.nativeElement;
        el.removeEventListener('drag', this.dragEventHandler);
    }
    onDragStart(ev) {
        // setting the data is required by firefox
        ev.dataTransfer.setData('text', ev.target.id);
        this.treeDraggedElement.set(this.draggedElement);
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('dragStart', ev);
        }
    }
    onDrag(ev) {
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('drag', ev);
        }
    }
    onDragEnd() {
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('dragEnd');
        }
        this.treeDraggedElement.set(null);
    }
}
/** @nocollapse */ TreeDragDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeDragDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.TreeDraggedElement }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ TreeDragDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: TreeDragDirective, selector: "[treeDrag]", inputs: { draggedElement: ["treeDrag", "draggedElement"], treeDragEnabled: "treeDragEnabled" }, host: { listeners: { "dragstart": "onDragStart($event)", "dragend": "onDragEnd()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeDragDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[treeDrag]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.TreeDraggedElement }, { type: i0.NgZone }]; }, propDecorators: { draggedElement: [{
                type: Input,
                args: ['treeDrag']
            }], treeDragEnabled: [{
                type: Input
            }], onDragStart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }], onDragEnd: [{
                type: HostListener,
                args: ['dragend']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQXVCLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sZUFBZSxDQUFDOzs7QUFHakksTUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUM7QUFLM0MsTUFBTSxPQUFPLGlCQUFpQjtJQUs1QixZQUFvQixFQUFjLEVBQVUsUUFBbUIsRUFBVSxrQkFBc0MsRUFBVSxNQUFjO1FBQW5ILE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDckksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxFQUFFLEdBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxFQUFFLEdBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVzQyxXQUFXLENBQUMsRUFBRTtRQUNuRCwwQ0FBMEM7UUFDMUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTtZQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUU7UUFDUCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFO1lBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFd0IsU0FBUztRQUNoQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFO1lBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOztrSUE3Q1UsaUJBQWlCO3NIQUFqQixpQkFBaUI7NEZBQWpCLGlCQUFpQjtrQkFIN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7K0tBRW9CLGNBQWM7c0JBQWhDLEtBQUs7dUJBQUMsVUFBVTtnQkFDUixlQUFlO3NCQUF2QixLQUFLO2dCQXVCaUMsV0FBVztzQkFBakQsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBZVosU0FBUztzQkFBakMsWUFBWTt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBEb0NoZWNrLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuXG5jb25zdCBEUkFHX09WRVJfQ0xBU1MgPSAnaXMtZHJhZ2dpbmctb3Zlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0cmVlRHJhZ10nXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVEcmFnRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgQElucHV0KCd0cmVlRHJhZycpIGRyYWdnZWRFbGVtZW50O1xuICBASW5wdXQoKSB0cmVlRHJhZ0VuYWJsZWQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0V2ZW50SGFuZGxlcjogKGV2OiBEcmFnRXZlbnQpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHRyZWVEcmFnZ2VkRWxlbWVudDogVHJlZURyYWdnZWRFbGVtZW50LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdnYWJsZScsIHRoaXMudHJlZURyYWdFbmFibGVkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWcnLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSkgb25EcmFnU3RhcnQoZXYpIHtcbiAgICAvLyBzZXR0aW5nIHRoZSBkYXRhIGlzIHJlcXVpcmVkIGJ5IGZpcmVmb3hcbiAgICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIGV2LnRhcmdldC5pZCk7XG4gICAgdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuc2V0KHRoaXMuZHJhZ2dlZEVsZW1lbnQpO1xuICAgIGlmICh0aGlzLmRyYWdnZWRFbGVtZW50Lm1vdXNlQWN0aW9uKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbGVtZW50Lm1vdXNlQWN0aW9uKCdkcmFnU3RhcnQnLCBldik7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnKGV2KSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dlZEVsZW1lbnQubW91c2VBY3Rpb24pIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnQubW91c2VBY3Rpb24oJ2RyYWcnLCBldik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcpIG9uRHJhZ0VuZCgpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2VkRWxlbWVudC5tb3VzZUFjdGlvbikge1xuICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudC5tb3VzZUFjdGlvbignZHJhZ0VuZCcpO1xuICAgIH1cbiAgICB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5zZXQobnVsbCk7XG4gIH1cbn1cbiJdfQ==