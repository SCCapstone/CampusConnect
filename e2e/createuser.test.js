

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
    await element(by.id('emailinput')).typeText('johnsena22@sc.edu');
    await element(by.id('passinput')).typeText('password');
    await element(by.id('passinput2')).typeText('password');
    await device.pressBack();
    await element(by.id('registerbtn')).tap();
  });
  it('should have registration screen', async () => {
    await waitFor(element(by.id('regview'))).toBeVisible().withTimeout(5000)
  });
  it('should enter account details', async () => {
    await element(by.id('firstname')).typeText('John');
    await element(by.id('lastname')).typeText('Cena');
    await element(by.id('class')).tap();
    await element(by.id('class')).tap();
    await waitFor(element(by.text('Freshman'))).toBeVisible().withTimeout(5000)
    await element(by.text('Freshman')).tap();
    await element(by.id('major')).tap();
    await waitFor(element(by.text('Anthropology'))).toBeVisible().withTimeout(5000)
    await element(by.text('Anthropology')).tap();
    await element(by.id('registerbtn')).tap();
    await element(by.id('finishbtn')).tap();
  });
});
