import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const { fontSizes } = Layout;

export default function SubmitBtn(props) {
  const { onPress } = props;
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.buttonText}> SUBMIT  </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    alignSelf: 'stretch',
    padding: 10,
    fontSize: fontSizes.medium,
    backgroundColor: Colors.colorScheme1.darkPrimary,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.small,
    padding: 5,
    color: Colors.colorScheme1.lightPrimary,
  }
});
