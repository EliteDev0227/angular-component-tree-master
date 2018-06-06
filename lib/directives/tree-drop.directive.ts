import {
  Directive, Output, Input, EventEmitter, HostListener, Renderer, ElementRef, NgZone, AfterViewInit, OnDestroy
} from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';

@Directive({
  selector: '[treeDrop]'
})
export class TreeDropDirective implements AfterViewInit, OnDestroy {
  @Output('treeDrop') onDropCallback = new EventEmitter();
  @Output('treeDropDragOver') onDragOverCallback = new EventEmitter();
  @Output('treeDropDragLeave') onDragLeaveCallback = new EventEmitter();
  @Output('treeDropDragEnter') onDragEnterCallback = new EventEmitter();
  private readonly dragOverEventHandler: (ev: DragEvent) => void;
  private readonly dragEnterEventHandler: (ev: DragEvent) => void;
  private readonly dragLeaveEventHandler: (ev: DragEvent) => void;

  private _allowDrop = (element, $event) => true;
  @Input() set treeAllowDrop(allowDrop) {
    if (allowDrop instanceof Function) {
      this._allowDrop = allowDrop;
    }
    else this._allowDrop = (element, $event) => allowDrop;
  }
  allowDrop($event) {
    return this._allowDrop(this.treeDraggedElement.get(), $event);
  }

  constructor(private el: ElementRef, private renderer: Renderer, private treeDraggedElement: TreeDraggedElement, private ngZone: NgZone) {
      this.dragOverEventHandler = this.onDragOver.bind(this);
      this.dragEnterEventHandler = this.onDragEnter.bind(this);
      this.dragLeaveEventHandler = this.onDragLeave.bind(this);
  }

  ngAfterViewInit() {
    let el: HTMLElement = this.el.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      el.addEventListener('dragover', this.dragOverEventHandler);
      el.addEventListener('dragenter', this.dragEnterEventHandler);
      el.addEventListener('dragleave', this.dragLeaveEventHandler);
    });
  }

  ngOnDestroy() {
    let el: HTMLElement = this.el.nativeElement;
    el.removeEventListener('dragover', this.dragOverEventHandler);
    el.removeEventListener('dragenter', this.dragEnterEventHandler);
    el.removeEventListener('dragleave', this.dragLeaveEventHandler);
  }

  onDragOver($event) {
    if (!this.allowDrop($event)) return this.addDisabledClass();

    this.onDragOverCallback.emit({event: $event, element: this.treeDraggedElement.get()});

    $event.preventDefault();
    this.addClass();
  }

  onDragEnter($event) {
    if (!this.allowDrop($event)) return;

    this.onDragEnterCallback.emit({event: $event, element: this.treeDraggedElement.get()});
  }

  onDragLeave($event) {
    if (!this.allowDrop($event)) return this.removeDisabledClass();

    this.onDragLeaveCallback.emit({event: $event, element: this.treeDraggedElement.get()});

    this.removeClass();
  }

  @HostListener('drop', ['$event']) onDrop($event) {
    if (!this.allowDrop($event)) return;

    $event.preventDefault();
    this.onDropCallback.emit({event: $event, element: this.treeDraggedElement.get()});
    this.removeClass();
    this.treeDraggedElement.set(null);
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
