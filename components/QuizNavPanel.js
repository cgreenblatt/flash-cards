import React from 'react';
import {
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import IconLibs from '../constants/IconLibs';
import Layout from '../constants/Layout';
import { getIcon } from '../utils/helpers';

const { fontSizes } = Layout;
const buttons = [
  {
    iconLib: IconLibs.fontAwesome,
    name: 'chevron-circle-left',
    size: fontSizes.xlarge,
    color: Colors.colorScheme1.lightPrimary
  },
  {
    iconLib: IconLibs.fontAwesome,
    name: 'chevron-circle-right',
    size: fontSizes.xlarge,
    color: Colors.colorScheme1.lightPrimary
  }
];

export default function (props) {
  const {
    getNext,
    getPrevious,
    currentCard,
    totalCards
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ justifyContent: 'center' }}
        onPress={getPrevious}
      >
        {getIcon(buttons[0])}
      </TouchableOpacity>
      <Text style={styles.text}>
        {`${currentCard} of ${totalCards}`}
      </Text>
      <TouchableOpacity onPress={getNext}>
        {getIcon(buttons[1])}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.colorScheme1.darkPrimary,
    justifyContent: 'space-between',
    padding: 15,
  },
  text: {
    fontSize: fontSizes.medium,
    color: Colors.colorScheme1.lightPrimary,
    alignSelf: 'center',
  }
});
