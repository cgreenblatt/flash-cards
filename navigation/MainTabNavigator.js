import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import DeckScreen from '../screens/DeckScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultsScreen from '../screens/QuizResultsScreen';
import AddCardScreen from '../screens/AddCardScreen';
import IconLibs from '../constants/IconLibs';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const { fontSizes } = Layout;

const tabBarOptions = {
  activeTintColor: Colors.colorScheme1.darkPrimary,
  inactiveTintColor: 'gray',
  labelStyle: {
    fontSize: fontSizes.xxsmall,
  }
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Deck: DeckScreen,
  Card: AddCardScreen,
  Quiz: QuizScreen,
  Results: QuizResultsScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Deck List',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      iconLib={IconLibs.fontAwesome}
      focused={focused}
      name="list-ol"
      color={tintColor}
    />
  ),
};

const AddDeckStack = createStackNavigator({
  AddDeck: AddDeckScreen,
});

AddDeckStack.navigationOptions = {
  tabBarLabel: 'Add Deck',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      iconLib={IconLibs.fontAwesome}
      focused={focused}
      name="plus"
      color={tintColor}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  AddDeckStack,
}, {
  tabBarOptions
});
