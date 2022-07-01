import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
//import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import AppIcon from '../AppIcon';
//import * as Permissisons from 'expo-permissions';

export const Profile = ({ navigation }) => {

    // const disconnect = () => {
    //     //delete token then redirect to homeScreen

    //     const userToken = async () => {
    //         let token = await AsyncStorage.getItem('userToken');
    //         console.log(token, 'given')
    //     };
    //     let tokenData = userToken()
    //     if (tokenData)
    //     {
    //         console.log('token exist');
    //         const deleteToken = async () => {
    //             let token = await AsyncStorage.removeItem('userToken');
    //             console.log(token, 'deleted')
    //         };
    //         deleteToken();
    //     }
    //     //tokenData = null;
    //     navigation.navigate('Home');
    // };
    
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [imagePreview, setImagePreview] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const camRef = useRef(null);
    
    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    const takePicture = async () => {
        if (!camRef) 
        {
            return
        }
        try {
            const pic = await camRef.current.takePictureAsync()
            setImagePreview(pic.uri)
            setIsOpen(true)
        } catch (error) {
            console.log('error taking picture');
        }
    }

    const closeImagePreview = () => {
        setImagePreview(null)
        setIsOpen(false)
    } 

    if (imagePreview)
    {
        return (
            <Modal animationType='fade' visible={isOpen}>
                <Image source={{uri: imagePreview}} style={{height: '100%', width: '100%'}}/>
                <View style={styles.actionBottom}>
                    <AppIcon IonName='send-outline' size={25} color={'#eee'} style={styles.sendBtn} />
                </View>
                <View style={styles.closeBtn}>
                    <AppIcon AntName='closecircleo' size={30} color='white' onPress={closeImagePreview} />
                </View>
            </Modal>
        )
    }

    return (
        <ProfileScreen>
            {/* <TouchableOpacity
            onPress={disconnect}
            style={styles.buttonSignOut}>
            <Text style={styles.textInput}>Sign out</Text>
            </TouchableOpacity> */}

            {/* <View style={cameraStyles.container}> */}
            <Camera style={cameraStyles.camera} type={type} ref={camRef}>
                <View style={cameraStyles.buttonContainer}>
                <TouchableOpacity
                    style={cameraStyles.button}
                    onPress={() => {
                    setType(type === CameraType.back ? CameraType.front : CameraType.back);
                    }}>
                    <Text style={cameraStyles.text}> Flip </Text>
                </TouchableOpacity>
                <TouchableOpacity style={cameraStyles.capture} onPress={takePicture}></TouchableOpacity>
                </View>
            </Camera>
            {/* </View> */}
        </ProfileScreen>  
)};



const ProfileScreen = ({ children }) => (
    <View style={styles.profileContainer}>{children}</View>
);


const styles = StyleSheet.create({

    profileContainer: {
        flex: 1,
    },

    actionBottom: {
        position: 'absolute',
        bottom: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    sendBtn: {
        backgroundColor: 'black'
    },

    closeBtn: {
        padding: 10,
        position: 'absolute ',
        top: 40,
        backgroundColor: 'black'
    }
});

const cameraStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    capture: {
        position: 'absolute',
        bottom: 20,
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 6,
        alignSelf: 'center',
        marginLeft: 150,
    }
});