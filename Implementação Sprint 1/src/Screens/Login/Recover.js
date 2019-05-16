import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import * as firebase from 'firebase';
import Header from 'react-native-elements';

export default class Recover extends Component {

  static navigationOptions = {
    title: 'Voltar',
    headerStyle: {
      backgroundColor: '#FF800',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: "left",
    },
  };

  constructor(props) {
    super(props);
    state = {
      email   : '',
    }
  }

 async onRecoverButton (){
    
    const{email} = this.state;
    try{
      firebase.auth().sendPasswordResetEmail(email)
      .catch((error) =>{
        console.log(error)
        Alert.alert(error.message)
      })
      Alert.alert("Solicitação Enviada com sucesso")

    }
    catch (error) {
        console.log(error.toString())
        Alert.alert(error.message)
      }
    }

  render() {
    return (
      <View style={styles.container}>

          <View>
            <Image
                style={styles.logoImage}
                resizeMode = "contain"
                source={{uri: 'https://raw.githubusercontent.com/SensiateLeo/Corre_Comigo/master/Desenvolvimento/Prot%C3%B3tipo/Logo.png'}}
            />
         </View>
          <Text style = {{marginBottom:60, fontSize:20, textAlign:"center"}}>
                Insira o endereço de email para recuperação de senha
          </Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <TouchableHighlight style={[styles.buttonContainer, styles.recoverButton]} onPress={this.onRecoverButton.bind(this)}>
          <Text style={styles.recoverText}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8000',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    borderRadius:30,
  },
  recoverButton: {
    backgroundColor: "#3b5998",
  },
  recoverText: {
    color: 'white',
  },
  logoImage:{
    width: 200, 
    height: 200,
    marginBottom:30
  }
});
 