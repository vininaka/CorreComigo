import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import *as firebase from 'firebase';

export default class Loading extends Component {

  componentDidMount() {
    this.checkIfLoggedIn()
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user =>{
    if(user)
    {
      this.props.navigation.navigate('AppScreen');
    }
    else
    {
      this.props.navigation.navigate('LoginScreen');
    }
  });
};

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color='#e93766' size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});