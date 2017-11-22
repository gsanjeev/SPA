import { HomeMgmtPage } from './app.po';

describe('home-mgmt App', () => {
  let page: HomeMgmtPage;

  beforeEach(() => {
    page = new HomeMgmtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
