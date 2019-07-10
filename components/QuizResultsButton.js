import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import IconLibs from '../constants/IconLibs';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { getIcon } from '../utils/helpers';

const animationDuration = 500;
const height = 250;
const { fontSizes } = Layout;

class QuizResultsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'chevron-circle-down',
      detailsShowing: false,
    };
    this.heightAnim = new Animated.Value(0);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails() {
    const { detailsShowing } = this.state;
    if (detailsShowing) {
      this.hideDetails();
    } else {
      this.showDetails();
    }
  }

  showDetails() {
    Animated.timing(
      this.heightAnim,
      {
        toValue: 1,
        duration: animationDuration,
      }
    ).start(() => {
      this.setState({
        name: 'chevron-circle-up',
        detailsShowing: true,
      });
    });
  }

  hideDetails() {
    Animated.timing(
      this.heightAnim,
      {
        toValue: 0,
        duration: animationDuration,
      }
    ).start(() => {
      this.setState({
        name: 'chevron-circle-down',
        detailsShowing: false,
      });
    });
  }

  render() {
    const { quiz, colorScheme } = this.props;
    const backgroundColorDark = { backgroundColor: colorScheme.darkPrimary };
    const backgroundColorLight = { backgroundColor: colorScheme.lightPrimary };
    const { name } = this.state;
    const startTime = quiz.start.split('T')[1];
    const startDate = quiz.start.split('T')[0];
    const quizScore = quiz.complete
      ? `${quiz.score}%`
      : 'N/A';
    const completeTime = quiz.complete
      ? quiz.complete.split('T')[1]
      : '';
    const completeDate = quiz.complete
      ? quiz.complete.split('T')[0]
      : '';
    const correct = quiz.complete
      ? quiz.correct
      : '';

    return (
      <TouchableOpacity style={styles.button} onPress={this.toggleDetails}>
        <View style={[styles.buttonHeading, backgroundColorDark]}>
          <Text style={styles.buttonText}>{`Score: ${quizScore}`}</Text>
          {getIcon({
            iconLib: IconLibs.fontAwesome,
            name,
            size: fontSizes.xlarge,
            color: colorScheme.lightPrimary,
          })}
        </View>
        <Animated.View style={[
          {
            opacity: this.heightAnim,
            height: this.heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, height]
            }),
          },
          styles.detailsContainer, backgroundColorLight]}
        >
          <Text style={styles.detailsText}>{`Start time: ${startTime}`}</Text>
          <Text style={styles.detailsText}>{`Start date: ${startDate}`}</Text>
          <Text style={styles.detailsText}>{`Completion time: ${completeTime} `}</Text>
          <Text style={styles.detailsText}>{`Completion date ${completeDate} `}</Text>
          <Text style={styles.detailsText}>{`Marked as correct: ${correct}`}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
  },
  buttonHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: fontSizes.small,
    fontWeight: 'bold',
  },
  detailsContainer: {
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  detailsText: {
    fontSize: fontSizes.xsmall,
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.colorScheme1.dark,
  }
});

function mapStateToProps(state, ownProps) {
  const { deckId, quizId } = ownProps;
  return {
    quiz: state[deckId].quizzes[quizId],
    colorScheme: state[deckId].colorScheme,
  };
}

export default connect(mapStateToProps)(QuizResultsButton);
