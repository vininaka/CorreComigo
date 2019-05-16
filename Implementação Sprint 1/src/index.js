import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './Screens/Login';
import AppScreen from './Screens/Principal';
import LoadingScreen from './Loading'

const AppNavigator = createSwitchNavigator({
  LoginScreen,
  AppScreen,
  LoadingScreen
},
{
  initialRouteName: 'LoadingScreen',
});

export default createAppContainer(AppNavigator);