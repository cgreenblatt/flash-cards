import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const maxChars = 40;
const { fontSizes } = Layout;

export default function CardData(props) {
  const { card } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {card.question.length > maxChars
          ? `${card.question.substr(0, maxChars - 1)} ...`
          : card.question
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: Colors.colorScheme1.lightPrimary,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingLeft: 20,
  },
  text: {
    fontSize: fontSizes.small,
  },
});
