import React from 'react';
import { Icon, Notifications } from 'expo';
import IconLibs from '../constants/IconLibs';
import Colors from '../constants/Colors';
import {
  getLastQuizComplete,
  getPermission,
  savePermission,
  askForPermission
} from './api';

export function getIcon({
  iconLib,
  name,
  size,
  color,
}) {
  switch (iconLib) {
    case IconLibs.materialCommunityIcons:
      return (
        <Icon.MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
        />
      );
    case IconLibs.fontAwesome:
      return (
        <Icon.FontAwesome
          name={name}
          size={size}
          color={color}
        />
      );
    case IconLibs.entypo:
      return (
        <Icon.entypo
          name={name}
          size={size}
          color={color}
        />
      );
    default:
      return (
        <Icon.Ionicons
          name={name}
          size={size}
          color={color}
        />
      );
  }
}

export function assignColorsDecks(decks) {
  const sortedDeckIds = Object.keys(decks).sort((id1, id2) => {
    if (id1 > id2) return -1;
    return 1;
  });
  return sortedDeckIds.reduce((acc, deckId, index) => {
    acc[deckId] = {
      ...decks[deckId],
      colorScheme: Colors[`colorScheme${(index % 3) + 1}`],
    };
    return acc;
  }, {});
}

export function getQuizStats(cards) {
  const reducer = (total, card) => (card.mark === 'correct' ? total + 1 : total);
  const correctTotal = cards.reduce(reducer, 0);
  return {
    complete: timeToString(),
    correct: correctTotal,
    score: Math.round(correctTotal / cards.length * 100),
  };
}

/* from Tyler McGinnis */
export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),
    date.getHours(), date.getMinutes(), date.getSeconds()));
  return todayUTC.toISOString().split('.000Z')[0];
}

/* from Typer McGinnis */
function createNotification() {
  return {
    title: 'Take A Quiz!',
    body: "Don't forget to take a quiz today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      stick: false,
      vibrate: true,
    }
  };
}

function quizTakenToday() {
  const today = timeToString().split('T')[0];
  return getLastQuizComplete()
    .then((last) => {
      if (!last) return false;
      const lastDate = last.split('T')[0];
      return lastDate === today;
    });
}

export function notify() {
  // schedule tomorrow's notification
  setTimeout(notify, getMillisecondsTillNextNotify());
  quizTakenToday()
    .then((takenToday) => {
      // if quiz taken today, no need to notify user
      if (takenToday) return;
      // otherwise notify the user
      Notifications.presentLocalNotificationAsync(createNotification());
    });
}

function getMillisecondsTillNextNotify() {
  const hours = 12;
  const now = Date.now();
  const today = new Date(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(hours);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);
  const next = tomorrow - today;
  return next;
}

function startNotificationTimer() {
  setTimeout(notify, getMillisecondsTillNextNotify());
}

export function setLocalNotification() {
  getPermission()
    .then((permission) => {
      // if permision granted previously, nothing to do
      if (permission) return;
      askForPermission()
        .then((granted) => {
          if (granted) savePermission().then(() => startNotificationTimer());
        });
    });
}
