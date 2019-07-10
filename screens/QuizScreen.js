import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Icon } from 'expo';
import { handleMarkCard, handleCompleteQuiz } from '../actions/index';
import { getQuizStats } from '../utils/helpers';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import IconLibs from '../constants/IconLibs';
import QuizNavPanel from '../components/QuizNavPanel';
import ButtonWithIcon from '../components/ButtonWithIcon';
import DeckHeading from '../components/DeckHeading';

const width = '100%';
const flipAnimDur = 400;
const { fontSizes } = Layout;

function getQuestionIcon(color) {
  return (
    <Icon.FontAwesome
      name="question"
      size={80}
      color={color}
      style={{ paddingTop: 10, paddingBottom: 10 }}
    />
  );
}

function getAnswerIcon(color) {
  return (
    <Icon.MaterialCommunityIcons
      name="lightbulb-on-outline"
      size={85}
      color={color}
      style={{ padding: 10, fontWeight: 'bold' }}
    />
  );
}

function getTransformStyle(flipAnim) {
  return {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1, 2],
          outputRange: ['0deg', '90deg', '180deg']
        })
      },
      {
        perspective: 1000
      },
    ]
  };
}

class QuizScreen extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  constructor(props) {
    super(props);
    this.flipForwardAnimation = this.flipForwardAnimation.bind(this);
    this.flipReverseAnimation = this.flipReverseAnimation.bind(this);
    this.markCard = this.markCard.bind(this);
    this.getNextQuestion = this.getNextQuestion.bind(this);
    this.getPreviousQuestion = this.getPreviousQuestion.bind(this);
    this.changeQuestionAnimation = this.changeQuestionAnimation.bind(this);
    this.completeQuiz = this.completeQuiz.bind(this);
    this.toQuizResults = this.toQuizResults.bind(this);

    this.buttons = [
      {
        iconLib: IconLibs.fontAwesome,
        name: 'check',
        text: 'Correct',
        onPress: () => { this.markCard('correct'); },
      },
      {
        iconLib: IconLibs.fontAwesome,
        name: 'times',
        text: 'Incorrect',
        onPress: () => { this.markCard('incorrect'); },
      }
    ];

    this.bulb = [{
      iconLib: IconLibs.materialCommunityIcons,
      name: 'lightbulb-on-outline',
      text: 'Answer',
      onPress: () => this.flipForwardAnimation(),
    }];

    this.question = [{
      iconLib: IconLibs.fontAwesome,
      name: 'question',
      text: 'Question',
      onPress: () => this.flipReverseAnimation(0),
    }];

