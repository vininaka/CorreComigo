import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,Alert
} from 'react-native';
import * as firebase from 'firebase';
import moment from "moment";

export default class SignIn extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: ''
    }
  }

 async onLogin ()  {
    const{email,password,currentDate} = this.state;
    try {
      await firebase.auth()
      .signInWithEmailAndPassword(email, password)
      console.log("Logged In!");
    }
    catch (error) {
      console.log(error.toString())
      Alert.alert(error.message)

    }
  }

  async onLoginFB() {
      const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('2387761231503605', {
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then(function(result){
          console.log('User Signed In ');

          if(result.additionalUserInfo.isNewUser)
          {
            firebase.database().ref('/usuarios/' + result.user.uid).set({
              name:result.user.displayName,
              progress:0,
              points:0,
              created_at:moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
            })
          }
          else
          {
            firebase.database().ref('/usuarios/' + result.user.uid).update({
              last_logged_in:moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
            });
          }
        })
        .catch((error) =>{
          console.log(error)
          Alert.alert(error.message)
        })
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

        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType = "email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Senha"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
     
        <TouchableOpacity style={styles.restoreButtonContainer}
         onPress={() => this.props.navigation.navigate('RecoverScreen')}>
            <Text>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
        onPress={this.onLogin.bind(this)}>
          <Text style={styles.loginText}>Login</Text>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}
        onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            <Text>Registrar-se</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]}
        onPress={this.onLoginFB.bind(this)}>
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/facebook/androidL/40/FFFFFF'}}/>
            <Text style={styles.loginText}>Continuar com Facebook</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8000',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:15,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  icon:{
    width:30,
    height:30,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: '#3b5998',
  },
  fabookButton: {
    backgroundColor: "#3b5998",
  },
  loginText: {
    color: 'white',
  },
  restoreButtonContainer:{
    width:250,
    marginBottom:15,
    alignItems: 'flex-end'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  socialIcon:{
    color: "#FFFFFF",
    marginRight:5
  },
  logoImage:{
    width: 200, 
    height: 200,
    marginBottom:30
  }
});
 