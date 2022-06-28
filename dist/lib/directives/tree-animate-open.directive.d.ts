import { Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TreeAnimateOpenDirective {
    private renderer;
    private templateRef;
    private viewContainerRef;
    private _isOpen;
    animateSpeed: number;
    animateAcceleration: number;
    isEnabled: boolean;
    set isOpen(value: boolean);
    private innerElement;
    constructor(renderer: Renderer2, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
    private _show;
    private _hide;
    private _animateOpen;
    private _animateClose;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeAnimateOpenDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TreeAnimateOpenDirective, "[treeAnimateOpen]", never, { "animateSpeed": "treeAnimateOpenSpeed"; "animateAcceleration": "treeAnimateOpenAcceleration"; "isEnabled": "treeAnimateOpenEnabled"; "isOpen": "treeAnimateOpen"; }, {}, never>;
}
