import React from 'react';
import { useState } from 'react';
import { err } from 'react-native-svg/lib/typescript/xml';
import uuid from 'react-native-uuid';
import { isJSDocCommentContainingNode } from 'typescript';

const axios = require("axios");
const cheerio = require("react-native-cheerio");
const url = "https://gamecocksonline.com/all-sports-schedule/";

export async function ScrapeSportData() {
  try {
  return await LoadSportEvents();
  }
  catch (error) {
    console.log("error");
  }
}


const LoadSportEvents = async() => {
    const defaultItemCount = 10;
    events = new Array();
    const response = await fetch(url);   // fetch page
    const htmlString = await response.text();  // get response text
    const $ = cheerio.load(htmlString); // parse HTML string
    
    
    listItems = $(".schedule-list__category");
    sportList = $(".schedule-list__category");
    opponentList = $(".schedule-list__opponent");
    scheduleList = $(".schedule-list__top");
    imageList = $(".schedule-list__image");
    

    sportArray = new Array();
    opponentArray = new Array();
    dateArray = new Array();
    timeArray = new Array();
    imageArray = new Array();
    

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

    imageList.each((i, el) => {
      imageArray.push($(el).children("img").attr("src"));
    })

    const attributes = 6;
    const results = 10;
    let arr = Array(results).fill().map(() => Array(attributes));

    console.log("Creation of arr works!");
    for (let i = 0; i < defaultItemCount; i++) {
        arr[i][0] = sportArray[i];
        arr[i][1] = opponentArray[i];
        arr[i][2] = dateArray[i];
        arr[i][3] = timeArray[i];
        arr[i][4] = imageArray[i];
        arr[i][5] = uuid.v4();
      }

      return arr;
   
}