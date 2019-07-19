import { AsyncStorage, Platform } from 'react-native';
import { Permissions } from 'expo';

export const FLASH_CARDS_KEY = 'FlashCards:decks';
export const FLASH_CARDS_LAST = 'FlashCards:lastQuiz';
const NOTIFICATION_KEY = 'FlashCards:notifications';

export function fetchDecks() {
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then(results => JSON.parse(results));
}

export function submitDeck(deck) {
  return AsyncStorage.mergeItem(FLASH_CARDS_KEY, JSON.stringify(deck));
}

export function removeDeck(deckId) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[deckId] = undefined;
      delete decks[deckId];
      return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
    });
}

export function submitCard(deckId, card) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[deckId].cards = decks[deckId].cards.concat([card]);
      return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
    });
}

export function removeCard(deckId, cardIndex) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[deckId].cards = decks[deckId].cards.filter((card, index) => cardIndex !== index);
      return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
    });
}

export function submitQuizStart(deckId, timestamp) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[deckId].quizzes[timestamp] = { start: timestamp };
      return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
    });
}

export function submitQuizComplete(deckId, quizId, stats) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[deckId].quizzes[quizId] = {
        ...decks[deckId].quizzes[quizId],
        ...stats
      };
      // set timestamp for last quiz completed
      AsyncStorage.setItem(FLASH_CARDS_LAST, JSON.stringify(stats.complete));
      return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
    });
}

export function removeAll() {
  return AsyncStorage.removeItem(FLASH_CARDS_KEY)
    .then(() => AsyncStorage.removeItem(FLASH_CARDS_LAST));
}

export function removeQuizzes(deckId) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      delete decks[deckId].quizzes;
      decks[deckId].quizzes = {};
      return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
    });
}

export function getLastQuizComplete() {
  return AsyncStorage.getItem(FLASH_CARDS_LAST)
    .then(date => JSON.parse(date));
}

// returns true if permission has already been granted
export function getPermission() {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(results => JSON.parse(results));
}

export function savePermission() {
  return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
}

export function askForPermission() {
  return Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
    .then(({ status }) => status === 'granted');
}

export function getPermissions() {
  return Permissions.getAsync(Permissions.NOTIFICATIONS);
}
