import {
  Component, ElementRef, ViewEncapsulation, HostListener, AfterViewInit, OnInit, OnDestroy
} from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';

import { throttle } from 'lodash';

const SCROLL_REFRESH_INTERVAL = 17;

const isFirefox = navigator && navigator.userAgent && navigator.userAgent.indexOf('Firefox') > -1;

@Component({
  selector: 'TreeViewport',
  styles: [
    `:host {
      height: 100%;
      overflow: auto;
      display: block;
    }`
  ],
  providers: [TreeVirtualScroll],
  template: `
    <div *mobxAutorun>
      <div [style.height]="virtualScroll.totalHeight + 'px'">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TreeViewportComponent implements AfterViewInit, OnInit, OnDestroy {
  _debounceOnVirtualScroll: () => void;

  constructor(
    private elementRef: ElementRef,
    private virtualScroll: TreeVirtualScroll) {
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

  _onWheel(e) {
    this._onVirtualScroll();
  }

  _onVirtualScroll() {
    this.virtualScroll.setNewScroll({ viewport: this.elementRef.nativeElement });
  }
}
