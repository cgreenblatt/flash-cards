import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
    const {
      childComponent,
      colorScheme,
      iconToRender,
    } = this.props;
    const colors = {
      borderColor: colorScheme.darkPrimary,
      backgroundColor: colorScheme.lightPrimary
    };
    return (
      <View
        style={[styles.container, colors]}
        onPress={this.handlePress}
      >
        <View style={styles.innerContainer}>
          <DeckIcon colorScheme={colorScheme} />
          {childComponent}
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={this.handlePress}>
          {iconToRender}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
});
