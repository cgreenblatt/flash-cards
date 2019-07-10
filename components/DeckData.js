import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Layout from '../constants/Layout';

const { fontSizes } = Layout;

function DeckData(props) {
  const { deck } = props;
  if (deck === undefined) return null;
  const { colorScheme } = deck;
  const quizzes = Object.keys(deck.quizzes).length;

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.lightPrimary }]}>
      <Text style={[styles.title, { color: colorScheme.darkPrimary }]}>{deck.title}</Text>
      <Text style={styles.details}>
        {`${deck.cards.length} Card${deck.cards.length === 1 ? '' : 's'}`}
      </Text>
      <Text style={[styles.details, { color: colorScheme.dark }]}>
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
  },
  title: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
  },
  details: {
    fontSize: fontSizes.small,
    alignSelf: 'stretch',
  }
});

function mapStateToProps(decks, ownProps) {
  const { deckId } = ownProps;
  return {
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(DeckData);
