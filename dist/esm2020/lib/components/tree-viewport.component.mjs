import { Component, } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TREE_EVENTS } from '../constants/events';
import * as i0 from "@angular/core";
import * as i1 from "../models/tree-virtual-scroll.model";
import * as i2 from "../mobx-angular/tree-mobx-autorun.directive";
export class TreeViewportComponent {
    constructor(elementRef, virtualScroll) {
        this.elementRef = elementRef;
        this.virtualScroll = virtualScroll;
        this.setViewport = this.throttle(() => {
            this.virtualScroll.setViewport(this.elementRef.nativeElement);
        }, 17);
        this.scrollEventHandler = this.setViewport.bind(this);
    }
    ngOnInit() {
        this.virtualScroll.init();
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.setViewport();
            this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
        });
        let el = this.elementRef.nativeElement;
        el.addEventListener('scroll', this.scrollEventHandler);
    }
    ngOnDestroy() {
        this.virtualScroll.clear();
        let el = this.elementRef.nativeElement;
        el.removeEventListener('scroll', this.scrollEventHandler);
    }
    getTotalHeight() {
        return ((this.virtualScroll.isEnabled() &&
            this.virtualScroll.totalHeight + 'px') ||
            'auto');
    }
    throttle(func, timeFrame) {
        let lastTime = 0;
        return function () {
            let now = Date.now();
            if (now - lastTime >= timeFrame) {
                func();
                lastTime = now;
            }
        };
    }
}
/** @nocollapse */ TreeViewportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeViewportComponent, deps: [{ token: i0.ElementRef }, { token: i1.TreeVirtualScroll }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ TreeViewportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TreeViewportComponent, selector: "tree-viewport", providers: [TreeVirtualScroll], ngImport: i0, template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.height]="getTotalHeight()">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `, isInline: true, directives: [{ type: i2.TreeMobxAutorunDirective, selector: "[treeMobxAutorun]", inputs: ["treeMobxAutorun"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeViewportComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tree-viewport',
                    styles: [],
                    providers: [TreeVirtualScroll],
                    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.height]="getTotalHeight()">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.TreeVirtualScroll }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvY29tcG9uZW50cy90cmVlLXZpZXdwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxHQUtWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQWNsRCxNQUFNLE9BQU8scUJBQXFCO0lBT2hDLFlBQ1UsVUFBc0IsRUFDdkIsYUFBZ0M7UUFEL0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFSekMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQVFMLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDYixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxFQUFFLEdBQWdCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLElBQUksRUFBRSxHQUFnQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNwRCxFQUFFLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLE1BQU0sQ0FDUCxDQUFDO0lBQ0osQ0FBQztJQUVPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUztRQUM5QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTztZQUNMLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksU0FBUyxFQUFFO2dCQUMvQixJQUFJLEVBQUUsQ0FBQztnQkFDUCxRQUFRLEdBQUcsR0FBRyxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7c0lBbERVLHFCQUFxQjswSEFBckIscUJBQXFCLHdDQVRyQixDQUFDLGlCQUFpQixDQUFDLDBCQUNwQjs7Ozs7O0dBTVQ7NEZBRVUscUJBQXFCO2tCQVpqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixNQUFNLEVBQUUsRUFBRTtvQkFDVixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDOUIsUUFBUSxFQUFFOzs7Ozs7R0FNVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZVZpcnR1YWxTY3JvbGwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbCc7XG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cmVlLXZpZXdwb3J0JyxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbVHJlZVZpcnR1YWxTY3JvbGxdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XG4gICAgICA8ZGl2IFtzdHlsZS5oZWlnaHRdPVwiZ2V0VG90YWxIZWlnaHQoKVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlVmlld3BvcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHNldFZpZXdwb3J0ID0gdGhpcy50aHJvdHRsZSgoKSA9PiB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLnNldFZpZXdwb3J0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfSwgMTcpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc2Nyb2xsRXZlbnRIYW5kbGVyOiAoJGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHZpcnR1YWxTY3JvbGw6IFRyZWVWaXJ0dWFsU2Nyb2xsXG4gICkge1xuICAgIHRoaXMuc2Nyb2xsRXZlbnRIYW5kbGVyID0gdGhpcy5zZXRWaWV3cG9ydC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLmluaXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Vmlld3BvcnQoKTtcbiAgICAgIHRoaXMudmlydHVhbFNjcm9sbC5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmluaXRpYWxpemVkIH0pO1xuICAgIH0pO1xuICAgIGxldCBlbDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEV2ZW50SGFuZGxlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZpcnR1YWxTY3JvbGwuY2xlYXIoKTtcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxFdmVudEhhbmRsZXIpO1xuICB9XG5cbiAgZ2V0VG90YWxIZWlnaHQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnZpcnR1YWxTY3JvbGwuaXNFbmFibGVkKCkgJiZcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsLnRvdGFsSGVpZ2h0ICsgJ3B4JykgfHxcbiAgICAgICdhdXRvJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHRocm90dGxlKGZ1bmMsIHRpbWVGcmFtZSkge1xuICAgIGxldCBsYXN0VGltZSA9IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKG5vdyAtIGxhc3RUaW1lID49IHRpbWVGcmFtZSkge1xuICAgICAgICBmdW5jKCk7XG4gICAgICAgIGxhc3RUaW1lID0gbm93O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiJdfQ==