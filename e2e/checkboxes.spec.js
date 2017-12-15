const { browser, element, by, $ } = require('protractor');
const { TreeDriver } = require('./helpers/tree.driver');

describe('Checkboxes', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/#/checkboxes');
    browser.sleep(2);
    
    this.tree = new TreeDriver('tree-root');
    this.root1 = () => this.tree.getNode('root1');
    this.root2 = () => this.tree.getNode('root2');
    this.root2().clickExpander();
    this.child2 = () => this.tree.getNode('child2');
    this.child2().clickExpander();
    this.grandchild2 = () => this.tree.getNode('grandchild2');
  });

  it('should show the tree', () => {
    expect(this.tree.isPresent()).toBe(true);
  });

  it('should show checkboxes', () => {
    expect(this.root1().getCheckbox().isPresent()).toBe(true);
  });

  it('should not be checked', () => {
    expect(this.root1().isChecked()).toBe(false);
    expect(this.child2().isChecked()).toBe(false);
    expect(this.grandchild2().isChecked()).toBe(false);
  });

  it('should not be indeterminate', () => {
    expect(this.root1().getIndeterminate()).toBe(null);
    expect(this.child2().getIndeterminate()).toBe(null);
    expect(this.grandchild2().getIndeterminate()).toBe(null);
  });

  it('should check leaf and make ancestors indeterminate', () => {
    this.grandchild2().clickCheckbox();
    expect(this.root2().isChecked()).toBe(true);
    expect(this.child2().isChecked()).toBe(true);
    expect(this.grandchild2().isChecked()).toBe(true);
    expect(this.root2().getIndeterminate()).toBe('true');
    expect(this.child2().getIndeterminate()).toBe('true');
    expect(this.grandchild2().getIndeterminate()).toBe(null);
  });

  it('should check all descendants when selecting root2', () => {
    this.root2().clickCheckbox();
    expect(this.root2().isChecked()).toBe(true);
    expect(this.child2().isChecked()).toBe(true);
    expect(this.grandchild2().isChecked()).toBe(true);
    expect(this.root2().getIndeterminate()).toBe(null);
    expect(this.child2().getIndeterminate()).toBe(null);
    expect(this.grandchild2().getIndeterminate()).toBe(null);
  });

  it('should make ancestor indeterminate when unchecking desendant', () => {
    this.root2().clickCheckbox();
    this.grandchild2().clickCheckbox();
    expect(this.root2().isChecked()).toBe(true);
    expect(this.child2().isChecked()).toBe(true);
    expect(this.grandchild2().isChecked()).toBe(false);
    expect(this.root2().getIndeterminate()).toBe('true');
    expect(this.child2().getIndeterminate()).toBe('true');
    expect(this.grandchild2().getIndeterminate()).toBe(null);
  });
});
