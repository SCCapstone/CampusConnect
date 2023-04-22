describe('CreatePostTest', () => {
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
  
    it('should open modal', async () => {
      await element(by.id('create_post_btn')).tap();
      await expect(element(by.id('post_input'))).toBeVisible();
    });
  
    it('should input post details', async () => {
      await element(by.id('post_body')).typeText('This is a sample post body text for testing purposes.');
      await device.pressBack(); //dismiss keyboard
    });
  
    it('should submit the post', async () => {
      await element(by.id('submit_post_btn')).tap();
    });
  
    it('should display the new post in the list', async () => {
      await expect(element(by.text('This is a sample post body text for testing purposes.'))).toBeVisible();
    });
  });
  