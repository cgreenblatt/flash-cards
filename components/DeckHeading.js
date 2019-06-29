import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const { fontSizes } = Layout;

export default function DeckHeading(props) {
  const { title, subtitle, monochrome } = props;
  const colorMonochrome = monochrome
    ? {
      backgroundColor: Colors.colorScheme1.lightPrimary,
      color: Colors.colorScheme1.darkPrimary,
    }
    : {};

  return (
    <View style={styles.container}>
      <Text style={[styles.title, colorMonochrome]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle, colorMonochrome]}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'stretch'
  },
  title: {
    padding: 10,
    backgroundColor: Colors.colorScheme1.darkPrimary,
    color: Colors.colorScheme1.lightAccent,
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    padding: 5,
    backgroundColor: Colors.colorScheme1.lightPrimary,
    color: Colors.colorScheme1.darkAccent,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
