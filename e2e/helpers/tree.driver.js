const { Key, browser, ElementArrayFinder, ElementFinder, WebElement, by, element, $, $$, promise } = require('protractor');
const { code: htmlDnd } = require('html-dnd');

function hasClass(element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

function dragAndDrop(from, to) {
  browser.executeScript(htmlDnd, from, to, 0, 0);
}

class BaseDriver {
  constructor(element) {
    this.element = element;
  }

  isPresent() {
    return this.element.isPresent();
  }

  getNodes() {
    return this.element.$$('tree-node');
  }

  getNode(name) {
    const element = this.getNodes().filter((el) => {
      return el.$('tree-node-content span').getText().then((text) => text === name);
    }).get(0);

    return new NodeDriver(element);
  }
}

class NodeDriver extends BaseDriver {

  isPresent() {
    return this.element.isPresent();
  }

  isActive() {
    return hasClass(this.getTreeNodeElement(), 'tree-node-active');
  }

  isFocused() {
    return hasClass(this.getTreeNodeElement(), 'tree-node-focused');
  }

  isExpanded() {
    return hasClass(this.getTreeNodeElement(), 'tree-node-expanded');
  }

  isChecked() {
    return this.getCheckbox().isSelected();
  }

  getIndeterminate() {
    return this.getCheckbox().getAttribute('indeterminate');
  }

  getTreeNodeElement() {
    return this.element.$('.tree-node');
  }

  getNodeContentWrapper() {
    return this.element.$('.node-content-wrapper');
  }

  getExpander() {
    return this.element.$('.toggle-children-wrapper');
  }

  getCheckbox() {
    return this.element.$('.tree-node-checkbox');
  }
  
  getChildren() {
    return this.element.$('.tree-children');
  }

  getDropSlot(index = 0) {
    return this.element.$$('.node-drop-slot').get(index);
  }

  clickExpander() {
    return this.getExpander().click();
  }

  clickCheckbox() {
    return this.getCheckbox().click();
  }

  click() {
    return this.getNodeContentWrapper().click();
  }
  dblclick() {

  }
  contextMenu() {

  }
  dragToNode(node) {
    dragAndDrop(
      this.getNodeContentWrapper(),
      node.getNodeContentWrapper()
    );
  }
  dragToDropSlot(node) {
    dragAndDrop(
      this.getNodeContentWrapper(),
      node.getDropSlot()
    );
  }
}

class TreeDriver extends BaseDriver {
  constructor(elementCss) {
    super($(elementCss));
  }

  getNodeByIndex(index) {
    const element = this.getNodes().get(index);

    return new NodeDriver(element);
  }

  sendKey(key) {
    browser.actions().sendKeys(key).perform();
  }

  keyDown() {
    this.sendKey(Key.ARROW_DOWN);
  }
  keyUp() {
    this.sendKey(Key.ARROW_UP);
  }
  keyLeft() {
    this.sendKey(Key.ARROW_LEFT);
  }
  keyRight() {
    this.sendKey(Key.ARROW_RIGHT);
  }
  keyEnter() {
    this.sendKey(Key.ENTER);
  }
  keySpace() {
    this.sendKey(Key.SPACE);
  }
}

class InputDriver {
  constructor(element) {
    this.element = element;
  }
}

module.exports = {
  dragAndDrop,
  InputDriver,
  NodeDriver,
  TreeDriver
};
