describe('EditProfileScreenTest', () => {
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
  
    it('should navigate to edit profile screen', async () => {
      await element(by.id('edit_profile_screen_btn')).tap();
      await expect(element(by.id('edit_profile_screen_title'))).toBeVisible();
    });
  
    it('should click the profile picture and select a new one', async () => {
      await element(by.id('profile_picture')).tap();
      await element(by.id('photo_picker_option')).tap();
      // fix this later
      await element(by.id('mocked_image')).tap();
    });
  
    it('should change the major', async () => {
        await element(by.id('major')).tap();
        await waitFor(element(by.text('Anthropology'))).toBeVisible().withTimeout(5000)
        await element(by.text('Anthropology')).tap();
    });
  
    it('should update the person bio', async () => {
      await element(by.id('bio_input')).replaceText('This is an updated bio for testing purposes.');
      await device.pressBack(); //dismiss keyboard
    });
  
    it('should click submit', async () => {
      await element(by.id('submit_changes_btn')).tap();
    });
    it('should click finish button', async () => {
        await element(by.id('finish_btn')).tap();
    });
    it('should show homescreen search', async () => {
        await expect(element(by.id('searchBar'))).toBeVisible();
      });
    
    it('should open the drawer menu', async () => {
    await element(by.id('drawer_menu_btn')).tap();
    });
    
    it('should navigate to edit profile screen', async () => {
    await element(by.id('edit_profile_screen_btn')).tap();
    await expect(element(by.id('edit_profile_screen_title'))).toBeVisible();
    });
  
    it('should display the updated major and bio in the profile', async () => {
      await expect(element(by.text('Anthropology'))).toBeVisible();
      await expect(element(by.text('This is an updated bio for testing purposes.'))).toBeVisible();
    });
  });
  