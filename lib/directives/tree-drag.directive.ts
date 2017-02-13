import { Directive, Input, HostListener, Renderer, ElementRef, DoCheck } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';

const DRAG_OVER_CLASS = 'is-dragging-over';

@Directive({
  selector: '[treeDrag]'
})
export class TreeDragDirective implements DoCheck {
  private _allowDrag = (node) => true;

  @Input('treeDrag') draggedElement;
  @Input() set treeDragEnabled (allowDrag){
    if (allowDrag instanceof Function) {
      this._allowDrag = allowDrag;
    }
    else this._allowDrag = (node) => allowDrag;
  };
  allowDrag() {
    return this._allowDrag(this.draggedElement);
  }

  constructor(private el: ElementRef, private renderer: Renderer, private treeDraggedElement: TreeDraggedElement) {
  }

  ngDoCheck() {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', this._allowDrag(this.draggedElement) ? 'true' : 'false');
  }

  @HostListener('dragstart', ['$event']) onDragStart(ev) {
    // setting the data is required by firefox
    ev.dataTransfer.setData('text/plain', ev.target.id);
    setTimeout(() => this.treeDraggedElement.set(this.draggedElement), 30);
  }

  @HostListener('dragend') onDragEnd() {
    this.treeDraggedElement.set(null);
  }
}
