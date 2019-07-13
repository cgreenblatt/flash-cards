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
    disabled,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.container,
        {
          backgroundColor: disabled ? '#E6E6E6' : colors.backgroundColor,
          borderColor: disabled ? '#808080' : colors.borderColor,
        }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {getIcon({
        iconLib,
        size,
        name,
        color: disabled ? '#808080' : colors.iconColor,
      })}
      <Text style={[styles.buttonText,
        { color: disabled ? '#808080' : colors.textColor }]}
      >
        {text}
      </Text>
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
