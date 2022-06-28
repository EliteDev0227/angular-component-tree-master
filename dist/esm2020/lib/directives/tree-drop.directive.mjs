import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../models/tree-dragged-element.model";
const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
export class TreeDropDirective {
    constructor(el, renderer, treeDraggedElement, ngZone) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
        this.ngZone = ngZone;
        this.allowDragoverStyling = true;
        this.onDropCallback = new EventEmitter();
        this.onDragOverCallback = new EventEmitter();
        this.onDragLeaveCallback = new EventEmitter();
        this.onDragEnterCallback = new EventEmitter();
        this._allowDrop = (element, $event) => true;
        this.dragOverEventHandler = this.onDragOver.bind(this);
        this.dragEnterEventHandler = this.onDragEnter.bind(this);
        this.dragLeaveEventHandler = this.onDragLeave.bind(this);
    }
    set treeAllowDrop(allowDrop) {
        if (allowDrop instanceof Function) {
            this._allowDrop = allowDrop;
        }
        else
            this._allowDrop = (element, $event) => allowDrop;
    }
    allowDrop($event) {
        return this._allowDrop(this.treeDraggedElement.get(), $event);
    }
    ngAfterViewInit() {
        let el = this.el.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            el.addEventListener('dragover', this.dragOverEventHandler);
            el.addEventListener('dragenter', this.dragEnterEventHandler);
            el.addEventListener('dragleave', this.dragLeaveEventHandler);
        });
    }
    ngOnDestroy() {
        let el = this.el.nativeElement;
        el.removeEventListener('dragover', this.dragOverEventHandler);
        el.removeEventListener('dragenter', this.dragEnterEventHandler);
        el.removeEventListener('dragleave', this.dragLeaveEventHandler);
    }
    onDragOver($event) {
        if (!this.allowDrop($event)) {
            if (this.allowDragoverStyling) {
                return this.addDisabledClass();
            }
            return;
        }
        this.onDragOverCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        $event.preventDefault();
        if (this.allowDragoverStyling) {
            this.addClass();
        }
    }
    onDragEnter($event) {
        if (!this.allowDrop($event))
            return;
        $event.preventDefault();
        this.onDragEnterCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
    }
    onDragLeave($event) {
        if (!this.allowDrop($event)) {
            if (this.allowDragoverStyling) {
                return this.removeDisabledClass();
            }
            return;
        }
        this.onDragLeaveCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        if (this.allowDragoverStyling) {
            this.removeClass();
        }
    }
    onDrop($event) {
        if (!this.allowDrop($event))
            return;
        $event.preventDefault();
        this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        if (this.allowDragoverStyling) {
            this.removeClass();
        }
        this.treeDraggedElement.set(null);
    }
    addClass() {
        this.renderer.addClass(this.el.nativeElement, DRAG_OVER_CLASS);
    }
    removeClass() {
        this.renderer.removeClass(this.el.nativeElement, DRAG_OVER_CLASS);
    }
    addDisabledClass() {
        this.renderer.addClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
    }
    removeDisabledClass() {
        this.renderer.removeClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
    }
}
/** @nocollapse */ TreeDropDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeDropDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.TreeDraggedElement }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ TreeDropDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: TreeDropDirective, selector: "[treeDrop]", inputs: { allowDragoverStyling: "allowDragoverStyling", treeAllowDrop: "treeAllowDrop" }, outputs: { onDropCallback: "treeDrop", onDragOverCallback: "treeDropDragOver", onDragLeaveCallback: "treeDropDragLeave", onDragEnterCallback: "treeDropDragEnter" }, host: { listeners: { "drop": "onDrop($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeDropDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[treeDrop]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.TreeDraggedElement }, { type: i0.NgZone }]; }, propDecorators: { allowDragoverStyling: [{
                type: Input
            }], onDropCallback: [{
                type: Output,
                args: ['treeDrop']
            }], onDragOverCallback: [{
                type: Output,
                args: ['treeDropDragOver']
            }], onDragLeaveCallback: [{
                type: Output,
                args: ['treeDropDragLeave']
            }], onDragEnterCallback: [{
                type: Output,
                args: ['treeDropDragEnter']
            }], treeAllowDrop: [{
                type: Input
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7OztBQUd2QixNQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztBQUMzQyxNQUFNLG1CQUFtQixHQUFHLDJCQUEyQixDQUFDO0FBS3hELE1BQU0sT0FBTyxpQkFBaUI7SUF1QjVCLFlBQW9CLEVBQWMsRUFBVSxRQUFtQixFQUFVLGtCQUFzQyxFQUFVLE1BQWM7UUFBbkgsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXRCOUgseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1Qix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUs5RCxlQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFjN0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FB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LEVBQUUsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUN4RSxDQUFDOztrSUE1R1UsaUJBQWlCO3NIQUFqQixpQkFBaUI7NEZBQWpCLGlCQUFpQjtrQkFIN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7K0tBRVUsb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNjLGNBQWM7c0JBQWpDLE1BQU07dUJBQUMsVUFBVTtnQkFDVSxrQkFBa0I7c0JBQTdDLE1BQU07dUJBQUMsa0JBQWtCO2dCQUNHLG1CQUFtQjtzQkFBL0MsTUFBTTt1QkFBQyxtQkFBbUI7Z0JBQ0UsbUJBQW1CO3NCQUEvQyxNQUFNO3VCQUFDLG1CQUFtQjtnQkFPZCxhQUFhO3NCQUF6QixLQUFLO2dCQXNFNEIsTUFBTTtzQkFBdkMsWUFBWTt1QkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcblxuY29uc3QgRFJBR19PVkVSX0NMQVNTID0gJ2lzLWRyYWdnaW5nLW92ZXInO1xuY29uc3QgRFJBR19ESVNBQkxFRF9DTEFTUyA9ICdpcy1kcmFnZ2luZy1vdmVyLWRpc2FibGVkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RyZWVEcm9wXSdcbn0pXG5leHBvcnQgY2xhc3MgVHJlZURyb3BEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBhbGxvd0RyYWdvdmVyU3R5bGluZyA9IHRydWU7XG4gIEBPdXRwdXQoJ3RyZWVEcm9wJykgb25Ecm9wQ2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ3RyZWVEcm9wRHJhZ092ZXInKSBvbkRyYWdPdmVyQ2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ3RyZWVEcm9wRHJhZ0xlYXZlJykgb25EcmFnTGVhdmVDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgndHJlZURyb3BEcmFnRW50ZXInKSBvbkRyYWdFbnRlckNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRyYWdPdmVyRXZlbnRIYW5kbGVyOiAoZXY6IERyYWdFdmVudCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnRW50ZXJFdmVudEhhbmRsZXI6IChldjogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuICBwcml2YXRlIHJlYWRvbmx5IGRyYWdMZWF2ZUV2ZW50SGFuZGxlcjogKGV2OiBEcmFnRXZlbnQpID0+IHZvaWQ7XG5cbiAgcHJpdmF0ZSBfYWxsb3dEcm9wID0gKGVsZW1lbnQsICRldmVudCkgPT4gdHJ1ZTtcblxuICBASW5wdXQoKSBzZXQgdHJlZUFsbG93RHJvcChhbGxvd0Ryb3ApIHtcbiAgICBpZiAoYWxsb3dEcm9wIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMuX2FsbG93RHJvcCA9IGFsbG93RHJvcDtcbiAgICB9XG4gICAgZWxzZSB0aGlzLl9hbGxvd0Ryb3AgPSAoZWxlbWVudCwgJGV2ZW50KSA9PiBhbGxvd0Ryb3A7XG4gIH1cblxuICBhbGxvd0Ryb3AoJGV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbG93RHJvcCh0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKSwgJGV2ZW50KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB0cmVlRHJhZ2dlZEVsZW1lbnQ6IFRyZWVEcmFnZ2VkRWxlbWVudCwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuZHJhZ092ZXJFdmVudEhhbmRsZXIgPSB0aGlzLm9uRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRyYWdFbnRlckV2ZW50SGFuZGxlciA9IHRoaXMub25EcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRyYWdMZWF2ZUV2ZW50SGFuZGxlciA9IHRoaXMub25EcmFnTGVhdmUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3ZlckV2ZW50SGFuZGxlcik7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLmRyYWdFbnRlckV2ZW50SGFuZGxlcik7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUV2ZW50SGFuZGxlcik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3ZlckV2ZW50SGFuZGxlcik7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5kcmFnRW50ZXJFdmVudEhhbmRsZXIpO1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlRXZlbnRIYW5kbGVyKTtcbiAgfVxuXG4gIG9uRHJhZ092ZXIoJGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSB7XG4gICAgICBpZiAodGhpcy5hbGxvd0RyYWdvdmVyU3R5bGluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGREaXNhYmxlZENsYXNzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vbkRyYWdPdmVyQ2FsbGJhY2suZW1pdCh7ZXZlbnQ6ICRldmVudCwgZWxlbWVudDogdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuZ2V0KCl9KTtcblxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmFsbG93RHJhZ292ZXJTdHlsaW5nKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKCk7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnRW50ZXIoJGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSByZXR1cm47XG5cbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLm9uRHJhZ0VudGVyQ2FsbGJhY2suZW1pdCh7ZXZlbnQ6ICRldmVudCwgZWxlbWVudDogdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuZ2V0KCl9KTtcbiAgfVxuXG4gIG9uRHJhZ0xlYXZlKCRldmVudCkge1xuICAgIGlmICghdGhpcy5hbGxvd0Ryb3AoJGV2ZW50KSkge1xuICAgICAgaWYgKHRoaXMuYWxsb3dEcmFnb3ZlclN0eWxpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlRGlzYWJsZWRDbGFzcygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9uRHJhZ0xlYXZlQ2FsbGJhY2suZW1pdCh7ZXZlbnQ6ICRldmVudCwgZWxlbWVudDogdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuZ2V0KCl9KTtcblxuICAgIGlmICh0aGlzLmFsbG93RHJhZ292ZXJTdHlsaW5nKSB7XG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pIG9uRHJvcCgkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dEcm9wKCRldmVudCkpIHJldHVybjtcblxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMub25Ecm9wQ2FsbGJhY2suZW1pdCh7ZXZlbnQ6ICRldmVudCwgZWxlbWVudDogdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuZ2V0KCl9KTtcblxuICAgIGlmICh0aGlzLmFsbG93RHJhZ292ZXJTdHlsaW5nKSB7XG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKCk7XG4gICAgfVxuICAgIHRoaXMudHJlZURyYWdnZWRFbGVtZW50LnNldChudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2xhc3MoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIERSQUdfT1ZFUl9DTEFTUyk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNsYXNzKCkge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBEUkFHX09WRVJfQ0xBU1MpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGREaXNhYmxlZENsYXNzKCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBEUkFHX0RJU0FCTEVEX0NMQVNTKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRGlzYWJsZWRDbGFzcygpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgRFJBR19ESVNBQkxFRF9DTEFTUyk7XG4gIH1cbn1cbiJdfQ==