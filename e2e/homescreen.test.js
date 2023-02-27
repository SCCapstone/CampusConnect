describe('NavigateHomescreen', () => {
    beforeAll(async () => {
      await device.launchApp();
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