describe('ChatScreenTest', () => {
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
  
    it('should navigate to chat screen', async () => {
      await element(by.id('chat_screen_btn')).tap();
      await expect(element(by.id('chat_screen_title'))).toBeVisible();
    });
  
    it('should search for a user', async () => {
      await element(by.id('user_search_bar')).typeText('userToFind');
      await device.pressBack(); //dismiss keyboard
      await element(by.id('user_search_btn')).tap();
      await expect(element(by.id('user_item_1'))).toBeVisible();
    });
  
    it('should select the user and open the chat', async () => {
      await element(by.id('user_item_1')).tap();
      await expect(element(by.id('chat_view'))).toBeVisible();
    });
  
    it('should type and send a message', async () => {
      await element(by.id('message_input')).typeText('Hello, this is a test message.');
      await device.pressBack(); //dismiss keyboard
      await element(by.id('send_message_btn')).tap();
    });
  
    it('should display the sent message', async () => {
      await expect(element(by.text('Hello, this is a test message.'))).toBeVisible();
    });
  });
  