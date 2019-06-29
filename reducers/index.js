import {
  RECEIVE_DECKS,
  ADD_DECK,
  DELETE_DECK,
  ADD_CARD,
  DELETE_CARD,
  MARK_CARD,
  START_QUIZ,
  COMPLETE_QUIZ
} from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case DELETE_DECK:
      return Object.keys(state)
        .filter(deckId => deckId !== action.deckId)
        .reduce((acc, deckId) => {
          acc[deckId] = state[deckId];
          return acc;
        }, {});
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
    default:
      return state;
  }
}

export default decks;
