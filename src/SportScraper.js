import React from 'react';
import { useState } from 'react';

const cheerio = require('react-native-cheerio');
const url = "https://gamecocksonline.com/all-sports-schedule/";

  
async function loadSportEvents(DATA) {
    const defaultItemCount = 10;
    events = new Array();
    const response = await fetch(url);   // fetch page
    const htmlString = await response.text();  // get response text
    const $ = cheerio.load(htmlString); // parse HTML string

    
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

    console.log(events);

}

export function ScrapeSportData() {
    loadSportEvents();
}