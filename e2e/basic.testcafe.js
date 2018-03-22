import { Selector } from 'testcafe';
import { TreeDriver } from './helpers/tree.driver';

fixture.skip `Basic`
  .page `http://localhost:4200/#/basic`
  .beforeEach( async t => {
    t.ctx.tree = new TreeDriver('tree-root');
    t.ctx.root1 = t.ctx.tree.getNode('root1');
    t.ctx.root2 = t.ctx.tree.getNode('root2');
    t.ctx.root3 = t.ctx.tree.getNode('root3');
    t.ctx.root4 = t.ctx.tree.getNode('root4');
    t.ctx.root5 = t.ctx.tree.getNode('root5');
  });

test('should show the tree', async t => {
  await t.expect(t.ctx.tree.isPresent()).toBe(true);
});

test('should have 5 nodes', async t => {
  await t.expect(t.ctx.tree.getNodes().count).toEqual(5);
});

test('should have a node named root1', async t => {
  await t.expect(t.ctx.root1.isPresent()).toBe(true);
});

test('roots with children should have an expander icon', async t => {
  await t.expect(t.ctx.root1.getExpander().isPresent()).toBe(true)
    .expect(t.ctx.root2.getExpander().isPresent()).toBe(true);
});

test('roots with children should not have an expander icon', async t => {
  await t.expect(t.ctx.root3.getExpander().isPresent()).toBe(false)
    .expect(t.ctx.root4.getExpander().isPresent()).toBe(false)
    .expect(t.ctx.root5.getExpander().isPresent()).toBe(false);
});

test('roots with children should start collapsed', async t => {
  await t.expect(t.ctx.root1.getChildren().isPresent()).toBe(false)
    .expect(t.ctx.root1.isExpanded()).toBe(false);
});

test('should expand & collapse children on click expander', async t => {
  await t.ctx.root1.clickExpander(t);
  await t.expect(t.ctx.root1.getChildren().isPresent()).toBe(true)
    .expect(t.ctx.root1.isExpanded()).toBe(true);
  await t.ctx.root1.clickExpander(t);
  await t.expect(t.ctx.root1.getChildren().isPresent()).toBe(false)
    .expect(t.ctx.root1.isExpanded()).toBe(false);
});

test('should start inactive', async t => {
  await t.expect(t.ctx.root1.isActive()).toBe(false);
});

test('should activate & deactivate nodes on click', async t => {
  await t.ctx.root1.click(t);
  await t.expect(t.ctx.root1.isActive()).toBe(true)
    .expect(t.ctx.root2.isActive()).toBe(false);
  await t.ctx.root2.click(t);
  await t.expect(t.ctx.root1.isActive()).toBe(false)
    .expect(t.ctx.root2.isActive()).toBe(true);
});

test('should start without focus', async t => {
  await t.expect(t.ctx.root1.isFocused()).toBe(false);
});

test('should focus on a node on click', async t => {
  await t.ctx.root1.click(t);
  await t.expect(t.ctx.root1.isFocused()).toBe(true)
    .expect(t.ctx.root2.isFocused()).toBe(false);
  await t.ctx.root2.click(t);
  await t.expect(t.ctx.root1.isFocused()).toBe(false)
    expect(t.ctx.root2.isFocused()).toBe(true);
});

test('should navigate with keys', async t => {
  await t.ctx.tree.keyDown(t);
  await t.expect(t.ctx.root1.isFocused()).toBe(true);
  await t.ctx.tree.keyRight(t);
  await t.expect(t.ctx.root1.isExpanded()).toBe(true);
  await t.ctx.tree.keyRight(t);

  const child1 = t.ctx.tree.getNode('child1');
  const child2 = t.ctx.tree.getNode('child2');

  await t.expect(child1.isFocused()).toBe(true);
  await t.ctx.tree.keyRight(t);
  await t.expect(child1.isFocused()).toBe(true);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keyDown(t);
  await t.expect(t.ctx.root2.isFocused()).toBe(true);
  await t.ctx.tree.keyUp(t);
  await t.expect(child2.isFocused()).toBe(true);
  await t.ctx.tree.keyLeft(t);
  await t.expect(t.ctx.root1.isFocused()).toBe(true);
  await t.ctx.tree.keyLeft(t);
  await t.expect(t.ctx.root1.isExpanded()).toBe(false);
  await t.ctx.tree.keyDown(t);
  await t.expect(t.ctx.root2.isFocused()).toBe(true);
  await t.ctx.tree.keyUp(t);
  await t.expect(t.ctx.root1.isFocused()).toBe(true);
});

test('should toggle active on space', async t => {
  await t.expect(t.ctx.root1.isActive()).toBe(false);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keySpace(t);
  await t.expect(t.ctx.root1.isActive()).toBe(true);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keySpace(t);
  await t.expect(t.ctx.root2.isActive()).toBe(true);
  await t.ctx.tree.keySpace(t);
  await t.expect(t.ctx.root2.isActive()).toBe(false);
});

test('should toggle active on enter', async t => {
  await t.expect(t.ctx.root1.isActive()).toBe(false);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keyEnter(t);
  await t.expect(t.ctx.root1.isActive()).toBe(true);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keyEnter(t);
  await t.expect(t.ctx.root2.isActive()).toBe(true);
  await t.ctx.tree.keyEnter(t);
  await t.expect(t.ctx.root2.isActive()).toBe(false);
});

test('should not show checkboxes', async t => {
  expect(t.ctx.root1.getCheckbox().isPresent()).toBe(false);
});

