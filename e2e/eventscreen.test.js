describe('EventsScreenTest', () => {
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
  
    it('should open the drawer menu', async () => {
      await element(by.id('drawer_menu_btn')).tap();
    });
  
    it('should navigate to events screen', async () => {
      await element(by.id('events_screen_btn')).tap();
      await expect(element(by.id('events_screen_title'))).toBeVisible();
    });
  
    it('should display events', async () => {
      await expect(element(by.id('events_list'))).toBeVisible();
      await expect(element(by.id('event_item_1'))).toBeVisible();
    });
  });
  