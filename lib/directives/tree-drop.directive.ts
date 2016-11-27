import { Directive, Output, EventEmitter, HostListener, Renderer, ElementRef } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';

const DRAG_OVER_CLASS = 'is-dragging-over';

@Directive({
  selector: '[treeDrop]'
})
export class TreeDropDirective {
  @Output('treeDrop') onDropCallback = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer, private treeDraggedElement:TreeDraggedElement) {
  }

  @HostListener('dragover', ['$event']) onDragOver($event) {
    $event.preventDefault();
    this.addClass();
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event) {
    this.removeClass();
  }

  @HostListener('drop', ['$event']) onDrop($event) {
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
}
