import React from 'react';
import {useState} from 'react';
import uuid from 'react-native-uuid';
import moment, { invalid } from 'moment';

import axios from 'axios';
const cheerio = require('react-native-cheerio');
const url = 'https://www.eventbrite.com/o/university-of-south-carolina-alumni-association-18391111883';
const DEFAULTEVENTLOGO =
  'https://abcnews4.com/resources/media/f4369747-6ca4-496c-9243-5e9e9a0f3089-large16x9_UniversityofSouthCarolinaFormalLogo16x9.jpg?1599583281911';
export async function ScrapeEventData() {
  try {
    return await LoadEvents();
  } catch (error) {
    console.log('error');
  }
}

const formatString = 'ddd, MMM D, h:mm A';
const LoadEvents = async () => {
  const currentDate = new Date();

  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);

  const promises = [];
  const uniqueEventIdentifiers = new Set();

  titleList = $(".article.eds-event-card-content");

  events = new Array(titleList.length);

  $('article.eds-event-card-content').each((index, element) => {
    const title = $(element).find('.eds-event-card-content__title').text().trim();
    const halfway = Math.floor(title.length / 2);
    const firstHalf = title.slice(0, halfway);
    const date = $(element).find('.eds-event-card-content__sub-title').text().trim();
    const location = $(element).find("[data-subcontent-key='location']").text().trim();
    const price = $(element).find('.eds-event-card-content__sub:nth-child(2)').text().trim();
    const link = $(element).find('.eds-event-card-content__action-link').attr('href');
    const imageUrl = $(element).find('.eds-event-card-content__image').attr('src');
    const eventDate = moment(date, 'ddd, MMM D, h:mm A').toDate();

    const eventIdentifier = firstHalf + '|' + date;

    if (title && (currentDate < eventDate || eventDate.toUTCString() === 'Invalid Date') && !uniqueEventIdentifiers.has(eventIdentifier)) {
      uniqueEventIdentifiers.add(eventIdentifier);

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
  return events.filter(Boolean);

};
