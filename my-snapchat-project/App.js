import React, {useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/home';
import { Signup } from './screens/signup';
import { Login } from './screens/login';
import { Profile } from './screens/profile';
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeStack = createNativeStackNavigator();
const UserConnectedStack = createNativeStackNavigator();
// const UserDisconnectedStack = createNativeStackNavigator();

export default function App() {

  const userToken = async () => {
    /*let token =*/ await AsyncStorage.getItem('userToken');
    //console.log(token, 'u')
  };
  let tokenData = userToken()
  // tokenData = null;

  return (

    <NavigationContainer>
      {tokenData ? (
        <UserConnectedStack.Navigator>
        {/* Screens that'll be redered if user is connected (has a token)*/}
          <UserConnectedStack.Screen name="Profile" component={Profile} options={{ title: 'Take a picture' }} />
        </UserConnectedStack.Navigator>
  
      ) : (
        <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'lightcoral' } }} >
          <HomeStack.Screen name="Home" component={Home}  options={{ title: 'Welcome' }} />
          <HomeStack.Screen name="Login" component={Login} options={{ title: 'Log in' }} />
          <HomeStack.Screen name="Signup" component={Signup} options={{ title: 'Sign up' }} />
        </HomeStack.Navigator>
      )}
     
      {/* <UserDisconnectedStack.Navigator> */}
      {/* Screens that'll be redered if user is disconnected (has no token) */}
        {/* <UserDisconnectedStack.Screen name="Home" component={Home}  options={{ title: 'Home' }} /> */}
        {/* <UserDisconnectedStack.Screen name="Login" component={Login} options={{ title: 'Log in' }} /> */}
      {/* </UserDisconnectedStack.Navigator> */}
    </NavigationContainer>
  );
}