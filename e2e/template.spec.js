const { browser, element, by, $ } = require('protractor');
const { TreeDriver } = require('./helpers/tree.driver');

describe('Basic Configuration', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/#/templates');
    browser.sleep(2);
  });

  ['#tree1', '#tree2', '#tree3'].forEach((treeId) => {
    describe(`${treeId}`, () => {
      beforeEach(() => {
        this.tree = new TreeDriver(treeId);
      });

      it('should show the tree', () => {
        expect(this.tree.isPresent()).toBe(true);
      });

      it('should have 2 nodes', () => {
        expect(this.tree.getNodes().count()).toEqual(2);
      });

      it('should use the template and pass it a node var', () => {
        const root1Title = this.tree.element.element(by.cssContainingText('.root1Class', 'root1'));

        expect(root1Title.isPresent()).toBe(true);
      });

      it('should use the template and pass it an index var', () => {
        const root1Index = this.tree.element.element(by.cssContainingText('.root1ClassIndex', '0'));

        expect(root1Index.isPresent()).toBe(true);
      });
    });
  });
  describe(`loading component`, () => {
    beforeEach(() => {
      this.tree = new TreeDriver('#tree1');
      this.root2 = () => this.tree.getNodeByIndex(1);
    });

    it('should show the loading template', () => {
      this.root2().clickExpander();
      const loadingComponent = this.tree.element.element(by.cssContainingText('.root2ClassLoading', 'Loading root2...'));

      expect(loadingComponent.isPresent()).toBe(true);
    });
  });
});
