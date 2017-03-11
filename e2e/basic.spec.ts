import { browser, element, by } from 'protractor';
import { TreeDriver } from './helpers/tree.driver';

describe('Basic Configuration', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/#/basic');

    this.tree = new TreeDriver('tree-root');
    this.root1 = this.tree.getNode(0);
    this.root2 = this.tree.getNode(1);
    this.root3 = this.tree.getNode(2);
    this.root4 = this.tree.getNode(3);
    this.root5 = this.tree.getNode(4);
  });

  it('should show the tree', () => {
    expect(this.tree.isPresent()).toBe(true);
  });

  it('should have 5 nodes', () => {
    expect(this.tree.getNodes().count()).toEqual(5);
  });

  it('should have a node named root1');

  it('roots with children should have an expander icon', () => {
    expect(this.root1.getExpander().isPresent()).toBe(true);
    expect(this.root2.getExpander().isPresent()).toBe(true);
  });

  it('roots with children should not have an expander icon', () => {
    expect(this.root3.getExpander().isPresent()).toBe(false);
    expect(this.root4.getExpander().isPresent()).toBe(false);
    expect(this.root5.getExpander().isPresent()).toBe(false);
  });

  it('roots with children should start collapsed', () => {
    expect(this.root1.getChildren().isPresent()).toBe(false);
    expect(this.root1.isExpanded()).toBe(false);
  });

  it('should expand & collapse children on click expander', () => {
    this.root1.clickExpander();
    expect(this.root1.getChildren().isPresent()).toBe(true);
    expect(this.root1.isExpanded()).toBe(true);
    this.root1.clickExpander();
    expect(this.root1.getChildren().isPresent()).toBe(false);
    expect(this.root1.isExpanded()).toBe(false);
  });

  it('should start inactive', () => {
    expect(this.root1.isActive()).toBe(false);
  });

  it('should activate & deactivate nodes on click', () => {
    this.root1.click();
    expect(this.root1.isActive()).toBe(true);
    expect(this.root2.isActive()).toBe(false);
    this.root2.click();
    expect(this.root1.isActive()).toBe(false);
    expect(this.root2.isActive()).toBe(true);
  });

  it('should start without focus', () => {
    expect(this.root1.isFocused()).toBe(false);
  });

  it('should focus on a node on click', () => {
    this.root1.click();
    expect(this.root1.isFocused()).toBe(true);
    expect(this.root2.isFocused()).toBe(false);
    this.root2.click();
    expect(this.root1.isFocused()).toBe(false);
    expect(this.root2.isFocused()).toBe(true);
  });
});
