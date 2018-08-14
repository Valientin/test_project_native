
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './components/Home'
import LoginOrRegisterScreen from './components/LoginOrRegister'
import PlaceScreen from './components/Place';
import AddRoute from './components/AddRoute';
import EditRoute from './components/EditRoute';

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Home',
      headerStyle: { backgroundColor: '#6a737c' },
      headerTitleStyle: { color: '#fff' }
    }),
  },
  LoginOrRegister: {
    screen: LoginOrRegisterScreen,
    navigationOptions: () => ({
      title: 'Login or Register',
      headerStyle: { backgroundColor: '#6a737c' }, 
      headerTitleStyle: { color: '#fff' }
    }),
  },
  Place: {
    screen: PlaceScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Place #${navigation .state.params.id}`,
      headerStyle: { backgroundColor: '#6a737c' },
      headerTitleStyle: { color: '#fff' }
    }),
  },
  AddRoute: {
    screen: AddRoute,
    navigationOptions: () => ({
      title: 'Add Route',
      headerStyle: { backgroundColor: '#6a737c' }, 
      headerTitleStyle: { color: '#fff' }
    }),
  },
  EditRoute: {
    screen: EditRoute,
    navigationOptions: () => ({
      title: 'Edit Route',
      headerStyle: { backgroundColor: '#6a737c' }, 
      headerTitleStyle: { color: '#fff' }
    }),
  }
});