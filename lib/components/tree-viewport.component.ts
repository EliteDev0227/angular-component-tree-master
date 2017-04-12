import {
  Component, ElementRef, ViewEncapsulation, HostListener, AfterViewInit, OnInit, OnDestroy
} from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { deprecatedSelector } from '../deprecated-selector';

import { throttle } from 'lodash-es/throttle';

const SCROLL_REFRESH_INTERVAL = 17;

const isFirefox = navigator && navigator.userAgent && navigator.userAgent.indexOf('Firefox') > -1;

@Component({
  selector: 'TreeViewport, tree-viewport',
  styles: [
    `:host {
      height: 100%;
      overflow: auto;
      display: block;
    }`
  ],
  providers: [TreeVirtualScroll],
  template: `
    <ng-container *mobxAutorun>
      <div [style.height]="getTotalHeight()">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `
})
export class TreeViewportComponent implements AfterViewInit, OnInit, OnDestroy {
  _debounceOnVirtualScroll: () => void;

  constructor(
    private elementRef: ElementRef,
    public virtualScroll: TreeVirtualScroll) {

    deprecatedSelector('TreeNode', 'tree-node', elementRef);
    this._debounceOnVirtualScroll = throttle(this._onVirtualScroll.bind(this), SCROLL_REFRESH_INTERVAL);
  }

  ngOnInit() {
    this.virtualScroll.init();
  }

  ngAfterViewInit() {
    setTimeout(() => this._onVirtualScroll());
  }

  ngOnDestroy() {
    this.virtualScroll.clear();
  }

  @HostListener('scroll', ['$event'])
  onScroll(e) {
    this._onWheel(e);
  }

  getTotalHeight() {
    return this.virtualScroll.isEnabled() && this.virtualScroll.totalHeight + 'px' || 'auto';
  }

  _onWheel(e) {
    this._onVirtualScroll();
  }

  _onVirtualScroll() {
    this.virtualScroll.setNewScroll({ viewport: this.elementRef.nativeElement });
  }
}
