import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { getIcon } from '../utils/helpers';
import Layout from '../constants/Layout';

export default function ButtonWithIcon(props) {
  const { fontSizes } = Layout;
  const size = fontSizes.large;
  const {
    text,
    onPress,
    iconLib,
    name,
    colors,
  } = props;
  const {
    iconColor,
    backgroundColor,
    textColor,
    borderColor,
  } = colors;
  return (
    <TouchableOpacity
      style={[styles.container, { borderColor, backgroundColor }]}
      onPress={onPress}
    >
      {getIcon({
        iconLib,
        size,
        name,
        color: iconColor,
      })}
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    height: 85,
    width: 85,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
