import { Directive, Input } from '@angular/core';
import { autorun } from 'mobx';
import * as i0 from "@angular/core";
export class TreeMobxAutorunDirective {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.templateBindings = {};
    }
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef);
        if (this.dispose) {
            this.dispose();
        }
        if (this.shouldDetach()) {
            this.view.detach();
        }
        this.autoDetect(this.view);
    }
    shouldDetach() {
        return this.treeMobxAutorun && this.treeMobxAutorun.detach;
    }
    autoDetect(view) {
        this.dispose = autorun(() => view.detectChanges());
    }
    ngOnDestroy() {
        if (this.dispose) {
            this.dispose();
        }
    }
}
/** @nocollapse */ TreeMobxAutorunDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeMobxAutorunDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ TreeMobxAutorunDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: TreeMobxAutorunDirective, selector: "[treeMobxAutorun]", inputs: { treeMobxAutorun: "treeMobxAutorun" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeMobxAutorunDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[treeMobxAutorun]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, propDecorators: { treeMobxAutorun: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tb2J4LWF1dG9ydW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL21vYngtYW5ndWxhci90cmVlLW1vYngtYXV0b3J1bi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFLVCxLQUFLLEVBRU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHL0IsTUFBTSxPQUFPLHdCQUF3QjtJQU1uQyxZQUNZLFdBQTZCLEVBQzdCLGFBQStCO1FBRC9CLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFQakMscUJBQWdCLEdBQUcsRUFBRSxDQUFDO0lBUTdCLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO0lBQzdELENBQUM7SUFFRCxVQUFVLENBQUMsSUFBMEI7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7eUlBcENVLHdCQUF3Qjs2SEFBeEIsd0JBQXdCOzRGQUF4Qix3QkFBd0I7a0JBRHBDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7aUlBS2pDLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIEVtYmVkZGVkVmlld1JlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGF1dG9ydW4gfSBmcm9tICdtb2J4JztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3RyZWVNb2J4QXV0b3J1bl0nIH0pXG5leHBvcnQgY2xhc3MgVHJlZU1vYnhBdXRvcnVuRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgdGVtcGxhdGVCaW5kaW5ncyA9IHt9O1xuICBwcm90ZWN0ZWQgZGlzcG9zZTogYW55O1xuICBwcm90ZWN0ZWQgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIEBJbnB1dCgpIHRyZWVNb2J4QXV0b3J1bjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJvdGVjdGVkIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudmlldyA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG5cbiAgICBpZiAodGhpcy5kaXNwb3NlKSB7XG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG91bGREZXRhY2goKSkge1xuICAgICAgdGhpcy52aWV3LmRldGFjaCgpO1xuICAgIH1cbiAgICB0aGlzLmF1dG9EZXRlY3QodGhpcy52aWV3KTtcbiAgfVxuXG4gIHNob3VsZERldGFjaCgpIHtcbiAgICByZXR1cm4gdGhpcy50cmVlTW9ieEF1dG9ydW4gJiYgdGhpcy50cmVlTW9ieEF1dG9ydW4uZGV0YWNoO1xuICB9XG5cbiAgYXV0b0RldGVjdCh2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55Pikge1xuICAgIHRoaXMuZGlzcG9zZSA9IGF1dG9ydW4oKCkgPT4gdmlldy5kZXRlY3RDaGFuZ2VzKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZGlzcG9zZSkge1xuICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=