import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import IconLibs from '../constants/IconLibs';
import DeckHeading from '../components/DeckHeading';
import ButtonWithIcon from '../components/ButtonWithIcon';
import CardData from '../components/CardData';
import ListButton from '../components/ListButton';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { handleDeleteDeck, handleDeleteCard, handleStartQuiz } from '../actions/index';
import { getIcon, timeToString } from '../utils/helpers';

const colors = {
  iconColor: Colors.colorScheme1.darkAccent,
  backgroundColor: Colors.colorScheme1.lightPrimary,
  textColor: Colors.colorScheme1.dark,
  borderColor: Colors.colorScheme1.darkPrimary,
};
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
    const { deleteDeck, navigation, deckId } = this.props;
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
        childComponent={<CardData card={item} />}
        iconToRender={getIcon({
          iconLib: IconLibs.fontAwesome,
          name: 'trash',
          size: fontSizes.xlarge,
          color: Colors.colorScheme1.darkPrimary
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
    }
    ));
    const str = `${deck.cards.length} Card${deck.cards.length === 1 ? '' : 's'}`;
    return (
      <View style={styles.container}>
        <DeckHeading title={deck.title} subtitle={str} />
        <View style={styles.cardListContainer}>
          <FlatList
            contentContainerStyle={styles.cardList}
            data={cards}
            renderItem={this.renderCard}
          />
        </View>
        <View style={styles.buttonPanel}>
          <ButtonWithIcon iconLib={IconLibs.fontAwesome} name="trash" text="Delete Deck" colors={colors} onPress={this.deleteDeck} />
          <ButtonWithIcon iconLib={IconLibs.fontAwesome} name="plus" text="Add Card" colors={colors} onPress={this.navigateToAddCard} />
          <ButtonWithIcon iconLib={IconLibs.fontAwesome} name="play" text="Start Quiz" colors={colors} onPress={this.navigateToQuiz} />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.colorScheme1.darkPrimary,
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
    deleteCard: (deckId, cardIndex) => { dispatch(handleDeleteCard(deckId, cardIndex)); },
    deleteDeck: (deckId) => { dispatch(handleDeleteDeck(deckId)); },
    startQuiz: (deckId, quizId) => { dispatch(handleStartQuiz(deckId, quizId)); }
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
