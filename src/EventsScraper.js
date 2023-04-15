import React from 'react';
import { useState } from 'react';
import uuid from 'react-native-uuid';

import axios from 'axios';
const cheerio = require("react-native-cheerio");
const url = "https://www.eventbrite.com/o/university-of-south-carolina-alumni-association-18391111883";
const DEFAULTEVENTLOGO = "https://abcnews4.com/resources/media/f4369747-6ca4-496c-9243-5e9e9a0f3089-large16x9_UniversityofSouthCarolinaFormalLogo16x9.jpg?1599583281911";
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
    descriptionList = $(".event-details__main-inner");
    imageList = $("aside.eds-event-card-content__image-container");
    
    descriptionArray = new Array();
    titleArray = new Array();
    locationArray = new Array();
    dateArray = new Array();
    timeArray = new Array();
    imageArray = new Array();

    titleList.each((i, el) => {
      const title = $(el).children("a").text().trim();
      //console.log(title)
      const halfway = Math.floor(title.length / 2);
      const firstHalf = title.slice(0, halfway);
      titleArray.push(firstHalf);
    })
    
    imageList.each((i, el) => {
      img = ($(el).find("img").attr("src"));
      if (img === undefined) {
        imageArray.push(DEFAULTEVENTLOGO);
      } else {
        imageArray.push(img);
      }
    })

    locationList.each((i, el) => {
      locationArray.push($(el).children("span").text());
    })

    scheduleList.each((i, el) => {
      dateArray.push($(el).text().split("\n      ")[0]);
      $('a').empty();
      //timeArray.push($(el).children("span").text().split("\n      ")[1]);
    })

//Iterate over each event and follow the link embedded in the title, then scrape the description found on that URL.
    promises = [];
    for (let i = 0; i < defaultItemCount; i++) {
      const eventLink = $(titleList[i]).children("a").attr("href");
      promise = axios.get(eventLink).then((eventHtml) => {
        const event$ = cheerio.load(eventHtml.data);
        const description = event$(".event-details__main-inner").children('p').text();
        descriptionArray.push(description);
      });
      promises.push(promise);
    }

    const attributes = 5;
    const results = 10;
    let arr = Array(results).fill().map(() => Array(attributes));
    await Promise.all(promises).then(() => {
      for (let i = 0; i < defaultItemCount; i++) {
        arr[i][0] = titleArray[i];
        arr[i][1] = locationArray[i];
        arr[i][2] = dateArray[i];
        arr[i][3] = timeArray[i];
        arr[i][4] = uuid.v4();
        arr[i][5] = imageArray[i];
        arr[i][6] = descriptionArray[i];
      }
    }).catch((error) => {
      console.log(error);
    });
    return arr
    
   
}