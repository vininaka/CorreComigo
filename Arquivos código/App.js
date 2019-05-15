import React from 'react';
import SwitchNavigator from './src';
import firebase from 'firebase'
import { firebaseConfig } from "./src/config"

firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  render() {
    return (
      <SwitchNavigator />
    );
  }
}