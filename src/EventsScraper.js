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
    scheduleList = $(".twDetailTime");
    

    titleArray = new Array();
    locationArray = new Array();
    dateArray = new Array();
    timeArray = new Array();
  

    titleList.each((i, el) => {
      titleArray.push(($(el).children("a").text().trim()));
    })
    
    locationList.each((i, el) => {
      locationArray.push($(el).children("span").text());
    })

    scheduleList.each((i, el) => {
      dateArray.push($(el).children("span").text().split("\n      ")[0]);
      timeArray.push($(el).children("span").text().split("\n      ")[1]);
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
        console.log(titleArray);
        console.log(dateArray);
        console.log(locationArray);
      }

      return arr;
   
}