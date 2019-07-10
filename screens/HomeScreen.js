import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { handleReceiveDecks } from '../actions/index';
import { getIcon } from '../utils/helpers';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import IconLibs from '../constants/IconLibs';
import DeckData from '../components/DeckData';
import ListButton from '../components/ListButton';
import DeckHeading from '../components/DeckHeading';

const { fontSizes } = Layout;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Deck List',
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = { decksReady: false };
  }

  componentDidMount() {
    const { receiveDecks } = this.props;
    receiveDecks()
      .then(() => this.setState({ decksReady: true }));
  }

  onPress(deckId) {
    const { navigation } = this.props;
    navigation.navigate('Deck', { deckId });
  }

  render() {
    const { decksReady } = this.state;
    if (!decksReady) return null;
    const { decks } = this.props;
    const deckIds = Object.keys(decks);
    // sort decks to display most recently created first
    deckIds.sort((id1, id2) => {
      if (id1 < id2) return 1;
      return -1;
    });
    const subtitle = deckIds.length === 1
      ? `${deckIds.length} Deck`
      : `${deckIds.length} Decks`;

    return (
      <View style={[styles.container]}>
        <DeckHeading title="Flash Cards" subtitle={subtitle} colorScheme={Colors.colorScheme1} />
        {deckIds.length === 0 && (
        <View style={styles.containerText}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.text}>Add a deck to begin ... </Text>
        </View>
        )}
        {deckIds.length > 0 && (
          <ScrollView style={styles.scrollView}>
            {deckIds.map(deckId => (
              <ListButton
                key={deckId}
                item={decks[deckId]}
                colorScheme={decks[deckId].colorScheme}
                onPress={this.onPress}
                handleDelete={this.handleDelete}
                childComponent={<DeckData deckId={deckId} />}
                iconToRender={getIcon({
                  iconLib: IconLibs.fontAwesome,
                  name: 'chevron-circle-right',
                  size: fontSizes.xlarge,
                  color: decks[deckId].colorScheme.darkPrimary,
                })}
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerText: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.colorScheme1.lightPrimary,
  },
  scrollView: {
    padding: 20,
  },
  welcomeText: {
    paddingBottom: 20,
    fontSize: fontSizes.xlarge,
    textAlign: 'center',
    color: Colors.colorScheme1.darkPrimary,
  },
  text: {
    fontSize: fontSizes.large,
    textAlign: 'center',
    color: Colors.colorScheme1.darkPrimary,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    receiveDecks: () => dispatch(handleReceiveDecks()),
  };
}

function mapStateToProps(decks, ownProps) {
  const { navigation } = ownProps;
  return {
    decks,
    navigation,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
