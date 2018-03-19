import { Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class TreeAnimateOpenDirective {
    private renderer;
    private templateRef;
    private viewContainerRef;
    private _isOpen;
    animateSpeed: number;
    animateAcceleration: number;
    isEnabled: boolean;
    isOpen: boolean;
    private innerElement;
    constructor(renderer: Renderer, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
    private _show();
    private _hide();
    private _animateOpen();
    private _animateClose();
}
