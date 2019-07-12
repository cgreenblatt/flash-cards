import { AsyncStorage } from 'react-native';

export const FLASH_CARDS_KEY = 'FlashCards:decks';

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
      return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
    });
}

export function removeQuizzes(deckId) {
  console.log("in remove quizzes damn it");
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      delete decks[deckId].quizzes;
      decks[deckId].quizzes = {};
      return AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(decks));
    });
}
