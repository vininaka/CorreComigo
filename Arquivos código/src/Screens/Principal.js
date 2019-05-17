import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator,FlatList,Image,ScrollView} from 'react-native';
import * as firebase from 'firebase'
import { Card, Header, Avatar} from 'react-native-elements';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    eventList:[], 
    user:{
      imagem:null,
      nome:null,
    }
    }
  }

  componentDidMount() {
    var usersRef = firebase.database().ref("eventos/");
    usersRef.on("child_added", (data)=> {
      let newArr = [];
      let obj = {
        contato:data.val().contato,
        data_fim_inscricao:data.val().data_fim_inscricao,
        data_inicio_inscricao:data.val().data_inicio_inscricao,
        data_realizacao:data.val().data_realizacao,
        descricao:data.val().descricao,
        imagem:data.val().imagem,
        link_evento:data.val().link_evento,
        link_inscricao:data.val().link_inscricao,
        local:data.val().local,
        nome: data.val().nome,
        organizador:data.val().organizador,
        
      }
      newArr.push(obj)
      let Aux = this.state.eventList;
      Array.prototype.push.apply(Aux,newArr)
      this.setState({eventList:Aux})
      })
    var usersInfo = firebase.database().ref("usuarios/"+firebase.auth().currentUser.uid);
    usersInfo.once("value",(data) =>{
      let objUser = {
        imagem:data.val().imagem,
        nome:data.val().nome,
      }
      this.setState({user:objUser})
    })
  }

  render() {
    if(this.state.eventList.length==0)
    {
      return(
        <View>
          <ActivityIndicator 
            size = "large"
          />
        </View>
      )
    }
    return (
      <ScrollView> 
        <Header
          backgroundColor = '#FF8000'
          centerComponent={{ text: this.state.user.nome, 
            style: { color: '#fff',fontSize:20,marginTop:10,marginBottom:10, textAlign:"left" } 
          }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
          leftComponent={
            <Avatar
            rounded
            source={{uri: this.state.user.imagem,}}
           />
          }
        />
        <FlatList
          data = {this.state.eventList}
          keyExtractor = {(item,index) => index.toString()}
          renderItem = {
            ({item}) => 
            <Card 
              title = {item.nome} 
            >
            <View style = {{flexDirection:"row",alignItems:"center"}}>
              <View style = {{justifyContent: 'center', alignItems:"center"}}>
                <View> 
                  <Image
                      resizeMode = 'contain'
                      source = {{uri:item.imagem}}
                      style = {
                        {
                          width:200,
                          height:100
                        }
                      }

                    />
                </View>
                <Text>
                  Local: {item.local}
                </Text>
                <Text>
                  Inscrições: {item.data_inicio_inscricao} a {item.data_fim_inscricao}
                </Text>
                <Text> 
                 {item.descricao} 
                </Text>
              </View>
            </View>
            </Card>
          }
        
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
