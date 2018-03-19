import { EventEmitter, Renderer, ElementRef } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
export declare class TreeDropDirective {
    private el;
    private renderer;
    private treeDraggedElement;
    onDropCallback: EventEmitter<{}>;
    onDragOverCallback: EventEmitter<{}>;
    onDragLeaveCallback: EventEmitter<{}>;
    onDragEnterCallback: EventEmitter<{}>;
    private _allowDrop;
    treeAllowDrop: any;
    allowDrop($event: any): boolean;
    constructor(el: ElementRef, renderer: Renderer, treeDraggedElement: TreeDraggedElement);
    onDragOver($event: any): void;
    onDragEnter($event: any): void;
    onDragLeave($event: any): void;
    onDrop($event: any): void;
    private addClass();
    private removeClass();
    private addDisabledClass();
    private removeDisabledClass();
}
