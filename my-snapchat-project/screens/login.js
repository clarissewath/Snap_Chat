import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Login = ({ navigation }) => {

    const [loginEmail, setLoginEmail] = useState(' ');
    const [loginPwd, setLoginPwd] = useState(' ');

    const connect = () => {

        let data = JSON.stringify({
            "email": loginEmail,
            "password": loginPwd
            });
    
            let config = {
            method: 'post',
            url: 'http://snapi.epitech.eu:8000/connection',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };
    
            axios(config)
            .then( async function (response) {
                console.log(JSON.stringify(response.data));
                let result = JSON.stringify(response.data);
                if (result)
                {
                    await AsyncStorage.setItem(
                        'userToken',
                        JSON.stringify(response.data.data.token)
                    );
                    navigation.navigate('Profile');
                }
            })
            .catch(function (error) {
            console.log(error);
            });
    };

    return (
        <ScreenContainer>
            <TextInput style={styles.input}
            keyboardType="email-address"
            placeholder="Enter your email"
            onChangeText={text => setLoginEmail(text)}
            />
            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="Enter your password"
            onChangeText={text => setLoginPwd(text)}
            />

            <TouchableOpacity
            onPress={connect}
            style={styles.button}>
            <Text style={styles.textInput}>Go</Text>
            </TouchableOpacity>
        </ScreenContainer>
)};


const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);


const styles = StyleSheet.create({
 
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileContainer: {
        flex: 1,
        backgroundColor: 'lightcoral',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 305, 
        height: 200
    },

    title: {
        color: '#888', 
        fontSize: 18, 
        fontFamily: 'Cochin',
        marginBottom: 30
    },

    textInput: {
        fontSize: 20, 
        color: 'white',
        padding: 5,
        fontFamily: 'Cochin',
    },

    button: {
        margin: 15,
        padding: 5,
        borderRadius: 20,
        paddingHorizontal: 30,
        backgroundColor: 'black',
    },

    input: {
        backgroundColor: 'white',
        fontSize: 20, 
        color: 'black',
        margin: 10,
        paddingHorizontal: 50,
        padding: 10,
        fontFamily: 'Cochin'
    }
});