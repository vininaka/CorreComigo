import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableHighlight, Image, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ImagePicker } from 'expo';
import { Header, Card } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import { RadioButton } from 'react-native-paper';

import * as firebase from 'firebase';

export default class SignUp extends Component {

    state = {
        fullName: '',
        email: '',
        password: '',
        image: "https://img.icons8.com/ultraviolet/2x/name.png",
        birthDate: "",
        gender: "",
        description: "",
        city: "",
        state: "",
        isSelected: 0,
        checked1: "unchecked",
        checked2: "unchecked",
        checked3: "unchecked",
        checked4: "unchecked"
    }

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

    onSignUpPress = async () => {
        const {
            email,
            password,
            fullName,
            image,
            birthDate,
            gender,
            description,
            city,
            state,
            checked1,
            checked2,
            checked3,
            checked4 } = this.state;

        this.setState({ isSelected: 1 })
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                        displayName: fullName
                    })
                    console.log("Account created");

                    let userId = firebase.auth().currentUser.uid
                    firebase.database().ref("/usuarios/" + userId).set({
                        imagem: image,
                        nome: fullName,
                        datanascimento: birthDate,
                        cidade: city,
                        estado: state,
                        genero: gender,
                        descricao: description,
                    })
                    firebase.database().ref("/objetivos/" + userId).set({
                        caminhada: checked1,
                        corridacurta: checked2,
                        corridamedia: checked3,
                        corridalonga: checked4
                    })
                    this.props.navigation.navigate('AppScreen')
                })
                .catch((error) => {
                    console.log('error ', error)
                    Alert.alert(error.message)
                })
        }
        catch (error) {
            this.setState({ isSelected: 0 })
            console.log(error.toString())
            Alert.alert(error.message)
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [100, 100],
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    CheckTextInput = () => {
        if (this.state.fullName != '') {
            if (this.state.birthDate != '') {
                if (this.state.gender != '') {
                    if (this.state.city != '') {
                        if (this.state.state != '') {
                            this.onSignUpPress()
                        }
                        else {
                            Alert.alert("Por favor insira um estado válido")
                        }
                    }
                    else {
                        Alert.alert("Por favor insira uma cidade válida")
                    }
                }
                else {
                    Alert.alert("Por favor insira um gênero válido")
                }
            } else {
                Alert.alert('Por favor insira um data de nascimento válida');
            }
        } else {
            Alert.alert('Por favor insira um nome válido');
        }
    };

    render() {

        let { image, checked1, checked2, checked3, checked4 } = this.state

        if (this.state.isSelected == 1) {
            return (
                <View style={styles.containerLoading}>
                    <Text style={{ color: '#e93766', fontSize: 40 }}>Carregando</Text>
                    <ActivityIndicator color='#e93766' size="large" />
                </View>
            )
        }

        return (
            <View style={styles.container}>

                <ScrollView>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Email*"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({ email })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Senha*"
                            textContentType='password'
                            keyboardType='default'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({ password })} />
                    </View>

                    <Header
                        backgroundColor='#EFEFEF'
                        centerComponent={{
                            text: 'Informações',
                            style: { color: '#ff8000', fontSize: 20, marginTop: 10, marginBottom: 10 }
                        }}
                    />
                    <View style={styles.inputContainerPhoto}>
                        <TouchableWithoutFeedback
                            onPress={this._pickImage}>
                            <Image
                                source={{ uri: image }}
                                style={{ width: 100, height: 100 }}
                                resizeMode="contain"
                            />
                        </TouchableWithoutFeedback>
                        <Text style={{ marginTop: 10 }}>
                            Escolha a sua foto de Perfil (opcional)
          </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Nome*"
                            keyboardType='name-phone-pad'
                            underlineColorAndroid='transparent'
                            textContentType='name'
                            onChangeText={(fullName) => this.setState({ fullName })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.birthDate}
                            mode="date"
                            placeholder="Data de Nascimento*"
                            format="DD-MM-YYYY"
                            minDate="01-01-1900"
                            maxDate="22/05/2019"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 10,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 60
                                }
                            }}
                            onDateChange={(date) => { this.setState({ birthDate: date }) }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ultraviolet/2x/building.png' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Cidade*"
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            textContentType='addressCity'
                            onChangeText={(city) => this.setState({ city })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ultraviolet/2x/new-york.png' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Estado*"
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            textContentType='addressState'
                            onChangeText={(state) => this.setState({ state })} />
                    </View>

                    <View style={{ alignItems: "center", flexDirection: "row" }}>

                        <Text style={{ fontSize: 15, marginTop: 20, marginRight: 100, marginLeft: 80 }}>
                            Gênero *
          </Text>

                        <View style={{ marginTop: 20 }}>
                            <RadioButton.Group
                                onValueChange={gender => this.setState({ gender })}
                                value={this.state.gender}
                            >
                                <View>
                                    <Text>Masculino</Text>
                                    <RadioButton value="Masculino" />
                                </View>
                                <View>
                                    <Text>Feminino</Text>
                                    <RadioButton value="Feminino" />
                                </View>
                            </RadioButton.Group>
                        </View>

                    </View>

                    <Card
                        title='Modalidades*'
                    >
                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <RadioButton
                                status={checked1}
                                onPress={checked1 === 'unchecked'
                                    ? () => { this.setState({ checked1: 'checked' }); }
                                    : () => { this.setState({ checked1: 'unchecked' }); }
                                }
                            />
                            <Text>
                                Caminhada
          </Text>
                        </View>

                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <RadioButton
                                status={checked2}
                                onPress={checked2 === 'unchecked'
                                    ? () => { this.setState({ checked2: 'checked' }); }
                                    : () => { this.setState({ checked2: 'unchecked' }); }
                                }
                            />
                            <Text>
                                Corridas Curtas
           </Text>
                        </View>

                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <RadioButton
                                status={checked3}
                                onPress={checked3 === 'unchecked'
                                    ? () => { this.setState({ checked3: 'checked' }); }
                                    : () => { this.setState({ checked3: 'unchecked' }); }
                                }
                            />
                            <Text>
                                Corridas Médias
            </Text>
                        </View>
                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <RadioButton
                                status={checked4}
                                onPress={checked4 === 'unchecked'
                                    ? () => { this.setState({ checked4: 'checked' }); }
                                    : () => { this.setState({ checked4: 'unchecked' }); }
                                }
                            />
                            <Text>
                                Corridas de longa distância
            </Text>
                        </View>

                    </Card>


                    <View style={styles.inputContainerArea}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ultraviolet/2x/about-us-male.png' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Descrição"
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            textContentType='URL'
                            multiline={true}
                            numberOfLines={6}
                            onChangeText={(description) => this.setState({ description })}
                        />

                    </View>

                    <Text style={{ fontSize: 15, marginTop: 20, textAlign: "center", justifyContent: "center" }}>
                        Opções marcadas com * são de preenchimento obrigatório
          </Text>

                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                        onPress={this.CheckTextInput}>
                        <Text style={styles.signUpText}>Cadastrar</Text>
                    </TouchableHighlight>

                    <Text style={{ fontSize: 10, marginTop: 20, marginBottom: 100, textAlign: "center", justifyContent: "center" }}>
                        Corre Comigo! Development Team
          </Text>

                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EFEFEF',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginLeft: 60,
        marginBottom: 0,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputContainerPhoto: {
        marginBottom: 0,
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputContainerArea:
    {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: 250,
        height: 200,
        marginLeft: 60,
        marginBottom: 0,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 400,
        marginLeft: 16,
        marginRight: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 60,
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#ff8000",
    },
    signUpText: {
        color: 'white',
    },
    logoImage: {
        width: 150,
        height: 150,
        marginBottom: 30
    }
});
