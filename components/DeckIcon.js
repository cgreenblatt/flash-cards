import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import IconLibs from '../constants/IconLibs';
import { getIcon } from '../utils/helpers';

const borderRadius = 5;
const { fontSizes } = Layout;

const questionIcon = {
  iconLib: IconLibs.fontAwesome,
  color: Colors.colorScheme1.lightAccent,
  name: 'question',
  size: fontSizes.large,
};

const answerIcon = {
  iconLib: IconLibs.materialCommunityIcons,
  name: 'lightbulb-on-outline',
  color: Colors.colorScheme1.darkAccent,
  size: fontSizes.large,
};

export default function DeckIcon() {
  return (
    <View style={styles.deck}>
      <View style={[styles.deckUpper, styles.deckCommon]}>
        {getIcon(questionIcon)}
      </View>
      <View style={[styles.deckLower, styles.deckCommon]}>
        {getIcon(answerIcon)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10,
  },
  deckCommon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 80,
  },
  deckUpper: {
    backgroundColor: Colors.colorScheme1.darkPrimary,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  deckLower: {
    backgroundColor: Colors.colorScheme1.lightPrimary,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
});
