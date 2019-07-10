import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout';

const { fontSizes } = Layout;

export default function SubmitBtn(props) {
  const { onPress, colorScheme } = props;
  const buttonColor = { backgroundColor: colorScheme.darkPrimary };
  const textColor = { color: colorScheme.lightPrimary };
  return (
    <TouchableOpacity style={[styles.submitButton, buttonColor]} onPress={onPress}>
      <Text style={[styles.buttonText, textColor]}> SUBMIT  </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    alignSelf: 'stretch',
    padding: 10,
    fontSize: fontSizes.medium,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.small,
    padding: 5,
  }
});
