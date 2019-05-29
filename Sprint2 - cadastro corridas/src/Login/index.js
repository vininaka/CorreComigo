import { createStackNavigator} from 'react-navigation';
import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import RecoverScreen from './Recover';

export default createStackNavigator({
  SignInScreen,
  SignUpScreen,
  RecoverScreen
},
{
  initialRouteName: 'SignInScreen',
});