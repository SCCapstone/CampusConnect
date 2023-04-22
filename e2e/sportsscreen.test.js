describe('SportsScreenTest', () => {
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
  
    it('should navigate to sports screen', async () => {
      await element(by.id('sports_screen_btn')).tap();
      await expect(element(by.id('sports_screen_title'))).toBeVisible();
    });
  
    it('should display sports', async () => {
      await expect(element(by.id('sports_list'))).toBeVisible();
      await expect(element(by.id('sport_item_1'))).toBeVisible();
    });
  
    it('should click the sort button and change the sort mode to baseball', async () => {
      await element(by.id('sort_button')).tap();
      await element(by.label('Baseball')).tap();
      await expect(element(by.id('sports_screen_title'))).toBeVisible();
    });
  
    it('should display sports again after sorting', async () => {
      await expect(element(by.id('sports_list'))).toBeVisible();
      await expect(element(by.id('sport_item_1'))).toBeVisible();
    });
  });
  