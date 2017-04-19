import { browser, element, by } from 'protractor';
import { TreeDriver } from './helpers/tree.driver';

describe('Custom Fields', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/#/fields');
  });

  describe('#tree1', () => {
    beforeEach(() => {
      this.tree = new TreeDriver('#tree1');
    });

    it('should show the tree', () => {
      expect(this.tree.isPresent()).toBe(true);
    });

    it('should have 2 nodes', () => {
      expect(this.tree.getNodes().count()).toEqual(2);
    });

    it ('should display the custom display field', () => {
      const root1 = this.tree.getNode('root1');

      expect(root1.isPresent()).toBe(true);
    });

    it('should use the nodeClass option', () => {
      const root1Title = this.tree.element.element(by.cssContainingText('.root1Class', 'root1'));

      expect(root1Title.isPresent()).toBe(true);
    });
  });
});
