import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import IconLibs from '../constants/IconLibs';
import DeckHeading from '../components/DeckHeading';
import ButtonWithIcon from '../components/ButtonWithIcon';
import QuizResultsButton from '../components/QuizResultsButton';
import { handleStartQuiz } from '../actions/index';
import { timeToString, } from '../utils/helpers';

const colors = {
  iconColor: Colors.colorScheme1.darkAccent,
  backgroundColor: Colors.colorScheme1.lightPrimary,
  textColor: Colors.colorScheme1.dark,
  borderColor: Colors.colorScheme1.darkPrimary,
};

class QuizResultsScreen extends Component {
  static navigationOptions = {
    title: 'Quiz Results',
  };

  constructor(props) {
    super(props);
    this.navigateToDeck = this.navigateToDeck.bind(this);
    this.navigateToQuiz = this.navigateToQuiz.bind(this);

    this.buttons = [
      {
        iconLib: IconLibs.fontAwesome,
        name: 'arrow-left',
        text: 'To Deck',
        colors,
        onPress: this.navigateToDeck,
      },
      {
        iconLib: IconLibs.fontAwesome,
        name: 'rotate-left',
        text: 'Restart Quiz',
        colors,
        onPress: this.navigateToQuiz,
      },
    ];
  }

  navigateToDeck() {
    const { navigation, deckId } = this.props;
    navigation.navigate('Deck', { deckId });
  }

  navigateToQuiz() {
    const { navigation, startQuiz, deckId } = this.props;
    const quizId = timeToString();
    startQuiz(deckId, quizId);
    navigation.replace('Quiz', { deckId, quizId });
  }

  render() {
    const { deck } = this.props;
    const { quizzes } = deck;
    const sorted = Object.keys(quizzes).sort((q1, q2) => {
      if (q1 > q2) return -1;
      return 1;
    });
    return (
      <View style={styles.container}>
        <DeckHeading title={deck.title} subtitle="Quiz Results" />
        <ScrollView>
          {sorted.map(quizId => <QuizResultsButton quiz={quizzes[quizId]} key={quizId} />)}
        </ScrollView>
        <View style={styles.cardButtons}>
          {this.buttons.map(button => (
            <ButtonWithIcon
              key={button.name}
              iconLib={button.iconLib}
              name={button.name}
              text={button.text}
              onPress={button.onPress}
              colors={button.colors}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cardButtons:
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.colorScheme1.darkPrimary,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    startQuiz: (deckId, quizId) => { dispatch(handleStartQuiz(deckId, quizId)); }
  };
}

function mapStateToProps(decks, ownProps) {
  const { navigation } = ownProps;
  const deckId = navigation.getParam('deckId');
  return {
    navigation,
    deck: decks[deckId],
    deckId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizResultsScreen);
