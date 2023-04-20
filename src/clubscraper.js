const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  //Launch puppeteer window with headless:false for testing purposes, slowMo allows you to observe actions taken
  const browser = await puppeteer.launch({headless: false, slowMo: 5});
  const page = await browser.newPage();
  await page.goto('https://garnetgate.sa.sc.edu/organizations');
  //SBOBRT = "Showing __ of __ results" text
  //The code below uses SBORT on the website to get the total number of clubs and uses that value to determine how many iterations of the for loop should run
  const SBOBRT = await page.$eval(
    '#react-app > div > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3 > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-9.MuiGrid-grid-lg-9 > div > div:nth-child(2) > div:nth-child(1)',
    el => el.textContent,
  );
  const regex = /of (\d+)/;
  const match = SBOBRT.match(regex);
  const numResults = match[1];
  console.log(numResults); // prints the max number portion of "Showing blank of blank results text"
  const numResultsInteger = parseInt(numResults, 10);
  console.log(numResultsInteger);
  //Click the load more button until it disappears
  while (true) {
    try {
      await page.waitForSelector(
        '#react-app > div > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3 > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-9.MuiGrid-grid-lg-9 > div > div:nth-child(2) > div.outlinedButton > button',
        {timeout: 10000},
      );
      await page.click(
        '#react-app > div > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3 > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-9.MuiGrid-grid-lg-9 > div > div:nth-child(2) > div.outlinedButton > button',
      );
    } catch (error) {
      break;
    }
  }
  //Give program some time to properly load clubs list after they are all loaded
  await new Promise(resolve => setTimeout(resolve, 2000));
  const clubs = [];
  //Iterate through all clubs and push data to json
  for (let i = 1; i <= numResultsInteger; i++) {
    //These default values will be pushed to the json if the club data cannot be scraped properly
    const defaultClub = {
      title: 'Club Title',
      description: 'Club Description',
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/South_Carolina_Gamecocks_logo.svg/200px-South_Carolina_Gamecocks_logo.svg.png',
      link: 'https://garnetgate.sa.sc.edu/organizations',
    };
    try {
      //Selector for club title
      //timeouts are set to 200ms, default is 30000 which can cause program to run for way too long
      const titleSelector = `#org-search-results > ul > div > div:nth-child(${i}) > a > div > div > span > div > div > div`;
      await page.waitForSelector(titleSelector, {timeout: 200});
      defaultClub.title = await page.$eval(
        titleSelector,
        (el, defaultClub) => (defaultClub.title = el.innerText),
        defaultClub,
      );

      // Selector for club description
      const descriptionSelector = `#org-search-results > ul > div > div:nth-child(${i}) > a > div > div > span > div > div > p`;
      await page.waitForSelector(descriptionSelector, {timeout: 200});
      defaultClub.description = await page.$eval(
        descriptionSelector,
        (el, defaultClub) => (defaultClub.title = el.innerText),
        defaultClub,
      );

      //Selector for imgsrc
      const imgSrcSelector = `#org-search-results > ul > div > div:nth-child(${i}) > a > div > div > span > div > div > img`;
      await page.waitForSelector(imgSrcSelector, {timeout: 200});
      defaultClub.imgSrc = await page.$eval(imgSrcSelector, img => img.src);

      //Selector for hyperlink
      const linkSelector = `#org-search-results > ul > div > div:nth-child(${i}) > a`;
      await page.waitForSelector(linkSelector, {timeout: 200});
      defaultClub.link = await page.$eval(linkSelector, a => a.href);

      // Add club data
      clubs.push({
        title: defaultClub.title,
        description: defaultClub.description,
        imgSrc: defaultClub.imgSrc,
        link: defaultClub.link,
      });
      //Give program some time before going to the next club, may not be needed on better machines
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Error while extracting data for club ${i}: ${error}`);
      // Add values of defaultClub, some values may change some may not it depends on what went wrong
      clubs.push({
        title: defaultClub.title,
        description: defaultClub.description,
        imgSrc: defaultClub.imgSrc,
        link: defaultClub.link,
      });
    }
  }

  // Write clubs array to JSON file
  fs.writeFileSync('clubs.json', JSON.stringify(clubs, null, 2));
  console.log('Data written to clubs.json');
  await browser.close();
})();
