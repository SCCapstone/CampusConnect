import React from 'react';
import { useState } from 'react';
import uuid from 'react-native-uuid';

const axios = require("axios");
const cheerio = require("react-native-cheerio");
const url = "https://sc.edu/about/offices_and_divisions/russell_house/upcoming-events/index.php";

export async function ScrapeEventData() {
  try {
  return await LoadEvents();
  }
  catch (error) {
    console.log("error");
  }
}


const LoadEvents = async() => {
    const defaultItemCount = 10;
    events = new Array();
    const response = await fetch(url);   // fetch page
    const htmlString = await response.text();  // get response text
    const $ = cheerio.load(htmlString); // parse HTML string
    
    
    listItems = $(".schedule-list__category");
    titleList = $(".schedule-list__category");
    locationList = $(".schedule-list__location");
    scheduleList = $(".schedule-list__top");
    

    titleArray = new Array();
    locationArray = new Array();
    dateArray = new Array();
    timeArray = new Array();
  

    titleList.each((i, el) => {
      sportArray.push(($(el).text().trim()));
    })
    
    locationList.each((i, el) => {
      locationArray.push($(el).children("strong").text());
    })

    scheduleList.each((i, el) => {
      dateArray.push($(el).children("time").text().split("\n      ")[0]);
      timeArray.push($(el).children("time").text().split("\n      ")[1]);
    })


    const attributes = 5;
    const results = 10;
    let arr = Array(results).fill().map(() => Array(attributes));
    for (let i = 0; i < defaultItemCount; i++) {
        arr[i][0] = titleArray[i];
        arr[i][1] = locationArray[i];
        arr[i][2] = dateArray[i];
        arr[i][3] = timeArray[i];
        arr[i][4] = uuid.v4();
      }

      return arr;
   
}