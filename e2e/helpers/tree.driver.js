import { Selector } from 'testcafe';

class BaseDriver {
  constructor(selector) {
    this.selector = selector;
  }

  isPresent() {
    return this.selector.exists;
  }

  getNodes() {
    return this.selector.find('tree-node');
  }

  getNode(name) {
    const selector = this.getNodes().find('tree-node-content span').withText(name).parent('tree-node');

    return new NodeDriver(selector);
  }
}

class NodeDriver extends BaseDriver {

  isPresent() {
    return this.selector.exists;
  }

  isActive() {
    return this.getTreeNodeElement().hasClass('tree-node-active');
  }

  isFocused() {
    return this.getTreeNodeElement().hasClass('tree-node-focused');
  }

  isExpanded() {
    return this.getTreeNodeElement().hasClass('tree-node-expanded');
  }

  isChecked() {
    return this.getCheckbox().checked;
  }

  isIndeterminate() {
    return this.getCheckbox().addCustomDOMProperties({
      indeterminate: el => el.indeterminate
    }).indeterminate;
  }

  getTreeNodeElement() {
    return this.selector.find('.tree-node');
  }

  getNodeContentWrapper() {
    return this.selector.find('.node-content-wrapper');
  }

  getExpander() {
    return this.selector.find('.toggle-children-wrapper');
  }

  getCheckbox() {
    return this.selector.find('.tree-node-checkbox');
  }
  
  getChildren() {
    return this.selector.find('.tree-children');
  }

  getDropSlot(index = 0) {
    return this.selector.find('.node-drop-slot').nth(index);
  }

  clickExpander(t) {
    return t.click(this.getExpander());
  }

  clickCheckbox(t) {
    return t.click(this.getCheckbox());
  }

  click(t) {
    return t.click(this.getNodeContentWrapper());
  }
  dblclick(t) {

  }
  contextMenu(t) {

  }
  dragToNode(t, node) {
    return t.dragToElement(
      this.getNodeContentWrapper(),
      node.getNodeContentWrapper()
    );
  }
  dragToDropSlot(t, node) {
    return t.dragToElement(
      this.getNodeContentWrapper(),
      node.getDropSlot()
    );
  }
  ctrlDragToNode(t, node) {
    return t.dragToElement(
      this.getNodeContentWrapper(),
      node.getNodeContentWrapper(),
      {
        modifiers: {
          ctrl: true
        }
      }
    );
  }
}

class TreeDriver extends BaseDriver {
  constructor(elementCss) {
    super(Selector(elementCss));
  }

  getNodeByIndex(index) {
    const element = this.getNodes().nth(index);

    return new NodeDriver(element);
  }

  keyDown(t) {
    return t.keyPress(Key.ARROW_DOWN);
  }
  keyUp(t) {
    return t.keyPress(Key.ARROW_UP);
  }
  keyLeft(t) {
    return t.keyPress(Key.ARROW_LEFT);
  }
  keyRight(t) {
    return t.keyPress(Key.ARROW_RIGHT);
  }
  keyEnter(t) {
    return t.keyPress(Key.ENTER);
}
  keySpace(t) {
    return t.keyPress(Key.SPACE);
  }
}

module.exports = {
  NodeDriver,
  TreeDriver
};
