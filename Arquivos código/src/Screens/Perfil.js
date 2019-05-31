import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import * as firebase from 'firebase';
import moment from 'moment';

/* Instalamos a biblioteca moment.js https://momentjs.com/ */
export default class Perfil extends Component {

    constructor(props) {
        // Atributos da tela de perfil
        super(props);
        this.state = {
            name: '',               // Nome
            genero:'',              // Genero
            descricao:'',           // Descricao do usuario
            idade:'',               // Idade
            cidade:'',              // Cidade
            vet_eventos:[],         // Vetor com os eventos que o usuario participou
            photo:firebase.auth().currentUser.photoURL,         // Foto do usuario
            //points:'',
            //progress:'',
            //currentDate: new Date(),
        }
    }

    componentDidMount(){

        let userid = firebase.auth().currentUser.uid
        var usersRef = firebase.database().ref("usuarios/" + userid);
        
        usersRef.on("value", (data) => {
          this.setState({cidade:data.val().cidade})
          this.setState({idade:data.val().datanascimento})
          //idade.substr(2, 5)                              // Tira os - das datas
          //idade = moment(idade, "DDMMYYYY").fromNow()     // Calcula a idade da data de nascimento ate agora
          this.setState({name:data.val().nome})
          this.setState({descricao:data.val().descricao})
          this.setState({genero:data.val().genero})
      
          if(firebase.auth().currentUser.photoURL === null)
          {
              this.setState({photo:data.val().image})
              firebase.auth().currentUser.updateProfile({
                photoURL:data.val().image
              })
          }
        });
      }

  render() {
    return (
        
      <Text>
        {this.state.cidade}
        {this.state.descricao}
        {this.state.genero}
        {this.state.name}
      </Text>

    )
  }
}
/*
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#3b5998",
    height:180,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:22,
    color: "#696969",
    marginTop:20,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonPlay: {
    marginTop:10,
    marginBottom: 10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  imageIcon:{
    width:80,
    height:80
    ,
  },
});*/