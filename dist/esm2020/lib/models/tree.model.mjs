var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun } from 'mobx';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TREE_EVENTS } from '../constants/events';
import * as i0 from "@angular/core";
export class TreeModel {
    constructor() {
        this.options = new TreeOptions();
        this.eventNames = Object.keys(TREE_EVENTS);
        this.expandedNodeIds = {};
        this.selectedLeafNodeIds = {};
        this.activeNodeIds = {};
        this.hiddenNodeIds = {};
        this.focusedNodeId = null;
        this.firstUpdate = true;
        this.subscriptions = [];
    }
    // events
    fireEvent(event) {
        event.treeModel = this;
        this.events[event.eventName].emit(event);
        this.events.event.emit(event);
    }
    subscribe(eventName, fn) {
        const subscription = this.events[eventName].subscribe(fn);
        this.subscriptions.push(subscription);
    }
    // getters
    getFocusedNode() {
        return this.focusedNode;
    }
    getActiveNode() {
        return this.activeNodes[0];
    }
    getActiveNodes() {
        return this.activeNodes;
    }
    getVisibleRoots() {
        return this.virtualRoot.visibleChildren;
    }
    getFirstRoot(skipHidden = false) {
        const root = skipHidden ? this.getVisibleRoots() : this.roots;
        return root != null && root.length ? root[0] : null;
    }
    getLastRoot(skipHidden = false) {
        const root = skipHidden ? this.getVisibleRoots() : this.roots;
        return root != null && root.length ? root[root.length - 1] : null;
    }
    get isFocused() {
        return TreeModel.focusedTree === this;
    }
    isNodeFocused(node) {
        return this.focusedNode === node;
    }
    isEmptyTree() {
        return this.roots && this.roots.length === 0;
    }
    get focusedNode() {
        return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
    }
    get expandedNodes() {
        const nodes = Object.keys(this.expandedNodeIds)
            .filter((id) => this.expandedNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get activeNodes() {
        const nodes = Object.keys(this.activeNodeIds)
            .filter((id) => this.activeNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get hiddenNodes() {
        const nodes = Object.keys(this.hiddenNodeIds)
            .filter((id) => this.hiddenNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get selectedLeafNodes() {
        const nodes = Object.keys(this.selectedLeafNodeIds)
            .filter((id) => this.selectedLeafNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    // locating nodes
    getNodeByPath(path, startNode = null) {
        if (!path)
            return null;
        startNode = startNode || this.virtualRoot;
        if (path.length === 0)
            return startNode;
        if (!startNode.children)
            return null;
        const childId = path.shift();
        const childNode = startNode.children.find(c => c.id === childId);
        if (!childNode)
            return null;
        return this.getNodeByPath(path, childNode);
    }
    getNodeById(id) {
        const idStr = id.toString();
        return this.getNodeBy((node) => node.id.toString() === idStr);
    }
    getNodeBy(predicate, startNode = null) {
        startNode = startNode || this.virtualRoot;
        if (!startNode.children)
            return null;
        const found = startNode.children.find(predicate);
        if (found) { // found in children
            return found;
        }
        else { // look in children's children
            for (let child of startNode.children) {
                const foundInChildren = this.getNodeBy(predicate, child);
                if (foundInChildren)
                    return foundInChildren;
            }
        }
    }
    isExpanded(node) {
        return this.expandedNodeIds[node.id];
    }
    isHidden(node) {
        return this.hiddenNodeIds[node.id];
    }
    isActive(node) {
        return this.activeNodeIds[node.id];
    }
    isSelected(node) {
        return this.selectedLeafNodeIds[node.id];
    }
    ngOnDestroy() {
        this.dispose();
        this.unsubscribeAll();
    }
    dispose() {
        // Dispose reactions of the replaced nodes
        if (this.virtualRoot) {
            this.virtualRoot.dispose();
        }
    }
    unsubscribeAll() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }
    // actions
    setData({ nodes, options = null, events = null }) {
        if (options) {
            this.options = new TreeOptions(options);
        }
        if (events) {
            this.events = events;
        }
        if (nodes) {
            this.nodes = nodes;
        }
        this.update();
    }
    update() {
        // Rebuild tree:
        let virtualRootConfig = {
            id: this.options.rootId,
            virtual: true,
            [this.options.childrenField]: this.nodes
        };
        this.dispose();
        this.virtualRoot = new TreeNode(virtualRootConfig, null, this, 0);
        this.roots = this.virtualRoot.children;
        // Fire event:
        if (this.firstUpdate) {
            if (this.roots) {
                this.firstUpdate = false;
                this._calculateExpandedNodes();
            }
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.updateData });
        }
    }
    setFocusedNode(node) {
        this.focusedNodeId = node ? node.id : null;
    }
    setFocus(value) {
        TreeModel.focusedTree = value ? this : null;
    }
    doForAll(fn) {
        this.roots.forEach((root) => root.doForAll(fn));
    }
    focusNextNode() {
        let previousNode = this.getFocusedNode();
        let nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
        if (nextNode)
            nextNode.focus();
    }
    focusPreviousNode() {
        let previousNode = this.getFocusedNode();
        let nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
        if (nextNode)
            nextNode.focus();
    }
    focusDrillDown() {
        let previousNode = this.getFocusedNode();
        if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
            previousNode.toggleExpanded();
        }
        else {
            let nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
            if (nextNode)
                nextNode.focus();
        }
    }
    focusDrillUp() {
        let previousNode = this.getFocusedNode();
        if (!previousNode)
            return;
        if (previousNode.isExpanded) {
            previousNode.toggleExpanded();
        }
        else {
            let nextNode = previousNode.realParent;
            if (nextNode)
                nextNode.focus();
        }
    }
    setActiveNode(node, value, multi = false) {
        if (multi) {
            this._setActiveNodeMulti(node, value);
        }
        else {
            this._setActiveNodeSingle(node, value);
        }
        if (value) {
            node.focus(this.options.scrollOnActivate);
            this.fireEvent({ eventName: TREE_EVENTS.activate, node });
            this.fireEvent({ eventName: TREE_EVENTS.nodeActivate, node }); // For IE11
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.deactivate, node });
            this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node }); // For IE11
        }
    }
    setSelectedNode(node, value) {
        this.selectedLeafNodeIds = Object.assign({}, this.selectedLeafNodeIds, { [node.id]: value });
        if (value) {
            node.focus();
            this.fireEvent({ eventName: TREE_EVENTS.select, node });
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.deselect, node });
        }
    }
    setExpandedNode(node, value) {
        this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [node.id]: value });
        this.fireEvent({ eventName: TREE_EVENTS.toggleExpanded, node, isExpanded: value });
    }
    expandAll() {
        this.roots.forEach((root) => root.expandAll());
    }
    collapseAll() {
        this.roots.forEach((root) => root.collapseAll());
    }
    setIsHidden(node, value) {
        this.hiddenNodeIds = Object.assign({}, this.hiddenNodeIds, { [node.id]: value });
    }
    setHiddenNodeIds(nodeIds) {
        this.hiddenNodeIds = nodeIds.reduce((hiddenNodeIds, id) => Object.assign(hiddenNodeIds, {
            [id]: true
        }), {});
    }
    performKeyAction(node, $event) {
        const keyAction = this.options.actionMapping.keys[$event.keyCode];
        if (keyAction) {
            $event.preventDefault();
            keyAction(this, node, $event);
            return true;
        }
        else {
            return false;
        }
    }
    filterNodes(filter, autoShow = true) {
        let filterFn;
        if (!filter) {
            return this.clearFilter();
        }
        // support function and string filter
        if (filter && typeof filter.valueOf() === 'string') {
            filterFn = (node) => node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        }
        else if (filter && typeof filter === 'function') {
            filterFn = filter;
        }
        else {
            console.error('Don\'t know what to do with filter', filter);
            console.error('Should be either a string or function');
            return;
        }
        const ids = {};
        this.roots.forEach((node) => this._filterNode(ids, node, filterFn, autoShow));
        this.hiddenNodeIds = ids;
        this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
    }
    clearFilter() {
        this.hiddenNodeIds = {};
        this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
    }
    moveNode(node, to) {
        const fromIndex = node.getIndexInParent();
        const fromParent = node.parent;
        if (!this.canMoveNode(node, to, fromIndex))
            return;
        const fromChildren = fromParent.getField('children');
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        const toChildren = to.parent.getField('children');
        const originalNode = fromChildren.splice(fromIndex, 1)[0];
        // Compensate for index if already removed from parent:
        let toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;
        toChildren.splice(toIndex, 0, originalNode);
        fromParent.treeModel.update();
        if (to.parent.treeModel !== fromParent.treeModel) {
            to.parent.treeModel.update();
        }
        this.fireEvent({
            eventName: TREE_EVENTS.moveNode,
            node: originalNode,
            to: { parent: to.parent.data, index: toIndex },
            from: { parent: fromParent.data, index: fromIndex }
        });
    }
    copyNode(node, to) {
        const fromIndex = node.getIndexInParent();
        if (!this.canMoveNode(node, to, fromIndex))
            return;
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        const toChildren = to.parent.getField('children');
        const nodeCopy = this.options.getNodeClone(node);
        toChildren.splice(to.index, 0, nodeCopy);
        node.treeModel.update();
        if (to.parent.treeModel !== node.treeModel) {
            to.parent.treeModel.update();
        }
        this.fireEvent({ eventName: TREE_EVENTS.copyNode, node: nodeCopy, to: { parent: to.parent.data, index: to.index } });
    }
    getState() {
        return {
            expandedNodeIds: this.expandedNodeIds,
            selectedLeafNodeIds: this.selectedLeafNodeIds,
            activeNodeIds: this.activeNodeIds,
            hiddenNodeIds: this.hiddenNodeIds,
            focusedNodeId: this.focusedNodeId
        };
    }
    setState(state) {
        if (!state)
            return;
        Object.assign(this, {
            expandedNodeIds: state.expandedNodeIds || {},
            selectedLeafNodeIds: state.selectedLeafNodeIds || {},
            activeNodeIds: state.activeNodeIds || {},
            hiddenNodeIds: state.hiddenNodeIds || {},
            focusedNodeId: state.focusedNodeId
        });
    }
    subscribeToState(fn) {
        autorun(() => fn(this.getState()));
    }
    canMoveNode(node, to, fromIndex = undefined) {
        const fromNodeIndex = fromIndex || node.getIndexInParent();
        // same node:
        if (node.parent === to.parent && fromIndex === to.index) {
            return false;
        }
        return !to.parent.isDescendantOf(node);
    }
    calculateExpandedNodes() {
        this._calculateExpandedNodes();
    }
    // private methods
    _filterNode(ids, node, filterFn, autoShow) {
        // if node passes function then it's visible
        let isVisible = filterFn(node);
        if (node.children) {
            // if one of node's children passes filter then this node is also visible
            node.children.forEach((child) => {
                if (this._filterNode(ids, child, filterFn, autoShow)) {
                    isVisible = true;
                }
            });
        }
        // mark node as hidden
        if (!isVisible) {
            ids[node.id] = true;
        }
        // auto expand parents to make sure the filtered nodes are visible
        if (autoShow && isVisible) {
            node.ensureVisible();
        }
        return isVisible;
    }
    _calculateExpandedNodes(startNode = null) {
        startNode = startNode || this.virtualRoot;
        if (startNode.data[this.options.isExpandedField]) {
            this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [startNode.id]: true });
        }
        if (startNode.children) {
            startNode.children.forEach((child) => this._calculateExpandedNodes(child));
        }
    }
    _setActiveNodeSingle(node, value) {
        // Deactivate all other nodes:
        this.activeNodes
            .filter((activeNode) => activeNode !== node)
            .forEach((activeNode) => {
            this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: activeNode });
            this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: activeNode }); // For IE11
        });
        if (value) {
            this.activeNodeIds = { [node.id]: true };
        }
        else {
            this.activeNodeIds = {};
        }
    }
    _setActiveNodeMulti(node, value) {
        this.activeNodeIds = Object.assign({}, this.activeNodeIds, { [node.id]: value });
    }
}
TreeModel.focusedTree = null;
/** @nocollapse */ TreeModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeModel, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ TreeModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeModel });
__decorate([
    observable
], TreeModel.prototype, "roots", void 0);
__decorate([
    observable
], TreeModel.prototype, "expandedNodeIds", void 0);
__decorate([
    observable
], TreeModel.prototype, "selectedLeafNodeIds", void 0);
__decorate([
    observable
], TreeModel.prototype, "activeNodeIds", void 0);
__decorate([
    observable
], TreeModel.prototype, "hiddenNodeIds", void 0);
__decorate([
    observable
], TreeModel.prototype, "focusedNodeId", void 0);
__decorate([
    observable
], TreeModel.prototype, "virtualRoot", void 0);
__decorate([
    computed
], TreeModel.prototype, "focusedNode", null);
__decorate([
    computed
], TreeModel.prototype, "expandedNodes", null);
__decorate([
    computed
], TreeModel.prototype, "activeNodes", null);
__decorate([
    computed
], TreeModel.prototype, "hiddenNodes", null);
__decorate([
    computed
], TreeModel.prototype, "selectedLeafNodes", null);
__decorate([
    action
], TreeModel.prototype, "setData", null);
__decorate([
    action
], TreeModel.prototype, "update", null);
__decorate([
    action
], TreeModel.prototype, "setFocusedNode", null);
__decorate([
    action
], TreeModel.prototype, "setFocus", null);
__decorate([
    action
], TreeModel.prototype, "doForAll", null);
__decorate([
    action
], TreeModel.prototype, "focusNextNode", null);
__decorate([
    action
], TreeModel.prototype, "focusPreviousNode", null);
__decorate([
    action
], TreeModel.prototype, "focusDrillDown", null);
__decorate([
    action
], TreeModel.prototype, "focusDrillUp", null);
__decorate([
    action
], TreeModel.prototype, "setActiveNode", null);
__decorate([
    action
], TreeModel.prototype, "setSelectedNode", null);
__decorate([
    action
], TreeModel.prototype, "setExpandedNode", null);
__decorate([
    action
], TreeModel.prototype, "expandAll", null);
__decorate([
    action
], TreeModel.prototype, "collapseAll", null);
__decorate([
    action
], TreeModel.prototype, "setIsHidden", null);
__decorate([
    action
], TreeModel.prototype, "setHiddenNodeIds", null);
__decorate([
    action
], TreeModel.prototype, "filterNodes", null);
__decorate([
    action
], TreeModel.prototype, "clearFilter", null);
__decorate([
    action
], TreeModel.prototype, "moveNode", null);
__decorate([
    action
], TreeModel.prototype, "copyNode", null);
__decorate([
    action
], TreeModel.prototype, "setState", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TreeModel, decorators: [{
            type: Injectable
        }], propDecorators: { roots: [], expandedNodeIds: [], selectedLeafNodeIds: [], activeNodeIds: [], hiddenNodeIds: [], focusedNodeId: [], virtualRoot: [], focusedNode: [], expandedNodes: [], activeNodes: [], hiddenNodes: [], selectedLeafNodes: [], setData: [], update: [], setFocusedNode: [], setFocus: [], doForAll: [], focusNextNode: [], focusPreviousNode: [], focusDrillDown: [], focusDrillUp: [], setActiveNode: [], setSelectedNode: [], setExpandedNode: [], expandAll: [], collapseAll: [], setIsHidden: [], setHiddenNodeIds: [], filterNodes: [], clearFilter: [], moveNode: [], copyNode: [], setState: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9tb2RlbHMvdHJlZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUduRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBR2xELE1BQU0sT0FBTyxTQUFTO0lBRHRCO1FBSUUsWUFBTyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRXpDLGVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBSTFCLG9CQUFlLEdBQXFCLEVBQUUsQ0FBQztRQUN2Qyx3QkFBbUIsR0FBcUIsRUFBRSxDQUFDO1FBQzNDLGtCQUFhLEdBQXFCLEVBQUUsQ0FBQztRQUNyQyxrQkFBYSxHQUFxQixFQUFFLENBQUM7UUFDckMsa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFHakMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFbkIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0tBcWY1QztJQW5mQyxTQUFTO0lBQ1QsU0FBUyxDQUFDLEtBQUs7UUFDYixLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENB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OEJBU0csS0FBSyxNQUNMLGVBQWUsTUFDZixtQkFBbUIsTUFDbkIsYUFBYSxNQUNiLGFBQWEsTUFDYixhQUFhLE1BQ2IsV0FBVyxNQTJEVCxXQUFXLE1BSVgsYUFBYSxNQVFiLFdBQVcsTUFRWCxXQUFXLE1BUVgsaUJBQWlCLE1Ba0Z2QixPQUFPLE1BY1AsTUFBTSxNQTBCTixjQUFjLE1BSWQsUUFBUSxNQUlSLFFBQVEsTUFJUixhQUFhLE1BTWIsaUJBQWlCLE1BTWpCLGNBQWMsTUFXZCxZQUFZLE1BWVosYUFBYSxNQWtCYixlQUFlLE1BV2YsZUFBZSxNQUtmLFNBQVMsTUFJVCxXQUFXLE1BSVgsV0FBVyxNQUlYLGdCQUFnQixNQWlCaEIsV0FBVyxNQTBCWCxXQUFXLE1BS1gsUUFBUSxNQWtDUixRQUFRLE1BaUNSLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9ic2VydmFibGUsIGNvbXB1dGVkLCBhY3Rpb24sIGF1dG9ydW4gfSBmcm9tICdtb2J4JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlT3B0aW9ucyB9IGZyb20gJy4vdHJlZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IFRyZWVWaXJ0dWFsU2Nyb2xsIH0gZnJvbSAnLi90cmVlLXZpcnR1YWwtc2Nyb2xsLm1vZGVsJztcbmltcG9ydCB7IElUcmVlTW9kZWwsIElEVHlwZSwgSURUeXBlRGljdGlvbmFyeSB9IGZyb20gJy4uL2RlZnMvYXBpJztcbmltcG9ydCB7IFRSRUVfRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlTW9kZWwgaW1wbGVtZW50cyBJVHJlZU1vZGVsLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgZm9jdXNlZFRyZWUgPSBudWxsO1xuXG4gIG9wdGlvbnM6IFRyZWVPcHRpb25zID0gbmV3IFRyZWVPcHRpb25zKCk7XG4gIG5vZGVzOiBhbnlbXTtcbiAgZXZlbnROYW1lcyA9IE9iamVjdC5rZXlzKFRSRUVfRVZFTlRTKTtcbiAgdmlydHVhbFNjcm9sbDogVHJlZVZpcnR1YWxTY3JvbGw7XG5cbiAgQG9ic2VydmFibGUgcm9vdHM6IFRyZWVOb2RlW107XG4gIEBvYnNlcnZhYmxlIGV4cGFuZGVkTm9kZUlkczogSURUeXBlRGljdGlvbmFyeSA9IHt9O1xuICBAb2JzZXJ2YWJsZSBzZWxlY3RlZExlYWZOb2RlSWRzOiBJRFR5cGVEaWN0aW9uYXJ5ID0ge307XG4gIEBvYnNlcnZhYmxlIGFjdGl2ZU5vZGVJZHM6IElEVHlwZURpY3Rpb25hcnkgPSB7fTtcbiAgQG9ic2VydmFibGUgaGlkZGVuTm9kZUlkczogSURUeXBlRGljdGlvbmFyeSA9IHt9O1xuICBAb2JzZXJ2YWJsZSBmb2N1c2VkTm9kZUlkOiBJRFR5cGUgPSBudWxsO1xuICBAb2JzZXJ2YWJsZSB2aXJ0dWFsUm9vdDogVHJlZU5vZGU7XG5cbiAgcHJpdmF0ZSBmaXJzdFVwZGF0ZSA9IHRydWU7XG4gIHByaXZhdGUgZXZlbnRzOiBhbnk7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvLyBldmVudHNcbiAgZmlyZUV2ZW50KGV2ZW50KSB7XG4gICAgZXZlbnQudHJlZU1vZGVsID0gdGhpcztcbiAgICB0aGlzLmV2ZW50c1tldmVudC5ldmVudE5hbWVdLmVtaXQoZXZlbnQpO1xuICAgIHRoaXMuZXZlbnRzLmV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnN1YnNjcmliZShmbik7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgfVxuXG5cbiAgLy8gZ2V0dGVyc1xuICBnZXRGb2N1c2VkTm9kZSgpOiBUcmVlTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuZm9jdXNlZE5vZGU7XG4gIH1cblxuXG4gIGdldEFjdGl2ZU5vZGUoKTogVHJlZU5vZGUge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZU5vZGVzWzBdO1xuICB9XG5cbiAgZ2V0QWN0aXZlTm9kZXMoKTogVHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZXM7XG4gIH1cblxuICBnZXRWaXNpYmxlUm9vdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlydHVhbFJvb3QudmlzaWJsZUNoaWxkcmVuO1xuICB9XG5cbiAgZ2V0Rmlyc3RSb290KHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IHJvb3QgPSBza2lwSGlkZGVuID8gdGhpcy5nZXRWaXNpYmxlUm9vdHMoKSA6IHRoaXMucm9vdHM7XG4gICAgcmV0dXJuIHJvb3QgIT0gbnVsbCAmJiByb290Lmxlbmd0aCA/IHJvb3RbMF0gOiBudWxsO1xuICB9XG5cbiAgZ2V0TGFzdFJvb3Qoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgY29uc3Qgcm9vdCA9IHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVSb290cygpIDogdGhpcy5yb290cztcbiAgICByZXR1cm4gcm9vdCAhPSBudWxsICYmIHJvb3QubGVuZ3RoID8gcm9vdFtyb290Lmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgfVxuXG4gIGdldCBpc0ZvY3VzZWQoKSB7XG4gICAgcmV0dXJuIFRyZWVNb2RlbC5mb2N1c2VkVHJlZSA9PT0gdGhpcztcbiAgfVxuXG4gIGlzTm9kZUZvY3VzZWQobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmZvY3VzZWROb2RlID09PSBub2RlO1xuICB9XG5cbiAgaXNFbXB0eVRyZWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucm9vdHMgJiYgdGhpcy5yb290cy5sZW5ndGggPT09IDA7XG4gIH1cblxuICBAY29tcHV0ZWQgZ2V0IGZvY3VzZWROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLmZvY3VzZWROb2RlSWQgPyB0aGlzLmdldE5vZGVCeUlkKHRoaXMuZm9jdXNlZE5vZGVJZCkgOiBudWxsO1xuICB9XG5cbiAgQGNvbXB1dGVkIGdldCBleHBhbmRlZE5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5leHBhbmRlZE5vZGVJZHMpXG4gICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5leHBhbmRlZE5vZGVJZHNbaWRdKVxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKTtcblxuICAgIHJldHVybiBub2Rlcy5maWx0ZXIoQm9vbGVhbik7XG4gIH1cblxuICBAY29tcHV0ZWQgZ2V0IGFjdGl2ZU5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5hY3RpdmVOb2RlSWRzKVxuICAgICAgLmZpbHRlcigoaWQpID0+IHRoaXMuYWN0aXZlTm9kZUlkc1tpZF0pXG4gICAgICAubWFwKChpZCkgPT4gdGhpcy5nZXROb2RlQnlJZChpZCkpO1xuXG4gICAgcmV0dXJuIG5vZGVzLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuXG4gIEBjb21wdXRlZCBnZXQgaGlkZGVuTm9kZXMoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBPYmplY3Qua2V5cyh0aGlzLmhpZGRlbk5vZGVJZHMpXG4gICAgICAgIC5maWx0ZXIoKGlkKSA9PiB0aGlzLmhpZGRlbk5vZGVJZHNbaWRdKVxuICAgICAgICAubWFwKChpZCkgPT4gdGhpcy5nZXROb2RlQnlJZChpZCkpO1xuXG4gICAgcmV0dXJuIG5vZGVzLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuXG4gIEBjb21wdXRlZCBnZXQgc2VsZWN0ZWRMZWFmTm9kZXMoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBPYmplY3Qua2V5cyh0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHMpXG4gICAgICAgIC5maWx0ZXIoKGlkKSA9PiB0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHNbaWRdKVxuICAgICAgICAubWFwKChpZCkgPT4gdGhpcy5nZXROb2RlQnlJZChpZCkpO1xuXG4gICAgcmV0dXJuIG5vZGVzLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuXG4gIC8vIGxvY2F0aW5nIG5vZGVzXG4gIGdldE5vZGVCeVBhdGgocGF0aDogYW55W10sIHN0YXJ0Tm9kZT0gbnVsbCk6IFRyZWVOb2RlIHtcbiAgICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuXG4gICAgc3RhcnROb2RlID0gc3RhcnROb2RlIHx8IHRoaXMudmlydHVhbFJvb3Q7XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gc3RhcnROb2RlO1xuXG4gICAgaWYgKCFzdGFydE5vZGUuY2hpbGRyZW4pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgY2hpbGRJZCA9IHBhdGguc2hpZnQoKTtcbiAgICBjb25zdCBjaGlsZE5vZGUgPSBzdGFydE5vZGUuY2hpbGRyZW4uZmluZChjID0+IGMuaWQgPT09IGNoaWxkSWQpO1xuXG4gICAgaWYgKCFjaGlsZE5vZGUpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUJ5UGF0aChwYXRoLCBjaGlsZE5vZGUpO1xuICB9XG5cbiAgZ2V0Tm9kZUJ5SWQoaWQpIHtcbiAgICBjb25zdCBpZFN0ciA9IGlkLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXROb2RlQnkoKG5vZGUpID0+IG5vZGUuaWQudG9TdHJpbmcoKSA9PT0gaWRTdHIpO1xuICB9XG5cbiAgZ2V0Tm9kZUJ5KHByZWRpY2F0ZSwgc3RhcnROb2RlID0gbnVsbCkge1xuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xuXG4gICAgaWYgKCFzdGFydE5vZGUuY2hpbGRyZW4pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgZm91bmQgPSBzdGFydE5vZGUuY2hpbGRyZW4uZmluZChwcmVkaWNhdGUpO1xuXG4gICAgaWYgKGZvdW5kKSB7IC8vIGZvdW5kIGluIGNoaWxkcmVuXG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfSBlbHNlIHsgLy8gbG9vayBpbiBjaGlsZHJlbidzIGNoaWxkcmVuXG4gICAgICBmb3IgKGxldCBjaGlsZCBvZiBzdGFydE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgY29uc3QgZm91bmRJbkNoaWxkcmVuID0gdGhpcy5nZXROb2RlQnkocHJlZGljYXRlLCBjaGlsZCk7XG4gICAgICAgIGlmIChmb3VuZEluQ2hpbGRyZW4pIHJldHVybiBmb3VuZEluQ2hpbGRyZW47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNFeHBhbmRlZChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kZWROb2RlSWRzW25vZGUuaWRdO1xuICB9XG5cbiAgaXNIaWRkZW4obm9kZSkge1xuICAgIHJldHVybiB0aGlzLmhpZGRlbk5vZGVJZHNbbm9kZS5pZF07XG4gIH1cblxuICBpc0FjdGl2ZShub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZUlkc1tub2RlLmlkXTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQobm9kZSkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHNbbm9kZS5pZF07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlQWxsKCk7XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIC8vIERpc3Bvc2UgcmVhY3Rpb25zIG9mIHRoZSByZXBsYWNlZCBub2Rlc1xuICAgIGlmICh0aGlzLnZpcnR1YWxSb290KSB7XG4gICAgICB0aGlzLnZpcnR1YWxSb290LmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cblxuICB1bnN1YnNjcmliZUFsbCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICB9XG5cbiAgLy8gYWN0aW9uc1xuICBAYWN0aW9uIHNldERhdGEoeyBub2Rlcywgb3B0aW9ucyA9IG51bGwsIGV2ZW50cyA9IG51bGwgfToge25vZGVzOiBhbnksIG9wdGlvbnM6IGFueSwgZXZlbnRzOiBhbnl9KSB7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBUcmVlT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG4gICAgfVxuICAgIGlmIChub2Rlcykge1xuICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBAYWN0aW9uIHVwZGF0ZSgpIHtcbiAgICAvLyBSZWJ1aWxkIHRyZWU6XG4gICAgbGV0IHZpcnR1YWxSb290Q29uZmlnID0ge1xuICAgICAgaWQ6IHRoaXMub3B0aW9ucy5yb290SWQsXG4gICAgICB2aXJ0dWFsOiB0cnVlLFxuICAgICAgW3RoaXMub3B0aW9ucy5jaGlsZHJlbkZpZWxkXTogdGhpcy5ub2Rlc1xuICAgIH07XG5cbiAgICB0aGlzLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMudmlydHVhbFJvb3QgPSBuZXcgVHJlZU5vZGUodmlydHVhbFJvb3RDb25maWcsIG51bGwsIHRoaXMsIDApO1xuXG4gICAgdGhpcy5yb290cyA9IHRoaXMudmlydHVhbFJvb3QuY2hpbGRyZW47XG5cbiAgICAvLyBGaXJlIGV2ZW50OlxuICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XG4gICAgICBpZiAodGhpcy5yb290cykge1xuICAgICAgICB0aGlzLmZpcnN0VXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLnVwZGF0ZURhdGEgfSk7XG4gICAgfVxuICB9XG5cblxuICBAYWN0aW9uIHNldEZvY3VzZWROb2RlKG5vZGUpIHtcbiAgICB0aGlzLmZvY3VzZWROb2RlSWQgPSBub2RlID8gbm9kZS5pZCA6IG51bGw7XG4gIH1cblxuICBAYWN0aW9uIHNldEZvY3VzKHZhbHVlKSB7XG4gICAgVHJlZU1vZGVsLmZvY3VzZWRUcmVlID0gdmFsdWUgPyB0aGlzIDogbnVsbDtcbiAgfVxuXG4gIEBhY3Rpb24gZG9Gb3JBbGwoZm4pIHtcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKHJvb3QpID0+IHJvb3QuZG9Gb3JBbGwoZm4pKTtcbiAgfVxuXG4gIEBhY3Rpb24gZm9jdXNOZXh0Tm9kZSgpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZSA/IHByZXZpb3VzTm9kZS5maW5kTmV4dE5vZGUodHJ1ZSwgdHJ1ZSkgOiB0aGlzLmdldEZpcnN0Um9vdCh0cnVlKTtcbiAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XG4gIH1cblxuICBAYWN0aW9uIGZvY3VzUHJldmlvdXNOb2RlKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XG4gICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlID8gcHJldmlvdXNOb2RlLmZpbmRQcmV2aW91c05vZGUodHJ1ZSkgOiB0aGlzLmdldExhc3RSb290KHRydWUpO1xuICAgIGlmIChuZXh0Tm9kZSkgbmV4dE5vZGUuZm9jdXMoKTtcbiAgfVxuXG4gIEBhY3Rpb24gZm9jdXNEcmlsbERvd24oKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICBpZiAocHJldmlvdXNOb2RlICYmIHByZXZpb3VzTm9kZS5pc0NvbGxhcHNlZCAmJiBwcmV2aW91c05vZGUuaGFzQ2hpbGRyZW4pIHtcbiAgICAgIHByZXZpb3VzTm9kZS50b2dnbGVFeHBhbmRlZCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZSA/IHByZXZpb3VzTm9kZS5nZXRGaXJzdENoaWxkKHRydWUpIDogdGhpcy5nZXRGaXJzdFJvb3QodHJ1ZSk7XG4gICAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgQGFjdGlvbiBmb2N1c0RyaWxsVXAoKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICBpZiAoIXByZXZpb3VzTm9kZSkgcmV0dXJuO1xuICAgIGlmIChwcmV2aW91c05vZGUuaXNFeHBhbmRlZCkge1xuICAgICAgcHJldmlvdXNOb2RlLnRvZ2dsZUV4cGFuZGVkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlLnJlYWxQYXJlbnQ7XG4gICAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgQGFjdGlvbiBzZXRBY3RpdmVOb2RlKG5vZGUsIHZhbHVlLCBtdWx0aSA9IGZhbHNlKSB7XG4gICAgaWYgKG11bHRpKSB7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVOb2RlTXVsdGkobm9kZSwgdmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX3NldEFjdGl2ZU5vZGVTaW5nbGUobm9kZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgbm9kZS5mb2N1cyh0aGlzLm9wdGlvbnMuc2Nyb2xsT25BY3RpdmF0ZSk7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuYWN0aXZhdGUsIG5vZGUgfSk7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMubm9kZUFjdGl2YXRlLCBub2RlIH0pOyAvLyBGb3IgSUUxMVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuZGVhY3RpdmF0ZSwgbm9kZSB9KTtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5ub2RlRGVhY3RpdmF0ZSwgbm9kZSB9KTsgLy8gRm9yIElFMTFcbiAgICB9XG4gIH1cblxuICBAYWN0aW9uIHNldFNlbGVjdGVkTm9kZShub2RlLCB2YWx1ZSkge1xuICAgIHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkcywge1tub2RlLmlkXTogdmFsdWV9KTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgbm9kZS5mb2N1cygpO1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLnNlbGVjdCwgbm9kZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmRlc2VsZWN0LCBub2RlIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBhY3Rpb24gc2V0RXhwYW5kZWROb2RlKG5vZGUsIHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRlZE5vZGVJZHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmV4cGFuZGVkTm9kZUlkcywge1tub2RlLmlkXTogdmFsdWV9KTtcbiAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMudG9nZ2xlRXhwYW5kZWQsIG5vZGUsIGlzRXhwYW5kZWQ6IHZhbHVlIH0pO1xuICB9XG5cbiAgQGFjdGlvbiBleHBhbmRBbGwoKSB7XG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChyb290KSA9PiByb290LmV4cGFuZEFsbCgpKTtcbiAgfVxuXG4gIEBhY3Rpb24gY29sbGFwc2VBbGwoKSB7XG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChyb290KSA9PiByb290LmNvbGxhcHNlQWxsKCkpO1xuICB9XG5cbiAgQGFjdGlvbiBzZXRJc0hpZGRlbihub2RlLCB2YWx1ZSkge1xuICAgIHRoaXMuaGlkZGVuTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGlkZGVuTm9kZUlkcywge1tub2RlLmlkXTogdmFsdWV9KTtcbiAgfVxuXG4gIEBhY3Rpb24gc2V0SGlkZGVuTm9kZUlkcyhub2RlSWRzKSB7XG4gICAgdGhpcy5oaWRkZW5Ob2RlSWRzID0gbm9kZUlkcy5yZWR1Y2UoKGhpZGRlbk5vZGVJZHMsIGlkKSA9PiBPYmplY3QuYXNzaWduKGhpZGRlbk5vZGVJZHMsIHtcbiAgICAgIFtpZF06IHRydWVcbiAgICB9KSwge30pO1xuICB9XG5cbiAgcGVyZm9ybUtleUFjdGlvbihub2RlLCAkZXZlbnQpIHtcbiAgICBjb25zdCBrZXlBY3Rpb24gPSB0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5rZXlzWyRldmVudC5rZXlDb2RlXTtcbiAgICBpZiAoa2V5QWN0aW9uKSB7XG4gICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGtleUFjdGlvbih0aGlzLCBub2RlLCAkZXZlbnQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBAYWN0aW9uIGZpbHRlck5vZGVzKGZpbHRlciwgYXV0b1Nob3cgPSB0cnVlKSB7XG4gICAgbGV0IGZpbHRlckZuO1xuXG4gICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmNsZWFyRmlsdGVyKCk7XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydCBmdW5jdGlvbiBhbmQgc3RyaW5nIGZpbHRlclxuICAgIGlmIChmaWx0ZXIgJiYgdHlwZW9mIGZpbHRlci52YWx1ZU9mKCkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmaWx0ZXJGbiA9IChub2RlKSA9PiBub2RlLmRpc3BsYXlGaWVsZC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmlsdGVyICYmIHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICBmaWx0ZXJGbiA9IGZpbHRlcjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdEb25cXCd0IGtub3cgd2hhdCB0byBkbyB3aXRoIGZpbHRlcicsIGZpbHRlcik7XG4gICAgICBjb25zb2xlLmVycm9yKCdTaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGZ1bmN0aW9uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWRzID0ge307XG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChub2RlKSA9PiB0aGlzLl9maWx0ZXJOb2RlKGlkcywgbm9kZSwgZmlsdGVyRm4sIGF1dG9TaG93KSk7XG4gICAgdGhpcy5oaWRkZW5Ob2RlSWRzID0gaWRzO1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5jaGFuZ2VGaWx0ZXIgfSk7XG4gIH1cblxuICBAYWN0aW9uIGNsZWFyRmlsdGVyKCkge1xuICAgIHRoaXMuaGlkZGVuTm9kZUlkcyA9IHt9O1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5jaGFuZ2VGaWx0ZXIgfSk7XG4gIH1cblxuICBAYWN0aW9uIG1vdmVOb2RlKG5vZGUsIHRvKSB7XG4gICAgY29uc3QgZnJvbUluZGV4ID0gbm9kZS5nZXRJbmRleEluUGFyZW50KCk7XG4gICAgY29uc3QgZnJvbVBhcmVudCA9IG5vZGUucGFyZW50O1xuXG4gICAgaWYgKCF0aGlzLmNhbk1vdmVOb2RlKG5vZGUsIHRvLCBmcm9tSW5kZXgpKSByZXR1cm47XG5cbiAgICBjb25zdCBmcm9tQ2hpbGRyZW4gPSBmcm9tUGFyZW50LmdldEZpZWxkKCdjaGlsZHJlbicpO1xuXG4gICAgLy8gSWYgbm9kZSBkb2Vzbid0IGhhdmUgY2hpbGRyZW4gLSBjcmVhdGUgY2hpbGRyZW4gYXJyYXlcbiAgICBpZiAoIXRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xuICAgICAgdG8ucGFyZW50LnNldEZpZWxkKCdjaGlsZHJlbicsIFtdKTtcbiAgICB9XG4gICAgY29uc3QgdG9DaGlsZHJlbiA9IHRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcblxuICAgIGNvbnN0IG9yaWdpbmFsTm9kZSA9IGZyb21DaGlsZHJlbi5zcGxpY2UoZnJvbUluZGV4LCAxKVswXTtcblxuICAgIC8vIENvbXBlbnNhdGUgZm9yIGluZGV4IGlmIGFscmVhZHkgcmVtb3ZlZCBmcm9tIHBhcmVudDpcbiAgICBsZXQgdG9JbmRleCA9IChmcm9tUGFyZW50ID09PSB0by5wYXJlbnQgJiYgdG8uaW5kZXggPiBmcm9tSW5kZXgpID8gdG8uaW5kZXggLSAxIDogdG8uaW5kZXg7XG5cbiAgICB0b0NoaWxkcmVuLnNwbGljZSh0b0luZGV4LCAwLCBvcmlnaW5hbE5vZGUpO1xuXG4gICAgZnJvbVBhcmVudC50cmVlTW9kZWwudXBkYXRlKCk7XG4gICAgaWYgKHRvLnBhcmVudC50cmVlTW9kZWwgIT09IGZyb21QYXJlbnQudHJlZU1vZGVsKSB7XG4gICAgICB0by5wYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuZmlyZUV2ZW50KHtcbiAgICAgIGV2ZW50TmFtZTogVFJFRV9FVkVOVFMubW92ZU5vZGUsXG4gICAgICBub2RlOiBvcmlnaW5hbE5vZGUsXG4gICAgICB0bzogeyBwYXJlbnQ6IHRvLnBhcmVudC5kYXRhLCBpbmRleDogdG9JbmRleCB9LFxuICAgICAgZnJvbTogeyBwYXJlbnQ6IGZyb21QYXJlbnQuZGF0YSwgaW5kZXg6IGZyb21JbmRleH1cbiAgICB9KTtcbiAgfVxuXG4gIEBhY3Rpb24gY29weU5vZGUobm9kZSwgdG8pIHtcbiAgICBjb25zdCBmcm9tSW5kZXggPSBub2RlLmdldEluZGV4SW5QYXJlbnQoKTtcblxuICAgIGlmICghdGhpcy5jYW5Nb3ZlTm9kZShub2RlLCB0bywgZnJvbUluZGV4KSkgcmV0dXJuO1xuXG4gICAgLy8gSWYgbm9kZSBkb2Vzbid0IGhhdmUgY2hpbGRyZW4gLSBjcmVhdGUgY2hpbGRyZW4gYXJyYXlcbiAgICBpZiAoIXRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xuICAgICAgdG8ucGFyZW50LnNldEZpZWxkKCdjaGlsZHJlbicsIFtdKTtcbiAgICB9XG4gICAgY29uc3QgdG9DaGlsZHJlbiA9IHRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcblxuICAgIGNvbnN0IG5vZGVDb3B5ID0gdGhpcy5vcHRpb25zLmdldE5vZGVDbG9uZShub2RlKTtcblxuICAgIHRvQ2hpbGRyZW4uc3BsaWNlKHRvLmluZGV4LCAwLCBub2RlQ29weSk7XG5cbiAgICBub2RlLnRyZWVNb2RlbC51cGRhdGUoKTtcbiAgICBpZiAodG8ucGFyZW50LnRyZWVNb2RlbCAhPT0gbm9kZS50cmVlTW9kZWwpIHtcbiAgICAgIHRvLnBhcmVudC50cmVlTW9kZWwudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmNvcHlOb2RlLCBub2RlOiBub2RlQ29weSwgdG86IHsgcGFyZW50OiB0by5wYXJlbnQuZGF0YSwgaW5kZXg6IHRvLmluZGV4IH0gfSk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXhwYW5kZWROb2RlSWRzOiB0aGlzLmV4cGFuZGVkTm9kZUlkcyxcbiAgICAgIHNlbGVjdGVkTGVhZk5vZGVJZHM6IHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkcyxcbiAgICAgIGFjdGl2ZU5vZGVJZHM6IHRoaXMuYWN0aXZlTm9kZUlkcyxcbiAgICAgIGhpZGRlbk5vZGVJZHM6IHRoaXMuaGlkZGVuTm9kZUlkcyxcbiAgICAgIGZvY3VzZWROb2RlSWQ6IHRoaXMuZm9jdXNlZE5vZGVJZFxuICAgIH07XG4gIH1cblxuICBAYWN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKCFzdGF0ZSkgcmV0dXJuO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICBleHBhbmRlZE5vZGVJZHM6IHN0YXRlLmV4cGFuZGVkTm9kZUlkcyB8fCB7fSxcbiAgICAgIHNlbGVjdGVkTGVhZk5vZGVJZHM6IHN0YXRlLnNlbGVjdGVkTGVhZk5vZGVJZHMgfHwge30sXG4gICAgICBhY3RpdmVOb2RlSWRzOiBzdGF0ZS5hY3RpdmVOb2RlSWRzIHx8IHt9LFxuICAgICAgaGlkZGVuTm9kZUlkczogc3RhdGUuaGlkZGVuTm9kZUlkcyB8fCB7fSxcbiAgICAgIGZvY3VzZWROb2RlSWQ6IHN0YXRlLmZvY3VzZWROb2RlSWRcbiAgICB9KTtcbiAgfVxuXG4gIHN1YnNjcmliZVRvU3RhdGUoZm4pIHtcbiAgICBhdXRvcnVuKCgpID0+IGZuKHRoaXMuZ2V0U3RhdGUoKSkpO1xuICB9XG5cbiAgY2FuTW92ZU5vZGUobm9kZSwgdG8sIGZyb21JbmRleCA9IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGZyb21Ob2RlSW5kZXggPSBmcm9tSW5kZXggfHwgbm9kZS5nZXRJbmRleEluUGFyZW50KCk7XG5cbiAgICAvLyBzYW1lIG5vZGU6XG4gICAgaWYgKG5vZGUucGFyZW50ID09PSB0by5wYXJlbnQgJiYgZnJvbUluZGV4ID09PSB0by5pbmRleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhdG8ucGFyZW50LmlzRGVzY2VuZGFudE9mKG5vZGUpO1xuICB9XG5cbiAgY2FsY3VsYXRlRXhwYW5kZWROb2RlcygpIHtcbiAgICAgIHRoaXMuX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoKTtcbiAgfVxuXG4gIC8vIHByaXZhdGUgbWV0aG9kc1xuICBwcml2YXRlIF9maWx0ZXJOb2RlKGlkcywgbm9kZSwgZmlsdGVyRm4sIGF1dG9TaG93KSB7XG4gICAgLy8gaWYgbm9kZSBwYXNzZXMgZnVuY3Rpb24gdGhlbiBpdCdzIHZpc2libGVcbiAgICBsZXQgaXNWaXNpYmxlID0gZmlsdGVyRm4obm9kZSk7XG5cbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgLy8gaWYgb25lIG9mIG5vZGUncyBjaGlsZHJlbiBwYXNzZXMgZmlsdGVyIHRoZW4gdGhpcyBub2RlIGlzIGFsc28gdmlzaWJsZVxuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fZmlsdGVyTm9kZShpZHMsIGNoaWxkLCBmaWx0ZXJGbiwgYXV0b1Nob3cpKSB7XG4gICAgICAgICAgaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbWFyayBub2RlIGFzIGhpZGRlblxuICAgIGlmICghaXNWaXNpYmxlKSB7XG4gICAgICBpZHNbbm9kZS5pZF0gPSB0cnVlO1xuICAgIH1cbiAgICAvLyBhdXRvIGV4cGFuZCBwYXJlbnRzIHRvIG1ha2Ugc3VyZSB0aGUgZmlsdGVyZWQgbm9kZXMgYXJlIHZpc2libGVcbiAgICBpZiAoYXV0b1Nob3cgJiYgaXNWaXNpYmxlKSB7XG4gICAgICBub2RlLmVuc3VyZVZpc2libGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmlzaWJsZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoc3RhcnROb2RlID0gbnVsbCkge1xuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xuXG4gICAgaWYgKHN0YXJ0Tm9kZS5kYXRhW3RoaXMub3B0aW9ucy5pc0V4cGFuZGVkRmllbGRdKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W3N0YXJ0Tm9kZS5pZF06IHRydWV9KTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0Tm9kZS5jaGlsZHJlbikge1xuICAgICAgc3RhcnROb2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLl9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKGNoaWxkKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0QWN0aXZlTm9kZVNpbmdsZShub2RlLCB2YWx1ZSkge1xuICAgIC8vIERlYWN0aXZhdGUgYWxsIG90aGVyIG5vZGVzOlxuICAgIHRoaXMuYWN0aXZlTm9kZXNcbiAgICAgIC5maWx0ZXIoKGFjdGl2ZU5vZGUpID0+IGFjdGl2ZU5vZGUgIT09IG5vZGUpXG4gICAgICAuZm9yRWFjaCgoYWN0aXZlTm9kZSkgPT4ge1xuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuZGVhY3RpdmF0ZSwgbm9kZTogYWN0aXZlTm9kZSB9KTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm5vZGVEZWFjdGl2YXRlLCBub2RlOiBhY3RpdmVOb2RlIH0pOyAvLyBGb3IgSUUxMVxuICAgICAgfSk7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuYWN0aXZlTm9kZUlkcyA9IHtbbm9kZS5pZF06IHRydWV9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlTm9kZUlkcyA9IHt9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEFjdGl2ZU5vZGVNdWx0aShub2RlLCB2YWx1ZSkge1xuICAgIHRoaXMuYWN0aXZlTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWN0aXZlTm9kZUlkcywge1tub2RlLmlkXTogdmFsdWV9KTtcbiAgfVxuXG59XG4iXX0=