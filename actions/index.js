
import {
  fetchDecks,
  removeDeck,
  submitDeck,
  submitCard,
  removeCard,
  submitQuizStart,
  submitQuizComplete
} from '../utils/api';
import {
  checkNotification,
  setLocalNotification,
} from '../utils/helpers';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const MARK_CARD = 'MARK_CARD';
export const START_QUIZ = 'START_QUIZ';
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ';

export function handleReceiveDecks() {
  return dispatch => fetchDecks()
    .then(results => dispatch(receiveDecks(results)))
    .catch(error => console.warn('An error occurred fetching the deck data.  Try again.', error));
}

export function handleDeleteDeck(deckId) {
  return (dispatch) => {
    checkNotification();
    removeDeck(deckId)
      .then(() => dispatch(deleteDeck(deckId)))
      .catch(error => console.warn('An error occured deleting the deck.  Try again.', error));
  };
}

export function handleAddDeck(deck) {
  return (dispatch) => {
    setLocalNotification();
    submitDeck({ [deck.id]: deck })
      .then(() => dispatch(addDeck({ [deck.id]: deck })))
      .catch(error => console.warn('An error occured adding the deck.  Try again.', error));
  };
}

export function handleAddCard(deckId, card) {
  return dispatch => submitCard(deckId, card)
    .then(() => dispatch(addCard(deckId, card)))
    .catch(error => console.warn('An error occured adding the card.  Try again.', error));
}

export function handleMarkCard(deckId, cardIndex, mark) {
  return (dispatch) => {
    dispatch(markCard(deckId, cardIndex, mark));
  };
}

export function handleStartQuiz(deckId, quizId) {
  return (dispatch) => {
    submitQuizStart(deckId, quizId)
      .then(() => dispatch(startQuiz(deckId, quizId)))
      .catch(error => console.warn('An error occured starting the quiz.  Try again.', error));
  };
}

export function handleCompleteQuiz(deckId, quizId, stats) {
  return (dispatch) => {
    setLocalNotification();
    submitQuizComplete(deckId, quizId, stats)
      .then(() => dispatch(completeQuiz(deckId, quizId, stats)))
      .catch(error => console.warn('An error occured completing the quiz.  Try again.', error));
  };
}

export function handleDeleteCard(deckId, cardIndex) {
  return dispatch => removeCard(deckId, cardIndex)
    .then(() => dispatch(deleteCard(deckId, cardIndex)))
    .catch(error => console.warn('An error occured deleting the card.  Try again.', error));
}

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

function deleteDeck(deckId) {
  return {
    type: DELETE_DECK,
    deckId
  };
}

function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}

function deleteCard(deckId, cardIndex) {
  return {
    type: DELETE_CARD,
    deckId,
    cardIndex,
  };
}

function markCard(deckId, cardIndex, mark) {
  return {
    type: MARK_CARD,
    deckId,
    cardIndex,
    mark,
  };
}

function startQuiz(deckId, timestamp) {
  return {
    type: START_QUIZ,
    deckId,
    quizId: timestamp,
    timestamp
  };
}

function completeQuiz(deckId, quizId, stats) {
  return {
    type: COMPLETE_QUIZ,
    deckId,
    quizId,
    stats
  };
}
