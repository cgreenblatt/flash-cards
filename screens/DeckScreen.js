import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import IconLibs from '../constants/IconLibs';
import DeckHeading from '../components/DeckHeading';
import ButtonWithIcon from '../components/ButtonWithIcon';
import CardData from '../components/CardData';
import ListButton from '../components/ListButton';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {
  handleDeleteDeck,
  handleDeleteCard,
  handleStartQuiz,
} from '../actions/index';
import { getIcon, timeToString } from '../utils/helpers';


const { fontSizes } = Layout;

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Deck',
  };

  constructor(props) {
    super(props);
    this.deleteDeck = this.deleteDeck.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.navigateToAddCard = this.navigateToAddCard.bind(this);
    this.navigateToQuiz = this.navigateToQuiz.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  deleteDeck() {
    const {
      deleteDeck,
      navigation,
      deckId,
    } = this.props;
    navigation.goBack();
    deleteDeck(deckId);
  }

  navigateToAddCard() {
    const { navigation, deckId } = this.props;
    navigation.navigate('Card', { deckId });
  }

  navigateToQuiz() {
    const {
      navigation,
      deckId,
      startQuiz,
      deck,
    } = this.props;
    if (deck.cards.length === 0) return;
    const quizId = timeToString();
    startQuiz(deckId, quizId);
    navigation.navigate('Quiz', { deckId, quizId });
  }

  deleteCard(cardIndex) {
    const { deleteCard, deckId } = this.props;
    deleteCard(deckId, cardIndex);
  }

  renderCard({ item }) {
    return (
      <ListButton
        item={item}
        onPress={this.deleteCard}
        colorScheme={item.colorScheme}
        childComponent={<CardData card={item} />}
        iconToRender={getIcon({
          iconLib: IconLibs.fontAwesome,
          name: 'trash',
          size: fontSizes.large,
          color: item.colorScheme.darkPrimary,
        })}
      />
    );
  }

  render() {
    const { deckId, deck } = this.props;
    // if deck just deleted, return null
    if (!deck) return null;
    // copy array of cards and index to each card object
    const cards = deck.cards.map((card, index) => ({
      key: deckId.concat(index),
      ...card,
      id: index,
      colorScheme: deck.colorScheme,
    }));
    const str = `${deck.cards.length} Card${deck.cards.length === 1 ? '' : 's'}`;
    const { colorScheme } = deck;
    const buttonColors = {
      iconColor: colorScheme.darkAccent,
      backgroundColor: colorScheme.lightPrimary,
      textColor: colorScheme.dark,
      borderColor: colorScheme.darkAccent,
    };
    const buttonPanelColor = {
      backgroundColor: colorScheme.darkPrimary,
    };
    return (
      <View style={styles.container}>
        <DeckHeading title={deck.title} subtitle={str} colorScheme={colorScheme} />
        {deck.cards.length === 0
          ? (
            <View>
              <Text style={styles.noCardsText}>Use the button below</Text>
              <Text style={styles.noCardsText}>to add cards.</Text>
            </View>
          ) : (
            <View style={styles.cardListContainer}>
              <FlatList
                contentContainerStyle={styles.cardList}
                data={cards}
                renderItem={this.renderCard}
              />
            </View>
          )
        }
        <View style={[styles.buttonPanel, buttonPanelColor]}>
          <ButtonWithIcon iconLib={IconLibs.fontAwesome} name="trash" text="Delete Deck" colors={buttonColors} onPress={this.deleteDeck} />
          <ButtonWithIcon iconLib={IconLibs.fontAwesome} name="plus" text="Add Card" colors={buttonColors} onPress={this.navigateToAddCard} />
          <ButtonWithIcon iconLib={IconLibs.fontAwesome} name="play" text="Start Quiz" colors={buttonColors} onPress={this.navigateToQuiz} />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  noCardsText: {
    paddingBottom: 20,
    fontSize: fontSizes.medium,
    textAlign: 'center',
    color: Colors.colorScheme1.darkPrimary,
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardListContainer: {
    flex: 3,
    padding: 20,
  },
  cardList: {
    alignSelf: 'stretch',
    alignContent: 'flex-start',
    color: Colors.colorScheme1.dark,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    deleteCard: (deckId, cardIndex) => dispatch(handleDeleteCard(deckId, cardIndex)),
    deleteDeck: deckId => dispatch(handleDeleteDeck(deckId)),
    startQuiz: (deckId, quizId) => { dispatch(handleStartQuiz(deckId, quizId)); },
  };
}

function mapStateToProps(decks, ownProps) {
  const { navigation } = ownProps;
  const deckId = navigation.getParam('deckId');
  return {
    navigation,
    deckId,
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);
