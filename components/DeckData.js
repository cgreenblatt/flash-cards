import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const { fontSizes } = Layout;

function DeckData(props) {
  const { deck } = props;
  if (deck === undefined) return null;
  const quizzes = Object.keys(deck.quizzes).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.details}>
        {`${deck.cards.length} Card${deck.cards.length === 1 ? '' : 's'}`}
      </Text>
      <Text style={styles.details}>
        {`${quizzes} Quiz${quizzes === 1 ? '' : 'zes'}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: Colors.colorScheme1.lightPrimary,
  },
  title: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    color: Colors.colorScheme1.darkPrimary,
  },
  details: {
    fontSize: fontSizes.small,
    color: Colors.colorScheme1.dark,
    alignSelf: 'stretch',
  }
});

function mapStateToProps(decks, ownProps) {
  const { deckId } = ownProps;
  return {
    deck: decks[deckId]
  };
}

export default connect(mapStateToProps)(DeckData);
