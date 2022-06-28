import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
const EASE_ACCELERATION = 1.005;
export class TreeAnimateOpenDirective {
    constructor(renderer, templateRef, viewContainerRef) {
        this.renderer = renderer;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }
    set isOpen(value) {
        if (value) {
            this._show();
            if (this.isEnabled && this._isOpen === false) {
                this._animateOpen();
            }
        }
        else {
            this.isEnabled ? this._animateClose() : this._hide();
        }
        this._isOpen = !!value;
    }
    ;
    _show() {
        if (this.innerElement)
            return;
        // create child view
        this.innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];
    }
    _hide() {
        this.viewContainerRef.clear();
        this.innerElement = null;
    }
    _animateOpen() {
        let delta = this.animateSpeed;
        let ease = this.animateAcceleration;
        let maxHeight = 0;
        // set height to 0
        this.renderer.setStyle(this.innerElement, 'max-height', `0`);
        // increase maxHeight until height doesn't change
        setTimeout(() => {
            const i = setInterval(() => {
                if (!this._isOpen || !this.innerElement)
                    return clearInterval(i);
                maxHeight += delta;
                const roundedMaxHeight = Math.round(maxHeight);
                this.renderer.setStyle(this.innerElement, 'max-height', `${roundedMaxHeight}px`);
                const height = this.innerElement.getBoundingClientRect ? this.innerElement.getBoundingClientRect().height : 0; // TBD use renderer
                delta *= ease;
                ease *= EASE_ACCELERATION;
                if (height < roundedMaxHeight) {
                    // Make maxHeight auto because animation finished and container might change height later on
                    this.renderer.setStyle(this.innerElement, 'max-height', null);
                    clearInterval(i);
                }
            }, 17);
        });
    }
    _animateClose() {
        if (!this.innerElement)
            return;
        let delta = this.animateSpeed;
        let ease = this.animateAcceleration;
        let height = this.innerElement.getBoundingClientRect().height; // TBD use renderer
        // slowly decrease maxHeight to 0, starting from current height
        const i = setInterval(() => {
            if (this._isOpen || !this.innerElement)
                return clearInterval(i);
            height -= delta;
            this.renderer.setStyle(this.innerElement, 'max-height', `${height}px`);
            delta *= ease;
            ease *= EASE_ACCELERATION;
            if (height <= 0) {
                // after animation complete - remove child element
                this.viewContainerRef.clear();
                this.innerElement = null;
                clearInterval(i);
            }
        }, 17);
    }
}
/** @nocollapse */ TreeAnimateOpenDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeAnimateOpenDirective, deps: [{ token: i0.Renderer2 }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ TreeAnimateOpenDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: TreeAnimateOpenDirective, selector: "[treeAnimateOpen]", inputs: { animateSpeed: ["treeAnimateOpenSpeed", "animateSpeed"], animateAcceleration: ["treeAnimateOpenAcceleration", "animateAcceleration"], isEnabled: ["treeAnimateOpenEnabled", "isEnabled"], isOpen: ["treeAnimateOpen", "isOpen"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeAnimateOpenDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[treeAnimateOpen]'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, propDecorators: { animateSpeed: [{
                type: Input,
                args: ['treeAnimateOpenSpeed']
            }], animateAcceleration: [{
                type: Input,
                args: ['treeAnimateOpenAcceleration']
            }], isEnabled: [{
                type: Input,
                args: ['treeAnimateOpenEnabled']
            }], isOpen: [{
                type: Input,
                args: ['treeAnimateOpen']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL2RpcmVjdGl2ZXMvdHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QyxNQUFNLGVBQWUsQ0FBQzs7QUFFM0YsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFLaEMsTUFBTSxPQUFPLHdCQUF3QjtJQXNCbkMsWUFDVSxRQUFtQixFQUNuQixXQUE2QixFQUM3QixnQkFBa0M7UUFGbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUM1QyxDQUFDO0lBbkJELElBQ0ksTUFBTSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0RDtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBQUEsQ0FBQztJQVVNLEtBQUs7UUFDWCxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUU5QixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdC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SSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtRQUNILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7O3lJQTdGVSx3QkFBd0I7NkhBQXhCLHdCQUF3Qjs0RkFBeEIsd0JBQXdCO2tCQUhwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7aUJBQzlCO3lKQUlnQyxZQUFZO3NCQUExQyxLQUFLO3VCQUFDLHNCQUFzQjtnQkFDUyxtQkFBbUI7c0JBQXhELEtBQUs7dUJBQUMsNkJBQTZCO2dCQUNILFNBQVM7c0JBQXpDLEtBQUs7dUJBQUMsd0JBQXdCO2dCQUczQixNQUFNO3NCQURULEtBQUs7dUJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBFQVNFX0FDQ0VMRVJBVElPTiA9IDEuMDA1O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdHJlZUFuaW1hdGVPcGVuXSdcbn0pXG5leHBvcnQgY2xhc3MgVHJlZUFuaW1hdGVPcGVuRGlyZWN0aXZlIHtcbiAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xuXG4gIEBJbnB1dCgndHJlZUFuaW1hdGVPcGVuU3BlZWQnKSBhbmltYXRlU3BlZWQ6IG51bWJlcjtcbiAgQElucHV0KCd0cmVlQW5pbWF0ZU9wZW5BY2NlbGVyYXRpb24nKSBhbmltYXRlQWNjZWxlcmF0aW9uOiBudW1iZXI7XG4gIEBJbnB1dCgndHJlZUFuaW1hdGVPcGVuRW5hYmxlZCcpIGlzRW5hYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoJ3RyZWVBbmltYXRlT3BlbicpXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCAmJiB0aGlzLl9pc09wZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGVPcGVuKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNFbmFibGVkID8gdGhpcy5fYW5pbWF0ZUNsb3NlKCkgOiB0aGlzLl9oaWRlKCk7XG4gICAgfVxuICAgIHRoaXMuX2lzT3BlbiA9ICEhdmFsdWU7XG4gIH07XG5cbiAgcHJpdmF0ZSBpbm5lckVsZW1lbnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3coKSB7XG4gICAgaWYgKHRoaXMuaW5uZXJFbGVtZW50KSByZXR1cm47XG5cbiAgICAvLyBjcmVhdGUgY2hpbGQgdmlld1xuICAgIHRoaXMuaW5uZXJFbGVtZW50ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKS5yb290Tm9kZXNbMF07XG4gIH1cblxuICBwcml2YXRlIF9oaWRlKCkge1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIHRoaXMuaW5uZXJFbGVtZW50ID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGVPcGVuKCkge1xuICAgIGxldCBkZWx0YSA9IHRoaXMuYW5pbWF0ZVNwZWVkO1xuICAgIGxldCBlYXNlID0gdGhpcy5hbmltYXRlQWNjZWxlcmF0aW9uO1xuICAgIGxldCBtYXhIZWlnaHQgPSAwO1xuXG4gICAgLy8gc2V0IGhlaWdodCB0byAwXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlubmVyRWxlbWVudCwgJ21heC1oZWlnaHQnLCBgMGApO1xuXG4gICAgLy8gaW5jcmVhc2UgbWF4SGVpZ2h0IHVudGlsIGhlaWdodCBkb2Vzbid0IGNoYW5nZVxuICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBBbGxvdyBpbm5lciBlbGVtZW50IHRvIGNyZWF0ZSBpdHMgY29udGVudFxuICAgICAgY29uc3QgaSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc09wZW4gfHwgIXRoaXMuaW5uZXJFbGVtZW50KSByZXR1cm4gY2xlYXJJbnRlcnZhbChpKTtcblxuICAgICAgICBtYXhIZWlnaHQgKz0gZGVsdGE7XG4gICAgICAgIGNvbnN0IHJvdW5kZWRNYXhIZWlnaHQgPSBNYXRoLnJvdW5kKG1heEhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlubmVyRWxlbWVudCwgJ21heC1oZWlnaHQnLCBgJHtyb3VuZGVkTWF4SGVpZ2h0fXB4YCk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaW5uZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCA/IHRoaXMuaW5uZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA6IDA7IC8vIFRCRCB1c2UgcmVuZGVyZXJcblxuICAgICAgICBkZWx0YSAqPSBlYXNlO1xuICAgICAgICBlYXNlICo9IEVBU0VfQUNDRUxFUkFUSU9OO1xuICAgICAgICBpZiAoaGVpZ2h0IDwgcm91bmRlZE1heEhlaWdodCkge1xuICAgICAgICAgIC8vIE1ha2UgbWF4SGVpZ2h0IGF1dG8gYmVjYXVzZSBhbmltYXRpb24gZmluaXNoZWQgYW5kIGNvbnRhaW5lciBtaWdodCBjaGFuZ2UgaGVpZ2h0IGxhdGVyIG9uXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlubmVyRWxlbWVudCwgJ21heC1oZWlnaHQnLCBudWxsKTtcbiAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICB9XG4gICAgICB9LCAxNyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRlQ2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlubmVyRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgbGV0IGRlbHRhID0gdGhpcy5hbmltYXRlU3BlZWQ7XG4gICAgbGV0IGVhc2UgPSB0aGlzLmFuaW1hdGVBY2NlbGVyYXRpb247XG4gICAgbGV0IGhlaWdodCA9IHRoaXMuaW5uZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDsgLy8gVEJEIHVzZSByZW5kZXJlclxuXG4gICAgLy8gc2xvd2x5IGRlY3JlYXNlIG1heEhlaWdodCB0byAwLCBzdGFydGluZyBmcm9tIGN1cnJlbnQgaGVpZ2h0XG4gICAgY29uc3QgaSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc09wZW4gfHwgIXRoaXMuaW5uZXJFbGVtZW50KSByZXR1cm4gY2xlYXJJbnRlcnZhbChpKTtcblxuICAgICAgaGVpZ2h0IC09IGRlbHRhO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlubmVyRWxlbWVudCwgJ21heC1oZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICAgIGRlbHRhICo9IGVhc2U7XG4gICAgICBlYXNlICo9IEVBU0VfQUNDRUxFUkFUSU9OO1xuXG4gICAgICBpZiAoaGVpZ2h0IDw9IDApIHtcbiAgICAgICAgLy8gYWZ0ZXIgYW5pbWF0aW9uIGNvbXBsZXRlIC0gcmVtb3ZlIGNoaWxkIGVsZW1lbnRcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuaW5uZXJFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgIH1cbiAgICB9LCAxNyk7XG4gIH1cbn1cbiJdfQ==