    this.flipAnim = new Animated.Value(0);
    this.opacityAnim = new Animated.Value(1);
    this.state = {
      renderQuestion: true,
      cardIndex: 0,
    };
    this.value = -1;
  }

  getNextQuestion() {
    const { deck } = this.props;
    const { cardIndex, renderQuestion } = this.state;
    const cardIndexChange = cardIndex + 1 < deck.cards.length ? 1 : 0;
    // if at last card, quiz is complete
    if (!cardIndexChange) {
      this.completeQuiz();
      return;
    }
    // if the answer is showing, flip the card and then change the question
    if (!renderQuestion) {
      this.flipReverseAnimation(cardIndexChange);
    } else {
      // just change question
      this.changeQuestionAnimation(cardIndexChange);
    }
  }

  getPreviousQuestion() {
    const { cardIndex, renderQuestion } = this.state;
    if (cardIndex - 1 > -1) {
      // if card is currently showing question, just change question
      if (renderQuestion) {
        this.changeQuestionAnimation(-1);
      // else, flip card and then show new question
      } else {
        this.flipReverseAnimation(-1);
      }
    }
  }

  toQuizResults() {
    const {
      completeQuiz,
      deckId,
      deck,
      quizId,
      navigation,
    } = this.props;
    if (!deck.quizzes[quizId].complete) {
      completeQuiz(deckId, quizId, getQuizStats(deck.cards));
    }
    navigation.navigate('Results', { deckId });
  }

  completeQuiz() {
    const { renderQuestion } = this.state;
    // if showing answer, flip the card then navigate to results
    if (!renderQuestion) {
      this.flipReverseAnimation(0, true);
    } else {
      // navigate to results
      this.toQuizResults();
    }
  }

  markCard(update) {
    const {
      markCard,
      deckId,
      deck,
      quizId
    } = this.props;
    const { cardIndex } = this.state;
    // if quiz is already completed, don't change the mark
    if (deck.quizzes[quizId].complete) return;
    // if card is already marked as update, change to no mark
    const cardMark = deck.cards[cardIndex].mark === update
      ? undefined
      : update;
    markCard(deckId, cardIndex, cardMark);
    // if card was marked then go to next card
    if (cardMark) {
      setTimeout(() => { this.getNextQuestion(); }, 1000);
    }
  }

  flipReverseAnimation(cardIndexChange, quizComplete) {
    Animated.timing(
      this.flipAnim,
      {
        toValue: 1,
        duration: flipAnimDur,
        easing: Easing.linear,
      }
    ).start(() => {
      this.setState({ renderQuestion: true });
      Animated.timing(
        this.flipAnim,
        {
          toValue: 0,
          duration: flipAnimDur,
          easing: Easing.linear,
        }
      ).start(() => {
        if (cardIndexChange) {
          this.changeQuestionAnimation(cardIndexChange);
          return;
        }
        if (quizComplete) {
          this.toQuizResults();
        }
      });
    });
  }

  flipForwardAnimation() {
    Animated.timing(
      this.flipAnim,
      {
        toValue: 1,
        duration: flipAnimDur,
        easing: Easing.linear,
      }
    ).start(() => {
      this.setState({ renderQuestion: false });
      Animated.timing(
        this.flipAnim,
        {
          toValue: 2,
          duration: flipAnimDur,
          easing: Easing.linear,
        }
      ).start();
    });
  }

  changeQuestionAnimation(cardIndexChange) {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 0,
        duration: 400,
        easing: Easing.linear,
      }
    ).start(() => {
      this.setState(state => ({ cardIndex: state.cardIndex + cardIndexChange }));
      Animated.timing(
        this.opacityAnim,
        {
          toValue: 1,
          duration: 400,
          easing: Easing.linear,
        }
      ).start();
    });
  }

  render() {
    const { deck } = this.props;
    const { cardIndex } = this.state;
    const question = deck.cards[cardIndex];

    const { colorScheme } = deck;
    const buttonColors = {
      iconColor: colorScheme.darkAccent,
      backgroundColor: colorScheme.lightPrimary,
      textColor: colorScheme.dark,
      borderColor: colorScheme.darkPrimary,
    };
    const backgroundColor = { backgroundColor: colorScheme.darkPrimary };

    const { renderQuestion } = this.state;
    const buttons = renderQuestion
      ? this.bulb.concat(this.buttons)
      : this.question.concat(this.buttons);

    const { lightAccent } = colorScheme;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.animatedArea, getTransformStyle(this.flipAnim), backgroundColor]}
        >
          <View style={[styles.questionArea, renderQuestion ? {} : styles.reverse]}>
            <DeckHeading title={deck.title} colorScheme={colorScheme} monochrome />
            {renderQuestion ? getQuestionIcon(lightAccent) : getAnswerIcon(lightAccent)}
            <ScrollView style={styles.scrollview}>
              <Animated.Text style={[styles.questionText, { opacity: this.opacityAnim }]}>
                {renderQuestion ? question.question : question.answer}
              </Animated.Text>
              {question.mark && (
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  opacity: this.opacityAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.3]
                  }),
                  width
                }}
              >
                <Icon.FontAwesome
                  name={question.mark === 'correct' ? 'check' : 'times'}
                  size={180}
                  color={Colors.colorScheme1.lightPrimary}
                  style={{ textAlign: 'center', zIndex: 10 }}
                />
              </Animated.View>
              )}
            </ScrollView>
          </View>
          <View style={[styles.cardButtons, renderQuestion ? {} : styles.reverse]}>
            {buttons.map(button => (
              <ButtonWithIcon
                key={button.name}
                iconLib={button.iconLib}
                name={button.name}
                text={button.text}
                onPress={button.onPress}
                colors={buttonColors}
              />
            ))}
          </View>
        </Animated.View>
        <QuizNavPanel
          getNext={this.getNextQuestion}
          getPrevious={this.getPreviousQuestion}
          currentCard={cardIndex + 1}
          totalCards={deck.cards.length}
          colorScheme={colorScheme}
        />
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
  animatedArea: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 20,
  },
  scrollview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  questionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    margin: 10,
    fontSize: fontSizes.xlarge,
    textAlign: 'center',
    color: '#FFF',
    paddingBottom: 100,
  },
  reverse: {
    transform: [{ rotateY: '180deg' }]
  },
  cardButtons:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    completeQuiz: (deckId, quizId, stats) => {
      dispatch(handleCompleteQuiz(deckId, quizId, stats));
    },
    markCard: (deckId, cardIndex, update) => {
      dispatch(handleMarkCard(deckId, cardIndex, update));
    },
  };
}

function mapStateToProps(decks, ownProps) {
  const { navigation } = ownProps;
  const deckId = navigation.getParam('deckId');
  const quizId = navigation.getParam('quizId');
  const deck = decks[deckId];
  return {
    deck,
    deckId,
    quizId,
    navigation,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);
