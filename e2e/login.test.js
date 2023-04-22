describe('LoginTest', () => {
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
});