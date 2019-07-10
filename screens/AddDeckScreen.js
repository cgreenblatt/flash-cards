import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { handleAddDeck } from '../actions/index';
import { timeToString } from '../utils/helpers';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import DeckHeading from '../components/DeckHeading';
import SubmitBtn from '../components/SubmitBtn';

const { fontSizes } = Layout;

class AddDeckScreen extends Component {
  static navigationOptions = {
    title: 'Add A Deck',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const { addDeck, navigation } = this.props;
    const { title } = this.state;
    if (title.length === 0) return;
    const deck = {
      id: timeToString(),
      title,
      cards: [],
      quizzes: {}
    };
    this.setState({ title: '' });
    addDeck(deck);
    navigation.navigate('Deck', { deckId: deck.id });
  }

  render() {
    const { title } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <DeckHeading title="Flash Cards" colorScheme={Colors.colorScheme1} />
        <View style={styles.containerInner}>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Deck Title Here"
              maxLength={25}
              value={title}
              onChangeText={
                deckTitle => this.setState({
                  title: deckTitle
                })
              }
              autoFocus
            />
          </KeyboardAvoidingView>
          <SubmitBtn onPress={this.submit} colorScheme={Colors.colorScheme1} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    alignContent: 'center',
    margin: 20,
    flex: 1,
  },
  textInput: {
    color: Colors.colorScheme1.dark,
    fontSize: fontSizes.small,
    margin: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: Colors.colorScheme1.lightPrimary,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addDeck: deck => dispatch(handleAddDeck(deck)),
  };
}

function mapStateToProps(decks, ownProps) {
  const { navigation } = ownProps;
  return {
    navigation,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeckScreen);
