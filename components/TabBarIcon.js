import React from 'react';
import { Icon } from 'expo';
import Layout from '../constants/Layout';

const { fontSizes } = Layout;
const size = fontSizes.medium;
const style = { marginBottom: -3 };

export default function TabBarIcon(props) {
  const { name, color } = props;
  return (
    <Icon.FontAwesome
      name={name}
      size={size}
      style={style}
      color={color}
    />
  );
}
