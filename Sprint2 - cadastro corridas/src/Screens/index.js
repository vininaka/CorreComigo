import { createStackNavigator} from 'react-navigation';
import FeedScreen from './Principal';
import CadastroEventoScreen from './CadastroEvento'

export default createStackNavigator({
    FeedScreen,
    CadastroEventoScreen
},
    {
        initialRouteName: 'FeedScreen',
    });