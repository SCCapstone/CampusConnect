import React from 'react';
import { useState } from 'react';
import uuid from 'react-native-uuid';

const axios = require("axios");
const cheerio = require("react-native-cheerio");
const url = "https://www.eventbrite.com/o/university-of-south-carolina-alumni-association-18391111883";

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
    //console.log(htmlString)
    
    //listItems = $(".schedule-list__category");
    titleList = $(".eds-event-card-content__primary-content");
    locationList = $("td.twLocation");
    scheduleList = $(".eds-event-card-content__primary-content");
    

    titleArray = new Array();
    locationArray = new Array();
    dateArray = new Array();
    timeArray = new Array();
  

    titleList.each((i, el) => {
      const title = $(el).children("a").text().trim();
      const halfway = Math.floor(title.length / 2);
      const firstHalf = title.slice(0, halfway);
      titleArray.push(firstHalf);
    })
    
    locationList.each((i, el) => {
      locationArray.push($(el).children("span").text());
    })

    scheduleList.each((i, el) => {
      dateArray.push($(el).text().split("\n      ")[0]);
      $('a').empty();
      //timeArray.push($(el).children("span").text().split("\n      ")[1]);
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