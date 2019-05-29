import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './Login';
import AppScreen from './Screens';
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