import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator,FlatList,Image,ScrollView} from 'react-native';
import * as firebase from 'firebase'
import { Card, Header, Avatar} from 'react-native-elements';
import { YellowBox, Button } from 'react-native';
import _ from 'lodash';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";


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

  async OnLogout(){
    try {
        await firebase.auth().signOut()
        .then(() => this.props.navigation.navigate('LoginScreen'))
        console.log("Logged Out!");
    } catch (error) {
        console.log(error);
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
          leftComponent={
            <Avatar
            squared
            source={{uri: this.state.user.imagem,}}
           />
          }
          rightComponent={{ icon: 'menu', color: '#fff' }}
        />
          <MenuProvider style={{flexDirection: "column", padding: 20, position:'relative'}}>
            <Menu>
              <MenuTrigger  >
                <Text style={styles.headerText}>Menu</Text>
              </MenuTrigger  >
              <MenuOptions style={position='relative'}>
                <MenuOption value={"Pesquisa"} onSelect={value => alert(`You Clicked : ${value}`)}>
                  <Text style={styles.menuContent}>Pesquisar Eventos</Text>
                </MenuOption>
                <MenuOption value={"Pesquisa"} onSelect={value => alert(`You Clicked : ${value}`)}>
                  <Text style={styles.menuContent}>Pesquisar Usuário</Text>
                </MenuOption>
                <MenuOption value={"Sugestão"} onSelect={value => alert(`You Clicked : ${value}`)}>
                  <Text style={styles.menuContent}>Sugerir Evento</Text>
                </MenuOption>
                <Button
                    title="Sair"
                    onPress = {this.OnLogout.bind(this)}
                  />
              </MenuOptions>
            </Menu>
          </MenuProvider>
        <Text style={styles.feedText}>Feed De Eventos </Text>
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
  menuContent: {
    color: "#000",
    fontWeight: "bold",
    padding: 2,
    fontSize: 20
  },
  feedText: {
    fontSize:20,
    textAlign:'center',
    color:"#000",
    justifyContent:"center",
  },
  headerText: {
    textAlign:"center",
    justifyContent:"center",
    fontSize: 20,
    margin: 10,
    fontWeight: "bold"
  },
});
