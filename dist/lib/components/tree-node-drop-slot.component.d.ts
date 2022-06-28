import { TreeNode } from '../models/tree-node.model';
import * as i0 from "@angular/core";
export declare class TreeNodeDropSlot {
    node: TreeNode;
    dropIndex: number;
    onDrop($event: any): void;
    allowDrop(element: any, $event: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeNodeDropSlot, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeNodeDropSlot, "TreeNodeDropSlot, tree-node-drop-slot", never, { "node": "node"; "dropIndex": "dropIndex"; }, {}, never, never>;
}
