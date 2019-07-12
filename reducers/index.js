import {
  RECEIVE_DECKS,
  ADD_DECK,
  DELETE_DECK,
  ADD_CARD,
  DELETE_CARD,
  MARK_CARD,
  START_QUIZ,
  COMPLETE_QUIZ,
  DELETE_QUIZZES,
  ASSIGN_COLOR_DECKS,
} from '../actions';
import Colors from '../constants/Colors';
import { assignColorsDecks } from '../utils/helpers';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return assignColorsDecks(action.decks);
    case ADD_DECK:
      return assignColorsDecks({ ...state, ...action.deck });
    case DELETE_DECK:
      return assignColorsDecks(Object.keys(state)
        .filter(deckId => deckId !== action.deckId)
        .reduce((acc, deckId) => {
          acc[deckId] = state[deckId];
          return acc;
        }, {}));
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: state[action.deckId].cards
            ? state[action.deckId].cards.concat([action.card])
            : [action.card]
        }
      };
    case DELETE_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: state[action.deckId].cards.filter((card, index) => index !== action.cardIndex),
        }
      };
    case MARK_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: state[action.deckId].cards.map((card, index) => {
            return index === action.cardIndex
              ? { ...card, mark: action.mark }
              : card;
          })
        }
      };
    case START_QUIZ:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: state[action.deckId].cards.map(card => ({
            ...card,
            mark: undefined
          })),
          quizzes: {
            ...state[action.deckId].quizzes,
            [action.quizId]: {
              ...state[action.deckId].quizzes[action.quizId],
              start: action.timestamp
            }
          }
        }
      };
    case COMPLETE_QUIZ:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          quizzes: {
            ...state[action.deckId].quizzes,
            [action.quizId]: {
              ...state[action.deckId].quizzes[action.quizId],
              ...action.stats
            }
          }
        }
      };
    case DELETE_QUIZZES:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          quizzes: {},
        }
      };
    case ASSIGN_COLOR_DECKS:
      return Object.keys(state).reduce((acc, deckId, index) => {
        acc[deckId] = {
          ...state[deckId],
          colorScheme: Colors[`colorScheme${(index % 3) + 1}`],
        };
        return acc;
      }, {});
    default:
      return state;
  }
}

export default decks;
