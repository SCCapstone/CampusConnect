describe('CreateNewUser', () => {
  beforeAll(async () => {
    await device.launchApp();
  });


  it('should have welcome screen', async () => {
    await expect(element(by.id('title'))).toBeVisible();
  });
  it('should tap register btn', async () => {
    await element(by.id('registerbtn')).tap();
    await expect(element(by.id('forgotpassword'))).toBeVisible();
  });
  it('should input account info', async () => {
    await element(by.id('emailinput')).typeText('johnsena23@sc.edu');
    await element(by.id('passinput')).typeText('password');
    await element(by.id('passinput2')).typeText('password');
    await device.pressBack();
  });
  it('should click register btn', async () => {
    await element(by.id('registerbtn')).tap();
    await expect(element(by.id('image'))).toBeVisible();
  });
  it('should enter account details', async () => {
    await element(by.id('firstname')).typeText('John');
    await element(by.id('lastname')).typeText('Cena');
    await element(by.id('class')).setColumnToValue('Freshman');
    await element(by.id('major')).setColumnToValue('Anthropology'); 
  });
  it('should click register btn', async () => {
    await element(by.id('registerbtn')).tap();
  });
});
