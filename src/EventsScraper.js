//Import required packages. 
import React from 'react';
import {useState} from 'react';
import uuid from 'react-native-uuid';
import moment, { invalid } from 'moment';

//Import axios, allows for HTTP requests.
import axios from 'axios';
//Import axios, allows for web scraping
const cheerio = require('react-native-cheerio');

//Define URL to be scraped and create a default logo for events.
const url = 'https://www.eventbrite.com/o/university-of-south-carolina-alumni-association-18391111883';
const DEFAULTEVENTLOGO =
  'https://abcnews4.com/resources/media/f4369747-6ca4-496c-9243-5e9e9a0f3089-large16x9_UniversityofSouthCarolinaFormalLogo16x9.jpg?1599583281911';

  //Define fucntion being exported
export async function ScrapeEventData() {
  try {
    return await LoadEvents(); //Call LoadEvents funtion and return the result
  } catch (error) {
    console.log('error'); //Log any errors 
  }
}
//Define the format of the date string to be used in scraping
const formatString = 'ddd, MMM D, h:mm A';

//Define the load events function. 
const LoadEvents = async () => {
  const currentDate = new Date();

  //Fetch the HTML content of the url
  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);

  const promises = []; //Initialize array to store promises
  const uniqueEventIdentifiers = new Set(); // Initialize a set to store unique event indentifiers

  titleList = $(".article.eds-event-card-content"); //Get list of all event titles

  events = new Array(titleList.length); //Intialize an array to store event objects based on the number of titles

  //Loop through each event article. 
  $('article.eds-event-card-content').each((index, element) => {
    const title = $(element).find('.eds-event-card-content__title').text().trim();
    const halfway = Math.floor(title.length / 2);
    const firstHalf = title.slice(0, halfway);
    const date = $(element).find('.eds-event-card-content__sub-title').text().trim();
    const location = $(element).find('.card-text--truncated__one').text().trim();
    //const location = $(element).find("[data-subcontent-key='location']").text().trim();
    const price = $(element).find('.eds-event-card-content__sub:nth-child(2)').text().trim();
    const link = $(element).find('.eds-event-card-content__action-link').attr('href');
    const imageUrl = $(element).find('.eds-event-card-content__image').attr('src');
    const eventDate = moment(date, 'ddd, MMM D, h:mm A').toDate();

    const eventIdentifier = firstHalf + '|' + date; //Create a unique event identifier

    //Checks that the event has a title, occurs in the future, and has not already been added
    if (title && (currentDate < eventDate || eventDate.toUTCString() === 'Invalid Date') && !uniqueEventIdentifiers.has(eventIdentifier)) {
      uniqueEventIdentifiers.add(eventIdentifier);
      //Return filtered events array
      const promise = fetch(link)
        .then(response => response.text())
        .then(eventHtml => {
          const event$ = cheerio.load(eventHtml);
          const description = event$('.event-details__main-inner').children('p').text();

          events[index] = ({
            title: firstHalf,
            date,
            location,
            price,
            link,
            imageUrl,
            description,
            eventDate,
          });
        });

      promises.push(promise);
    }
  });

  await Promise.all(promises);
  events.unshift({
    title: 'U of SC Campus Recreation Presents: The Kid Laroi',
    date: 'Friday, Aug 8, 7:00 PM',
    location: 'Colonial Life Arena • Columbia, SC',
    price: 'USC Alumni Association',
    imageUrl: 'https://www.bleed4you.com/images/tour_square-rev.jpg',
    description: 'Come join us at Colonial Life Arena for a free student concert with The Kid Laroi!',
  }
  );
  return events.filter(Boolean);

};
