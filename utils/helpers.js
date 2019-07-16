import React from 'react';
import { AsyncStorage } from 'react-native';
import { Icon, Notifications, Permissions } from 'expo';
import IconLibs from '../constants/IconLibs';
import Colors from '../constants/Colors';
import { FLASH_CARDS_KEY } from './api';

const NOTIFICATION_KEY = 'FlashCards:notifications';
const hour = 9;

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


/* from Tyler McGinnis */
export function clearLocalNotifcation() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
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

function scheduleLocalNotification() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(hour);
  tomorrow.setMinutes(0);
  Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.scheduleLocalNotificationAsync(
    createNotification(),
    {
      time: tomorrow,
      repeat: 'day',
    }
  );
}

// called when a deck is deleted - cancels notifications if all decks
// are deleted
export function checkNotification() {
  AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then((decks) => {
      if (Object.keys(decks).length === 0) {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
    });
}

function askForPermission() {
  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then((({ status }) => {
      if (status === 'granted') {
        scheduleLocalNotification();
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      }
    }));
}

// returns true if permission has already been granted
function getPermissionStatus() {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => data);
}

/* from Tyler McGinnis */
// called whenever a quiz is taken or whenever a deck is added
export function setLocalNotification() {
      getPermissionStatus()
        .then(permission => {
          if (permission) {
            scheduleLocalNotification();
            return;
          }
          askForPermission();
        });
}
