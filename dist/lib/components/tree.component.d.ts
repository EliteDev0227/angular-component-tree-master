import { OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { ITreeOptions, TreeNode } from '../defs/api';
import { TreeViewportComponent } from './tree-viewport.component';
import * as i0 from "@angular/core";
export declare class TreeComponent implements OnChanges {
    treeModel: TreeModel;
    treeDraggedElement: TreeDraggedElement;
    _nodes: any[];
    _options: TreeOptions;
    loadingTemplate: TemplateRef<any>;
    treeNodeTemplate: TemplateRef<any>;
    treeNodeWrapperTemplate: TemplateRef<any>;
    treeNodeFullTemplate: TemplateRef<any>;
    viewportComponent: TreeViewportComponent;
    set nodes(nodes: any[]);
    set options(options: ITreeOptions);
    set focused(value: boolean);
    set state(state: any);
    toggleExpanded: any;
    activate: any;
    deactivate: any;
    nodeActivate: any;
    nodeDeactivate: any;
    select: any;
    deselect: any;
    focus: any;
    blur: any;
    updateData: any;
    initialized: any;
    moveNode: any;
    copyNode: any;
    loadNodeChildren: any;
    changeFilter: any;
    event: any;
    stateChange: any;
    constructor(treeModel: TreeModel, treeDraggedElement: TreeDraggedElement);
    onKeydown($event: any): void;
    onMousedown($event: any): void;
    ngOnChanges(changes: any): void;
    sizeChanged(): void;
    private pick;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeComponent, "Tree, tree-root", never, { "nodes": "nodes"; "options": "options"; "focused": "focused"; "state": "state"; }, { "toggleExpanded": "toggleExpanded"; "activate": "activate"; "deactivate": "deactivate"; "nodeActivate": "nodeActivate"; "nodeDeactivate": "nodeDeactivate"; "select": "select"; "deselect": "deselect"; "focus": "focus"; "blur": "blur"; "updateData": "updateData"; "initialized": "initialized"; "moveNode": "moveNode"; "copyNode": "copyNode"; "loadNodeChildren": "loadNodeChildren"; "changeFilter": "changeFilter"; "event": "event"; "stateChange": "stateChange"; }, ["loadingTemplate", "treeNodeTemplate", "treeNodeWrapperTemplate", "treeNodeFullTemplate"], never>;
}
export declare class TreeNodeComponent {
    node: TreeNode;
    index: number;
    templates: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeNodeComponent, "TreeNode, tree-node", never, { "node": "node"; "index": "index"; "templates": "templates"; }, {}, never, never>;
}
export declare class TreeNodeCollectionComponent implements OnInit, OnDestroy {
    get nodes(): any;
    set nodes(nodes: any);
    treeModel: TreeModel;
    _nodes: any;
    private virtualScroll;
    templates: any;
    viewportNodes: TreeNode[];
    get marginTop(): string;
    _dispose: any[];
    setNodes(nodes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    trackNode(index: any, node: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeNodeCollectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeNodeCollectionComponent, "tree-node-collection", never, { "nodes": "nodes"; "treeModel": "treeModel"; "templates": "templates"; }, {}, never, never>;
}
export declare class TreeNodeChildrenComponent {
    node: TreeNode;
    templates: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeNodeChildrenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeNodeChildrenComponent, "tree-node-children", never, { "node": "node"; "templates": "templates"; }, {}, never, never>;
}
