import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../constants/Layout';
import IconLibs from '../constants/IconLibs';
import { getIcon } from '../utils/helpers';

const borderRadius = 5;
const { fontSizes } = Layout;

const questionIcon = {
  iconLib: IconLibs.fontAwesome,
  name: 'question',
  size: fontSizes.large,
};

const answerIcon = {
  iconLib: IconLibs.materialCommunityIcons,
  name: 'lightbulb-on-outline',
  size: fontSizes.large,
};

export default function DeckIcon(props) {
  const { colorScheme } = props;
  return (
    <View style={styles.deck}>
      <View
        style={[styles.deckUpper, styles.deckCommon, { backgroundColor: colorScheme.darkPrimary }]}
      >
        {getIcon({ ...questionIcon, color: colorScheme.lightAccent })}
      </View>
      <View
        style={[styles.deckLower, styles.deckCommon, { backgroundColor: colorScheme.lightPrimary }]}
      >
        {getIcon({ ...answerIcon, color: colorScheme.darkAccent })}
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
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  deckLower: {
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
});
