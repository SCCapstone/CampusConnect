describe('NavigateHomescreen', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
it('should have welcome screen', async () => {
    await expect(element(by.id('title'))).toBeVisible();
    });
    it('should click login', async () => {
    await element(by.id('login_btn')).tap();
    });
    it('should input info', async () => {
    await element(by.id('emailInput')).typeText('test@sc.edu');
    await element(by.id('passInput')).typeText('password');
    await device.pressBack(); //dismiss keyboard
    await element(by.id('login_btn')).tap();
    });
    it('should show homescreen search', async () => {
    await expect(element(by.id('searchBar'))).toBeVisible();
    });
  
  it('should show events on side bar', async () => {
    await expect(element(by.id('events'))).toBeVisible();
  });
  it('should show chats on side bar', async () => {
    await expect(element(by.id('chats'))).toBeVisible();
  });
  it('should show clubs on side bar', async () => {
    await expect(element(by.id('clubs'))).toBeVisible();
  });
  it('should show sports on side bar', async () => {
    await expect(element(by.id('sports'))).toBeVisible();
  });
  it('should show alumni on side bar', async () => {
    await expect(element(by.id('alumni'))).toBeVisible();
  });
  it('should show alumni on side bar', async () => {
    await expect(element(by.id('alumni'))).toBeVisible();
  });
  it('should show search on side bar', async () => {
    await expect(element(by.id('edit'))).toBeVisible();
  });
});