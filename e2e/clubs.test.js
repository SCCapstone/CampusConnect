describe('ClubsScreenTest', () => {
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
  
    it('should navigate to clubs screen', async () => {
      await element(by.id('clubs_screen_btn')).tap();
      await expect(element(by.id('clubs_screen_title'))).toBeVisible();
    });
  
    it('should display clubs', async () => {
      await expect(element(by.id('clubs_list'))).toBeVisible();
      await expect(element(by.id('club_item_1'))).toBeVisible();
    });
  });
  