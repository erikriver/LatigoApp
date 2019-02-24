import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/navigation/TabBarIcon';
import TabBarText from '../components/navigation/TabBarText';
import { AddButton } from '../components/navigation/AddButton';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import TransactionRoutes from './routes/TransactionRoutes';
import CategoryRoutes from './routes/CategoryRoutes';
import AccountRoutes from './routes/AccountRoutes';
import TabBar from '../components/navigation/TabBar';
import HomeScreen2 from '../screens/HomeScreen2';;
import PlansScreen from '../screens/PlansScreen';
import screens from '../constants/screens';


const HomeStack = createStackNavigator({
  // IconPickerScreen: IconPickerScreen,
  // TransactionDetailScreen:TransactionDetailScreen,
  [screens.Home]: HomeScreen2,
  // Home: HomeScreen,
  ...TransactionRoutes,
  ...CategoryRoutes,
  ...AccountRoutes
});

HomeStack.navigationOptions = ({ navigation }) =>{
  return{
    tabBarVisible: navigation.state.index > 0 ? false : true,
    tabBarLabel: ({ focused }) => (<TabBarText focused={focused}>Balance</TabBarText>),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-wallet`
            : 'md-wallet'
        }
      />
    ),
  }
};

const HistoryStack = createStackNavigator({
  [screens.History]: HistoryScreen,
  ...TransactionRoutes,
  ...CategoryRoutes,
  ...AccountRoutes
});

HistoryStack.navigationOptions = ({ navigation }) =>{
  return {
    tabBarVisible: navigation.state.index > 0 ? false : true,
    tabBarLabel: ({ focused }) => (<TabBarText focused={focused}>Movimientos</TabBarText>),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-list-box`
            : 'md-list-box'
        }
      />
    ),
  }
};

const AddStack = createStackNavigator({
  Home: HomeScreen,
});

AddStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (<TabBarText focused={focused}></TabBarText>),
  tabBarIcon: <AddButton routes={[{routeName:'TransactionDetail', color: 'blue'}, {routeName:'TransactionDetail', color: 'red'}]}/> // Plus button component
}

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (<TabBarText focused={focused}>Análisis</TabBarText>),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-analytics' : 'md-analytics'}
    />
  ),
};

const PlanStack = createStackNavigator({
  [screens.PlanStack]: PlansScreen,
  ...TransactionRoutes,
  ...CategoryRoutes,
  ...AccountRoutes
});

PlanStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (<TabBarText focused={focused}>Planes</TabBarText>),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (<TabBarText focused={focused}>Limpiar</TabBarText>),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  HistoryStack,
  AddStack,
  PlanStack,
//  LinksStack,
  SettingsStack
}, {
    tabBarComponent: TabBar
});
