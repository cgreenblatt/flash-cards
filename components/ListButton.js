import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import DeckIcon from './DeckIcon';

export default class ListButton extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const { item, onPress } = this.props;
    onPress(item.id);
  }

  render() {
    const { childComponent, iconToRender, borderTop } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, borderTop
          ? styles.borderTop
          : {}
        ]}
        onPress={this.handlePress}
      >
        <View style={styles.innerContainer}>
          <DeckIcon />
          {childComponent}
        </View>
        <View style={styles.iconContainer}>
          {iconToRender}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: Colors.colorScheme1.darkPrimary,
    borderWidth: 4,
    backgroundColor: Colors.colorScheme1.lightPrimary,
    borderRadius: 10,
    marginTop: 10,
  },
  innerContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderTop: {
    borderTopColor: Colors.colorScheme1.darkPrimary,
    borderTopWidth: 4,
  }
});
