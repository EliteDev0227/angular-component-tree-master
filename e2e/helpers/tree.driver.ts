import { browser, ElementArrayFinder, ElementFinder, WebElement, by, element, $, $$, promise } from 'protractor';

function hasClass(element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

export class NodeDriver {
  constructor(private element: ElementFinder) {}

  isPresent(): promise.Promise<boolean> {
    return this.element.isPresent();
  }

  isActive(): promise.Promise<boolean> {
    return hasClass(this.getTreeNodeElement(), 'tree-node-active');
  }

  isFocused(): promise.Promise<boolean> {
    return hasClass(this.getTreeNodeElement(), 'tree-node-focused');
  }

  isExpanded(): promise.Promise<boolean> {
    return hasClass(this.getTreeNodeElement(), 'tree-node-expanded');
  }

  getTreeNodeElement(): ElementFinder {
    return this.element.$('.tree-node');
  }

  getNodeContentWrapper(): ElementFinder {
    return this.element.$('.node-content-wrapper');
  }

  getExpander(): ElementFinder {
    return this.element.$('.toggle-children-wrapper');
  }

  getChildren(): ElementFinder {
    return this.element.$('.tree-children');
  }

  clickExpander(): promise.Promise<void> {
    return this.getExpander().click();
  }

  click(): promise.Promise<void> {
    return this.getNodeContentWrapper().click();
  }
}

export class TreeDriver {
  element: ElementFinder;

  constructor(elementCss) {
    this.element = $(elementCss);
  }

  isPresent(): promise.Promise<boolean> {
    return this.element.isPresent();
  }

  getNodes(): ElementArrayFinder {
    return this.element.$$('tree-node');
  }

  getNode(index): NodeDriver {
    const element = this.getNodes().get(index);;

    return new NodeDriver(element);
  }

  keyDown() {
  }
  keyUp() {
  }
  keyLeft() {
  }
  keyRight() {
  }
  keyEnter() {
  }
  keySpace() {
  }

  click(node) {

  }
  expand(node) {

  }
  dblclick(node) {

  }
  contextMenu(node) {

  }
  drag(node, element) {

  }
}

export class InputDriver {
  constructor(private element) {

  }
}
