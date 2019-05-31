import { createStackNavigator } from 'react-navigation';
import PerfilScreen from './Perfil'
import FeedScreen from './Principal';

export default createStackNavigator({
  PerfilScreen,
  FeedScreen
},
{
  //initialRouteName: 'FeedScreen',
  initialRouteName: 'PerfilScreen',
});