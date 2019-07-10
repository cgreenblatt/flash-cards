import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { handleAddCard } from '../actions/index';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import DeckHeading from '../components/DeckHeading';
import SubmitBtn from '../components/SubmitBtn';

const height = Layout.window.height / 8;
const { fontSizes } = Layout;

class AddCardScreen extends Component {
  static navigationOptions = {
    title: 'Add A Card',
  };

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { question, answer } = this.state;
    const { addCard, deckId } = this.props;

    if (question.length === 0 || answer.length === 0) return;
    addCard(deckId, this.state);
    this.setState({ question: '', answer: '' });
  }

  render() {
    const { deck } = this.props;
    const { answer, question } = this.state;
    const { title, colorScheme } = deck;
    const borderColor = { borderColor: deck.colorScheme.lightPrimary };

    return (
      <View style={styles.container}>
        <DeckHeading title={title} colorScheme={colorScheme} />
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <TextInput
            style={[styles.textInput, borderColor]}
            placeholder="Enter the question"
            multiline
            onChangeText={(text) => { this.setState({ question: text }); }}
            value={question}
            autoFocus
          />
          <TextInput
            style={[styles.textInput, borderColor]}
            placeholder="Enter the answer"
            multiline
            onChangeText={(text) => { this.setState({ answer: text }); }}
            value={answer}
          />
        </KeyboardAvoidingView>
        <SubmitBtn onPress={this.handleSubmit} colorScheme={colorScheme} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  keyboardAvoidingView: {
    margin: 10,
  },
  textInput: {
    marginBottom: 10,
    fontSize: fontSizes.medium,
    height,
    padding: 10,
    borderWidth: 3,
  },
  buttons: {
    padding: 10,
    borderWidth: 3,
    borderColor: Colors.colorScheme1.darkPrimary,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  }
});


function mapDispatchToProps(dispatch) {
  return {
    addCard: (deckId, state) => { dispatch(handleAddCard(deckId, { ...state, mark: undefined })); }
  };
}

function mapStateToProps(decks, ownProps) {
  const { navigation } = ownProps;
  const deckId = navigation.getParam('deckId');
  return {
    deckId,
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardScreen);
