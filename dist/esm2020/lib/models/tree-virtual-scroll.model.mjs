var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TREE_EVENTS } from '../constants/events';
import * as i0 from "@angular/core";
import * as i1 from "./tree.model";
const Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
const Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes
export class TreeVirtualScroll {
    constructor(treeModel) {
        this.treeModel = treeModel;
        this.yBlocks = 0;
        this.x = 0;
        this.viewportHeight = null;
        this.viewport = null;
        treeModel.virtualScroll = this;
        this._dispose = [autorun(() => this.fixScroll())];
    }
    get y() {
        return this.yBlocks * Y_EPSILON;
    }
    get totalHeight() {
        return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
    }
    fireEvent(event) {
        this.treeModel.fireEvent(event);
    }
    init() {
        const fn = this.recalcPositions.bind(this);
        fn();
        this._dispose = [
            ...this._dispose,
            reaction(() => this.treeModel.roots, fn),
            reaction(() => this.treeModel.expandedNodeIds, fn),
            reaction(() => this.treeModel.hiddenNodeIds, fn)
        ];
        this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
    }
    isEnabled() {
        return this.treeModel.options.useVirtualScroll;
    }
    _setYBlocks(value) {
        this.yBlocks = value;
    }
    recalcPositions() {
        this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
    }
    _getPositionAfter(nodes, startPos) {
        let position = startPos;
        nodes.forEach((node) => {
            node.position = position;
            position = this._getPositionAfterNode(node, position);
        });
        return position;
    }
    _getPositionAfterNode(node, startPos) {
        let position = node.getSelfHeight() + startPos;
        if (node.children && node.isExpanded) { // TBD: consider loading component as well
            position = this._getPositionAfter(node.visibleChildren, position);
        }
        node.height = position - startPos;
        return position;
    }
    clear() {
        this._dispose.forEach((d) => d());
    }
    setViewport(viewport) {
        Object.assign(this, {
            viewport,
            x: viewport.scrollLeft,
            yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
            viewportHeight: viewport.getBoundingClientRect ? viewport.getBoundingClientRect().height : 0
        });
    }
    scrollIntoView(node, force, scrollToMiddle = true) {
        if (node.options.scrollContainer) {
            const scrollContainer = node.options.scrollContainer;
            const scrollContainerHeight = scrollContainer.getBoundingClientRect().height;
            const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
            const nodeTop = this.viewport.getBoundingClientRect().top + node.position - scrollContainerTop;
            if (force || // force scroll to node
                nodeTop < scrollContainer.scrollTop || // node is above scroll container
                nodeTop + node.getSelfHeight() > scrollContainer.scrollTop + scrollContainerHeight) { // node is below container
                scrollContainer.scrollTop = scrollToMiddle ?
                    nodeTop - scrollContainerHeight / 2 : // scroll to middle
                    nodeTop; // scroll to start
            }
        }
        else {
            if (force || // force scroll to node
                node.position < this.y || // node is above viewport
                node.position + node.getSelfHeight() > this.y + this.viewportHeight) { // node is below viewport
                if (this.viewport) {
                    this.viewport.scrollTop = scrollToMiddle ?
                        node.position - this.viewportHeight / 2 : // scroll to middle
                        node.position; // scroll to start
                    this._setYBlocks(Math.floor(this.viewport.scrollTop / Y_EPSILON));
                }
            }
        }
    }
    getViewportNodes(nodes) {
        if (!nodes)
            return [];
        const visibleNodes = nodes.filter((node) => !node.isHidden);
        if (!this.isEnabled())
            return visibleNodes;
        if (!this.viewportHeight || !visibleNodes.length)
            return [];
        // When loading children async this method is called before their height and position is calculated.
        // In that case firstIndex === 0 and lastIndex === visibleNodes.length - 1 (e.g. 1000),
        // which means that it loops through every visibleNodes item and push them into viewportNodes array.
        // We can prevent nodes from being pushed to the array and wait for the appropriate calculations to take place
        const lastVisibleNode = visibleNodes.slice(-1)[0];
        if (!lastVisibleNode.height && lastVisibleNode.position === 0)
            return [];
        // Search for first node in the viewport using binary search
        // Look for first node that starts after the beginning of the viewport (with buffer)
        // Or that ends after the beginning of the viewport
        const firstIndex = binarySearch(visibleNodes, (node) => {
            return (node.position + Y_OFFSET > this.y) ||
                (node.position + node.height > this.y);
        });
        // Search for last node in the viewport using binary search
        // Look for first node that starts after the end of the viewport (with buffer)
        const lastIndex = binarySearch(visibleNodes, (node) => {
            return node.position - Y_OFFSET > this.y + this.viewportHeight;
        }, firstIndex);
        const viewportNodes = [];
        for (let i = firstIndex; i <= lastIndex; i++) {
            viewportNodes.push(visibleNodes[i]);
        }
        return viewportNodes;
    }
    fixScroll() {
        const maxY = Math.max(0, this.totalHeight - this.viewportHeight);
        if (this.y < 0)
            this._setYBlocks(0);
        if (this.y > maxY)
            this._setYBlocks(maxY / Y_EPSILON);
    }
}
/** @nocollapse */ TreeVirtualScroll.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeVirtualScroll, deps: [{ token: i1.TreeModel }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ TreeVirtualScroll.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeVirtualScroll });
__decorate([
    observable
], TreeVirtualScroll.prototype, "yBlocks", void 0);
__decorate([
    observable
], TreeVirtualScroll.prototype, "x", void 0);
__decorate([
    observable
], TreeVirtualScroll.prototype, "viewportHeight", void 0);
__decorate([
    computed
], TreeVirtualScroll.prototype, "y", null);
__decorate([
    computed
], TreeVirtualScroll.prototype, "totalHeight", null);
__decorate([
    action
], TreeVirtualScroll.prototype, "_setYBlocks", null);
__decorate([
    action
], TreeVirtualScroll.prototype, "recalcPositions", null);
__decorate([
    action
], TreeVirtualScroll.prototype, "setViewport", null);
__decorate([
    action
], TreeVirtualScroll.prototype, "scrollIntoView", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeVirtualScroll, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.TreeModel }]; }, propDecorators: { yBlocks: [], x: [], viewportHeight: [], y: [], totalHeight: [], _setYBlocks: [], recalcPositions: [], setViewport: [], scrollIntoView: [] } });
function binarySearch(nodes, condition, firstIndex = 0) {
    let index = firstIndex;
    let toIndex = nodes.length - 1;
    while (index !== toIndex) {
        let midIndex = Math.floor((index + toIndex) / 2);
        if (condition(nodes[midIndex])) {
            toIndex = midIndex;
        }
        else {
            if (index === midIndex)
                index = toIndex;
            else
                index = midIndex;
        }
    }
    return index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBRWxELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDJFQUEyRTtBQUNqRyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxrRUFBa0U7QUFHekYsTUFBTSxPQUFPLGlCQUFpQjtJQWdCNUIsWUFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWI1QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osTUFBQyxHQUFHLENBQUMsQ0FBQztRQUNOLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFXZCxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQVhTLElBQUksQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQUVTLElBQUksV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMs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NENBQU87QUFDTjtJQUFYLFVBQVU7eURBQXVCO0FBR3hCO0lBQVQsUUFBUTswQ0FFUjtBQUVTO0lBQVQsUUFBUTtvREFFUjtBQTRCTztJQUFQLE1BQU07b0RBRU47QUFFTztJQUFQLE1BQU07d0RBRU47QUEyQk87SUFBUCxNQUFNO29EQU9OO0FBRU87SUFBUCxNQUFNO3VEQTJCTjs0RkEvR1UsaUJBQWlCO2tCQUQ3QixVQUFVO2dHQUlHLE9BQU8sTUFDUCxDQUFDLE1BQ0QsY0FBYyxNQUdaLENBQUMsTUFJRCxXQUFXLE1BOEJULFdBQVcsTUFJbkIsZUFBZSxNQTZCZixXQUFXLE1BU1gsY0FBYztBQTRFeEIsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQztJQUNwRCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUM7SUFDdkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFL0IsT0FBTyxLQUFLLEtBQUssT0FBTyxFQUFFO1FBQ3hCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFakQsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsT0FBTyxHQUFHLFFBQVEsQ0FBQztTQUNwQjthQUNJO1lBQ0gsSUFBSSxLQUFLLEtBQUssUUFBUTtnQkFBRSxLQUFLLEdBQUcsT0FBTyxDQUFDOztnQkFDbkMsS0FBSyxHQUFHLFFBQVEsQ0FBQztTQUN2QjtLQUNGO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiwgYXV0b3J1biwgcmVhY3Rpb24gfSBmcm9tICdtb2J4JztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4vdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuXG5jb25zdCBZX09GRlNFVCA9IDUwMDsgLy8gRXh0cmEgcGl4ZWxzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBpbiBlYWNoIGRpcmVjdGlvbiwgdG8gcmVuZGVyIG5vZGVzIGluXG5jb25zdCBZX0VQU0lMT04gPSAxNTA7IC8vIE1pbmltdW0gcGl4ZWwgY2hhbmdlIHJlcXVpcmVkIHRvIHJlY2FsY3VsYXRlIHRoZSByZW5kZXJlZCBub2Rlc1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJlZVZpcnR1YWxTY3JvbGwge1xuICBwcml2YXRlIF9kaXNwb3NlOiBhbnk7XG5cbiAgQG9ic2VydmFibGUgeUJsb2NrcyA9IDA7XG4gIEBvYnNlcnZhYmxlIHggPSAwO1xuICBAb2JzZXJ2YWJsZSB2aWV3cG9ydEhlaWdodCA9IG51bGw7XG4gIHZpZXdwb3J0ID0gbnVsbDtcblxuICBAY29tcHV0ZWQgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXMueUJsb2NrcyAqIFlfRVBTSUxPTjtcbiAgfVxuXG4gIEBjb21wdXRlZCBnZXQgdG90YWxIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLnZpcnR1YWxSb290ID8gdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QuaGVpZ2h0IDogMDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU1vZGVsOiBUcmVlTW9kZWwpIHtcbiAgICB0cmVlTW9kZWwudmlydHVhbFNjcm9sbCA9IHRoaXM7XG4gICAgdGhpcy5fZGlzcG9zZSA9IFthdXRvcnVuKCgpID0+IHRoaXMuZml4U2Nyb2xsKCkpXTtcbiAgfVxuXG4gIGZpcmVFdmVudChldmVudCkge1xuICAgIHRoaXMudHJlZU1vZGVsLmZpcmVFdmVudChldmVudCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IGZuID0gdGhpcy5yZWNhbGNQb3NpdGlvbnMuYmluZCh0aGlzKTtcblxuICAgIGZuKCk7XG4gICAgdGhpcy5fZGlzcG9zZSA9IFtcbiAgICAgIC4uLnRoaXMuX2Rpc3Bvc2UsXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5yb290cywgZm4pLFxuICAgICAgcmVhY3Rpb24oKCkgPT4gdGhpcy50cmVlTW9kZWwuZXhwYW5kZWROb2RlSWRzLCBmbiksXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5oaWRkZW5Ob2RlSWRzLCBmbilcbiAgICBdO1xuICAgIHRoaXMudHJlZU1vZGVsLnN1YnNjcmliZShUUkVFX0VWRU5UUy5sb2FkTm9kZUNoaWxkcmVuLCBmbik7XG4gIH1cblxuICBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLm9wdGlvbnMudXNlVmlydHVhbFNjcm9sbDtcbiAgfVxuXG4gIEBhY3Rpb24gcHJpdmF0ZSBfc2V0WUJsb2Nrcyh2YWx1ZSkge1xuICAgIHRoaXMueUJsb2NrcyA9IHZhbHVlO1xuICB9XG5cbiAgQGFjdGlvbiByZWNhbGNQb3NpdGlvbnMoKSB7XG4gICAgdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QuaGVpZ2h0ID0gdGhpcy5fZ2V0UG9zaXRpb25BZnRlcih0aGlzLnRyZWVNb2RlbC5nZXRWaXNpYmxlUm9vdHMoKSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb3NpdGlvbkFmdGVyKG5vZGVzLCBzdGFydFBvcykge1xuICAgIGxldCBwb3NpdGlvbiA9IHN0YXJ0UG9zO1xuXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbm9kZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyTm9kZShub2RlLCBwb3NpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb25BZnRlck5vZGUobm9kZSwgc3RhcnRQb3MpIHtcbiAgICBsZXQgcG9zaXRpb24gPSBub2RlLmdldFNlbGZIZWlnaHQoKSArIHN0YXJ0UG9zO1xuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5pc0V4cGFuZGVkKSB7IC8vIFRCRDogY29uc2lkZXIgbG9hZGluZyBjb21wb25lbnQgYXMgd2VsbFxuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyKG5vZGUudmlzaWJsZUNoaWxkcmVuLCBwb3NpdGlvbik7XG4gICAgfVxuICAgIG5vZGUuaGVpZ2h0ID0gcG9zaXRpb24gLSBzdGFydFBvcztcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2Rpc3Bvc2UuZm9yRWFjaCgoZCkgPT4gZCgpKTtcbiAgfVxuXG4gIEBhY3Rpb24gc2V0Vmlld3BvcnQodmlld3BvcnQpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgIHZpZXdwb3J0LFxuICAgICAgeDogdmlld3BvcnQuc2Nyb2xsTGVmdCxcbiAgICAgIHlCbG9ja3M6IE1hdGgucm91bmQodmlld3BvcnQuc2Nyb2xsVG9wIC8gWV9FUFNJTE9OKSxcbiAgICAgIHZpZXdwb3J0SGVpZ2h0OiB2aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPyB2aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgOiAwXG4gICAgfSk7XG4gIH1cblxuICBAYWN0aW9uIHNjcm9sbEludG9WaWV3KG5vZGUsIGZvcmNlLCBzY3JvbGxUb01pZGRsZSA9IHRydWUpIHtcbiAgICBpZiAobm9kZS5vcHRpb25zLnNjcm9sbENvbnRhaW5lcikge1xuICAgICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVyID0gbm9kZS5vcHRpb25zLnNjcm9sbENvbnRhaW5lcjtcbiAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lckhlaWdodCA9IHNjcm9sbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXJUb3AgPSBzY3JvbGxDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgY29uc3Qgbm9kZVRvcCA9IHRoaXMudmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgbm9kZS5wb3NpdGlvbiAtIHNjcm9sbENvbnRhaW5lclRvcDtcblxuICAgICAgaWYgKGZvcmNlIHx8IC8vIGZvcmNlIHNjcm9sbCB0byBub2RlXG4gICAgICAgIG5vZGVUb3AgPCBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wIHx8IC8vIG5vZGUgaXMgYWJvdmUgc2Nyb2xsIGNvbnRhaW5lclxuICAgICAgICBub2RlVG9wICsgbm9kZS5nZXRTZWxmSGVpZ2h0KCkgPiBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wICsgc2Nyb2xsQ29udGFpbmVySGVpZ2h0KSB7IC8vIG5vZGUgaXMgYmVsb3cgY29udGFpbmVyXG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgPSBzY3JvbGxUb01pZGRsZSA/XG4gICAgICAgICAgbm9kZVRvcCAtIHNjcm9sbENvbnRhaW5lckhlaWdodCAvIDIgOiAvLyBzY3JvbGwgdG8gbWlkZGxlXG4gICAgICAgICAgbm9kZVRvcDsgLy8gc2Nyb2xsIHRvIHN0YXJ0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmb3JjZSB8fCAvLyBmb3JjZSBzY3JvbGwgdG8gbm9kZVxuICAgICAgICBub2RlLnBvc2l0aW9uIDwgdGhpcy55IHx8IC8vIG5vZGUgaXMgYWJvdmUgdmlld3BvcnRcbiAgICAgICAgbm9kZS5wb3NpdGlvbiArIG5vZGUuZ2V0U2VsZkhlaWdodCgpID4gdGhpcy55ICsgdGhpcy52aWV3cG9ydEhlaWdodCkgeyAvLyBub2RlIGlzIGJlbG93IHZpZXdwb3J0XG4gICAgICAgIGlmICh0aGlzLnZpZXdwb3J0KSB7XG4gICAgICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxUb3AgPSBzY3JvbGxUb01pZGRsZSA/XG4gICAgICAgICAgbm9kZS5wb3NpdGlvbiAtIHRoaXMudmlld3BvcnRIZWlnaHQgLyAyIDogLy8gc2Nyb2xsIHRvIG1pZGRsZVxuICAgICAgICAgIG5vZGUucG9zaXRpb247IC8vIHNjcm9sbCB0byBzdGFydFxuXG4gICAgICAgICAgdGhpcy5fc2V0WUJsb2NrcyhNYXRoLmZsb29yKHRoaXMudmlld3BvcnQuc2Nyb2xsVG9wIC8gWV9FUFNJTE9OKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRWaWV3cG9ydE5vZGVzKG5vZGVzKSB7XG4gICAgaWYgKCFub2RlcykgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgdmlzaWJsZU5vZGVzID0gbm9kZXMuZmlsdGVyKChub2RlKSA9PiAhbm9kZS5pc0hpZGRlbik7XG5cbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHJldHVybiB2aXNpYmxlTm9kZXM7XG5cbiAgICBpZiAoIXRoaXMudmlld3BvcnRIZWlnaHQgfHwgIXZpc2libGVOb2Rlcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgIC8vIFdoZW4gbG9hZGluZyBjaGlsZHJlbiBhc3luYyB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgYmVmb3JlIHRoZWlyIGhlaWdodCBhbmQgcG9zaXRpb24gaXMgY2FsY3VsYXRlZC5cbiAgICAvLyBJbiB0aGF0IGNhc2UgZmlyc3RJbmRleCA9PT0gMCBhbmQgbGFzdEluZGV4ID09PSB2aXNpYmxlTm9kZXMubGVuZ3RoIC0gMSAoZS5nLiAxMDAwKSxcbiAgICAvLyB3aGljaCBtZWFucyB0aGF0IGl0IGxvb3BzIHRocm91Z2ggZXZlcnkgdmlzaWJsZU5vZGVzIGl0ZW0gYW5kIHB1c2ggdGhlbSBpbnRvIHZpZXdwb3J0Tm9kZXMgYXJyYXkuXG4gICAgLy8gV2UgY2FuIHByZXZlbnQgbm9kZXMgZnJvbSBiZWluZyBwdXNoZWQgdG8gdGhlIGFycmF5IGFuZCB3YWl0IGZvciB0aGUgYXBwcm9wcmlhdGUgY2FsY3VsYXRpb25zIHRvIHRha2UgcGxhY2VcbiAgICBjb25zdCBsYXN0VmlzaWJsZU5vZGUgPSB2aXNpYmxlTm9kZXMuc2xpY2UoLTEpWzBdXG4gICAgaWYgKCFsYXN0VmlzaWJsZU5vZGUuaGVpZ2h0ICYmIGxhc3RWaXNpYmxlTm9kZS5wb3NpdGlvbiA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gICAgLy8gU2VhcmNoIGZvciBmaXJzdCBub2RlIGluIHRoZSB2aWV3cG9ydCB1c2luZyBiaW5hcnkgc2VhcmNoXG4gICAgLy8gTG9vayBmb3IgZmlyc3Qgbm9kZSB0aGF0IHN0YXJ0cyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSB2aWV3cG9ydCAod2l0aCBidWZmZXIpXG4gICAgLy8gT3IgdGhhdCBlbmRzIGFmdGVyIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHZpZXdwb3J0XG4gICAgY29uc3QgZmlyc3RJbmRleCA9IGJpbmFyeVNlYXJjaCh2aXNpYmxlTm9kZXMsIChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gKG5vZGUucG9zaXRpb24gKyBZX09GRlNFVCA+IHRoaXMueSkgfHxcbiAgICAgICAgICAgICAobm9kZS5wb3NpdGlvbiArIG5vZGUuaGVpZ2h0ID4gdGhpcy55KTtcbiAgICB9KTtcblxuICAgIC8vIFNlYXJjaCBmb3IgbGFzdCBub2RlIGluIHRoZSB2aWV3cG9ydCB1c2luZyBiaW5hcnkgc2VhcmNoXG4gICAgLy8gTG9vayBmb3IgZmlyc3Qgbm9kZSB0aGF0IHN0YXJ0cyBhZnRlciB0aGUgZW5kIG9mIHRoZSB2aWV3cG9ydCAod2l0aCBidWZmZXIpXG4gICAgY29uc3QgbGFzdEluZGV4ID0gYmluYXJ5U2VhcmNoKHZpc2libGVOb2RlcywgKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiBub2RlLnBvc2l0aW9uIC0gWV9PRkZTRVQgPiB0aGlzLnkgKyB0aGlzLnZpZXdwb3J0SGVpZ2h0O1xuICAgIH0sIGZpcnN0SW5kZXgpO1xuXG4gICAgY29uc3Qgdmlld3BvcnROb2RlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPD0gbGFzdEluZGV4OyBpKyspIHtcbiAgICAgIHZpZXdwb3J0Tm9kZXMucHVzaCh2aXNpYmxlTm9kZXNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3cG9ydE5vZGVzO1xuICB9XG5cbiAgZml4U2Nyb2xsKCkge1xuICAgIGNvbnN0IG1heFkgPSBNYXRoLm1heCgwLCB0aGlzLnRvdGFsSGVpZ2h0IC0gdGhpcy52aWV3cG9ydEhlaWdodCk7XG5cbiAgICBpZiAodGhpcy55IDwgMCkgdGhpcy5fc2V0WUJsb2NrcygwKTtcbiAgICBpZiAodGhpcy55ID4gbWF4WSkgdGhpcy5fc2V0WUJsb2NrcyhtYXhZIC8gWV9FUFNJTE9OKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2gobm9kZXMsIGNvbmRpdGlvbiwgZmlyc3RJbmRleCA9IDApIHtcbiAgbGV0IGluZGV4ID0gZmlyc3RJbmRleDtcbiAgbGV0IHRvSW5kZXggPSBub2Rlcy5sZW5ndGggLSAxO1xuXG4gIHdoaWxlIChpbmRleCAhPT0gdG9JbmRleCkge1xuICAgIGxldCBtaWRJbmRleCA9IE1hdGguZmxvb3IoKGluZGV4ICsgdG9JbmRleCkgLyAyKTtcblxuICAgIGlmIChjb25kaXRpb24obm9kZXNbbWlkSW5kZXhdKSkge1xuICAgICAgdG9JbmRleCA9IG1pZEluZGV4O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmIChpbmRleCA9PT0gbWlkSW5kZXgpIGluZGV4ID0gdG9JbmRleDtcbiAgICAgIGVsc2UgaW5kZXggPSBtaWRJbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufVxuIl19