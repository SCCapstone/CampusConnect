// Not yet compatible with react-native. 
// However tools exist to make cheerio work with react-native, so this will be the next step

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://gamecocksonline.com/all-sports-schedule/";

async function scrapeData() {
    try {
        const defaultItemCount = 10;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data)
        events = new Array();

        listItems = $(".schedule-list__category");
        sportList = $(".schedule-list__category");
        opponentList = $(".schedule-list__opponent");
        scheduleList = $(".schedule-list__top");

        sportArray = new Array();
        opponentArray = new Array();
        dateArray = new Array();
        timeArray = new Array();


        sportList.each((i, el) => {
            sportArray.push(($(el).text().trim()));
        })

        opponentList.each((i, el) => {
            opponentArray.push($(el).children("strong").text());
        })

        scheduleList.each((i, el) => {
            dateArray.push($(el).children("time").text().split("\n      ")[0]);
            timeArray.push($(el).children("time").text().split("\n      ")[1]);
        })

        for (let i = 0; i < defaultItemCount; i++) {
            const event = { sport: "", opponent: "", date: "", time: ""};
            event.sport = sportArray[i];
            event.opponent = opponentArray[i];
            event.date = dateArray[i];
            event.time = timeArray[i];
            events.push(event);
        }

        console.dir(events);
        fs.writeFile("events.json", JSON.stringify(events, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("successfully written data to file");
        });
    } catch (err) {
        console.error(err);
    }
}

scrapeData();