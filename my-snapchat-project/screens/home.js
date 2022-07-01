import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';


export const Home = ({ navigation }) => {
    return (
        <ScreenContainer>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Hello Snap!</Text>
            <StatusBar style="auto" />
    
            <TouchableOpacity
            onPress={() => navigation.push('Login')}
            style={styles.button}>
            <Text style={styles.textInput}>Login</Text>
            </TouchableOpacity>
    
            <TouchableOpacity
            onPress={() => navigation.push('Signup')}
            style={styles.button}>
            <Text style={styles.textInput}>Sign up</Text>
            </TouchableOpacity>
    
        </ScreenContainer>
    );
};


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