import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from "axios";

export const Signup = ({ navigation }) => {
    
    const [signupEmail, setSignupEmail] = useState(' ');
    const [signupPwd, setSignupPwd] = useState(' ');
    
    const submit = () => {

        let data = JSON.stringify({
        "email": signupEmail,
        "password": signupPwd
        });

        let config = {
        method: 'post',
        url: 'http://snapi.epitech.eu:8000/inscription',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            let result = JSON.stringify(response.data);
            if (result)
            {
                navigation.navigate('Login');
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
            onChangeText={text => setSignupEmail(text)}
            />
            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="Enter your password"
            onChangeText={text => setSignupPwd(text)}
            />

            <TouchableOpacity
            onPress={submit}
            style={styles.button}>
            <Text style={styles.textInput}>Create my account</Text>
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