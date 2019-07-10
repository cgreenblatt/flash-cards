import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Layout from '../constants/Layout';

const { fontSizes } = Layout;

export default function DeckHeading(props) {
  const {
    title,
    subtitle,
    monochrome,
    colorScheme
  } = props;

  const titleColors = monochrome
    ? {
      backgroundColor: colorScheme.lightPrimary,
      color: colorScheme.darkPrimary,
    }
    : {
      backgroundColor: colorScheme.darkPrimary,
      color: colorScheme.lightAccent,
    };

  const subtitleColors = monochrome
    ? {
      backgroundColor: colorScheme.darkPrimary,
      color: colorScheme.lightPrimary,
    }
    : {
      backgroundColor: colorScheme.lightPrimary,
      color: colorScheme.darkAccent,
    };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, titleColors]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle, subtitleColors]}>{subtitle}</Text>}
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
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    padding: 5,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
