import { Directive, Output, Input, EventEmitter, HostListener, Renderer, ElementRef } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';

@Directive({
  selector: '[treeDrop]'
})
export class TreeDropDirective {
  @Output('treeDrop') onDropCallback = new EventEmitter();

  private _allowDrop = (element) => true;
  @Input() set treeAllowDrop(allowDrop) {
    if (allowDrop instanceof Function) {
      this._allowDrop = allowDrop;
    }
    else this._allowDrop = (element) => allowDrop;
  }
  allowDrop() {
    return this._allowDrop(this.treeDraggedElement.get());
  }

  constructor(private el: ElementRef, private renderer: Renderer, private treeDraggedElement:TreeDraggedElement) {
  }

  @HostListener('dragover', ['$event']) onDragOver($event) {
    if (!this.allowDrop()) return this.addDisabledClass();

    $event.preventDefault();
    this.addClass();
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event) {
    if (!this.allowDrop()) return this.removeDisabledClass();

    this.removeClass();
  }

  @HostListener('drop', ['$event']) onDrop($event) {
    if (!this.allowDrop()) return;

    $event.preventDefault();
    this.onDropCallback.emit({event:$event, element:this.treeDraggedElement.get()});
    this.removeClass();
  }

  private addClass() {
    this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, true);
  }

  private removeClass() {
    this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, false);
  }

  private addDisabledClass() {
    this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, true);
  }

  private removeDisabledClass() {
    this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, false);
  }
}
