import { Directive, Input, HostListener, Renderer, ElementRef, DoCheck } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { deprecatedSelector } from '../deprecated-selector';

const DRAG_OVER_CLASS = 'is-dragging-over';

@Directive({
  selector: '[treeDrag], [tree-drag]'
})
export class TreeDragDirective implements DoCheck {
  @Input('treeDrag') draggedElement;
  @Input() treeDragEnabled;

  constructor(private el: ElementRef, private renderer: Renderer, private treeDraggedElement: TreeDraggedElement) {
    deprecatedSelector('[treeDrag]', '[tree-drag]', el);
  }

  ngDoCheck() {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? 'true' : 'false');
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
