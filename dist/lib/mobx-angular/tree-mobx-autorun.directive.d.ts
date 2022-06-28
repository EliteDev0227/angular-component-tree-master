import { ViewContainerRef, TemplateRef, OnInit, OnDestroy, EmbeddedViewRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TreeMobxAutorunDirective implements OnInit, OnDestroy {
    protected templateRef: TemplateRef<any>;
    protected viewContainer: ViewContainerRef;
    protected templateBindings: {};
    protected dispose: any;
    protected view: EmbeddedViewRef<any>;
    treeMobxAutorun: any;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    ngOnInit(): void;
    shouldDetach(): any;
    autoDetect(view: EmbeddedViewRef<any>): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeMobxAutorunDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TreeMobxAutorunDirective, "[treeMobxAutorun]", never, { "treeMobxAutorun": "treeMobxAutorun"; }, {}, never>;
}
