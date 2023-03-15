const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://garnetgate.sa.sc.edu/organizations');
  await page.waitForXPath('//*[@id="react-app"]/div/div/div/div[2]/div[3]/div/div[2]/div[2]/button/div/div/span');
  const [button] = await page.$x('//*[@id="react-app"]/div/div/div/div[2]/div[3]/div/div[2]/div[2]/button/div/div/span');

  for(i=0;i<6;i++){
    await button.click();
    await page.waitForXPath('//*[@id="react-app"]/div/div/div/div[2]/div[3]/div/div[2]/div[2]/button/div/div/span');
  }
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  const clubs = await page.$$eval('#org-search-results > ul > div > div > a', (orgs) => {
    return orgs.map((org) => {
      const title = org.querySelector('div > div > span > div > div > div').textContent.trim();
      const imgSrc = org.querySelector('div > div > span > div > div > img').getAttribute('src');
      const description = org.querySelector('div > div > span > div > div > p').textContent.trim();
      return { title, imgSrc, description };
    });
  });

  fs.writeFile('clubs.json', JSON.stringify(clubs, null, 2), (err) => {
  if (err) throw err;
  console.log('Clubs data saved to clubs.json');
  });

  await browser.close();
})();
