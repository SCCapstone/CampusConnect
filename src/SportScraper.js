const cheerio = require('react-native-cheerio');
const DEFAULTGAMECOCKLOGOURL1 =
  'https://gamecocksonline.com/imgproxy/VExob3ytGj5BNypACaYPkvTj1hVPGnHWGjUKiE5kZyY/fit/100/100/ce/0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dhbWVjb2Nrc29ubGluZS1jb20vMjAyMi8wNS8yYjlkMWU4Ny1zb3V0aF9jYXJvbGluYV9nYW1lY29ja3NfbG9nb19wcmltYXJ5LnBuZw.png';
const DEFAULTGAMECOCKLOGOURL2 =
  'https://gamecocksonline.com/imgproxy/T5189nCorf3M6wYfR1fANLkiT4Dn31rTEbUh6hXtvAU/fit/150/150/ce/0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dhbWVjb2Nrc29ubGluZS1jb20vMjAyMi8xMS9iOGI1MWI3ZC1zY19nYW1lY29ja3NfYmFzZWJhbGxfc29mdGJhbGxfaW50ZXJsb2NrX2xvZ28ucG5n.png';
const DEFAULTSECLOGO =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Southeastern_Conference_logo.svg/1200px-Southeastern_Conference_logo.svg.png';
const BEACHVOLLEYBALLLOGO =
  'https://gamecocksonline.com/imgproxy/hS1VvuQwMq70zW6pa9zdKvEEtN7B-FeUkPjM3TFz1Zc/fit/150/150/ce/0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dhbWVjb2Nrc29ubGluZS1jb20vMjAxOC8wMy9iYjE2MDQ5Yi1zY2FyLWJlYWNoLXZvbGxleWJhbGwtbG9nby5qcGc.png';

export function ScrapeSportData(HTMLString, count, isSort) {
  try {
    return LoadSportEvents(HTMLString, count, isSort)
  }
  catch (error) {
    console.log("Load error")}
}
const LoadSportEvents = (HTMLString, eventCount, isSort) => {
  sportArray = new Array()
  opponentArray = new Array()
  dateArray = new Array()
  timeArray = new Array()
  imageArray = new Array()
  locationArray = new Array()
  homeStatusArray = new Array()
 
  if (isSort) {
    now = new Date(); //The present date
    now.setTime(now.getTime() - (24*60*60*1000)) //This subtracts 24 hours so that events in the current day will always show, since they are set to midnight
    for (let i = 0; i < HTMLString.length; i++) {
        eventDate = new Date(HTMLString[i].event_date)
        if (eventDate.getTime() >= now.getTime()) {
        sportArray.push(HTMLString[i].sport.name)
        opponentArray.push(HTMLString[i].opponent_school_name)
        dateArray.push(HTMLString[i].event_date)
        timeArray.push(HTMLString[i].event_time)
        if (HTMLString[i].opponent_logo == null)
          imageArray.push(DEFAULTSECLOGO)
        else
          imageArray.push(HTMLString[i].opponent_logo)
        locationArray.push(HTMLString[i].location)
        homeStatusArray.push(HTMLString[i].event_status)
      }
    }
  } else {
    const $ = cheerio.load(HTMLString) // parse HTML string
    listItems = $(".schedule-list__category")
    sportList = $(".schedule-list__category")
    opponentList = $(".schedule-list__opponent")
    scheduleList = $(".schedule-list__top")
    imageList = $(".schedule-list__image")
    locationList = $(".schedule-list__location")
    sportList.each((i, el) => {
      sportArray.push($(el).text().trim())
    })
    opponentList.each((i, el) => {
      opponentArray.push($(el).children("strong").text())
    })
    scheduleList.each((i, el) => {
      dateArray.push($(el).children("time").text().split("\n      ")[0])
      timeArray.push($(el).children("time").text().split("\n      ")[1])
    })
    imageList.each((i, el) => {
      img = ($(el).children("img").attr("src"))
      if (img === undefined) 
        imageArray.push(DEFAULTSECLOGO) // Use SEC logo if there's no opponent logo
      else if (img != DEFAULTGAMECOCKLOGOURL1 && img != DEFAULTGAMECOCKLOGOURL2 && img != BEACHVOLLEYBALLLOGO) // Ensures that Gamecock logo isn't used for opponent logo
        imageArray.push(img)
    })
    locationList.each((i, el) => {
      locationArray.push($(el).children("strong").text())
      homeStatusArray.push($(el).children("span").text())
    })
  }
  
  // Scrape Tests
  // console.log("sportArray: " + sportArray)
  // console.log("opponentArray: " + opponentArray)
  // console.log("date: " + dateArray)
  // console.log("time: " + timeArray)
  // console.log("image: " + imageArray)
  // console.log("location: " + locationArray)
  // console.log("homeStatus: " + homeStatusArray)
  
  const attributes = 7
  let arr = Array(eventCount).fill().map(() => Array(attributes))
  for (let i = 0; i < eventCount; i++) {
      arr[i][0] = sportArray[i]
      arr[i][1] = opponentArray[i]
      arr[i][2] = dateArray[i]
      arr[i][3] = timeArray[i]
      arr[i][4] = imageArray[i]
      arr[i][5] = locationArray[i]
      arr[i][6] = homeStatusArray[i]
    }
    return arr
}