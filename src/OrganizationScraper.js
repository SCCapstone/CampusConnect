const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://garnetgate.sa.sc.edu/organizations');

  const organizations = await page.$$eval('#org-search-results > ul > div > div > a', (orgs) => {
    return orgs.map((org) => {
      const title = org.querySelector('div > div > span > div > div > div').textContent.trim();
      const imgSrc = org.querySelector('div > div > span > div > div > img').getAttribute('src');
      const description = org.querySelector('div > div > span > div > div > p').textContent.trim();
      return { title, imgSrc, description };
    });
  });

  console.log(organizations);

  await browser.close();
})();
