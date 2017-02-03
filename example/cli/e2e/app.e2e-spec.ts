import { Cli2Page } from './app.po';

describe('cli2 App', function() {
  let page: Cli2Page;

  beforeEach(() => {
    page = new Cli2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
