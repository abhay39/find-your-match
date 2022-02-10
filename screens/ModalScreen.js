import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';
import { doc, serverTimestamp, setDoc, onSnapshot, snapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ModalScreen = () => {
    const {user} = useAuth();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm=!image || !job || !age;

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:"Update Your Profile",
            headerStyle:{
                backgroundColor:"#FF5864",
            },
            headerTitleStyle:{color:'white'}
        })
    },[])

    const updateUserProfile=()=>{
        setDoc(doc(db,'users', user.uid),{
            id: user.uid,
            displayName:user.displayName,
            photoURL:image,
            job:job,
            age:age,
            timestamp:serverTimestamp()
            
        }).then(()=>{
            navigation.navigate('Home');
        }).catch(error=>{
            alert(error.message);
            console.log(error);
        })
    };
  return (
    <View style={{flex:1,alignItems:'center', paddingTop:10,}}>
      <Image style={{height:100,width:400, marginTop:40}} source={{uri:'https://i.imgur.com/x8OMTBw.png'}}/>
      <Text style={{fontSize:20, fontWeight:'bold', marginTop:20}}>Welcome {user.displayName}</Text>
        <Text style={{color:'red', fontWeight:'bold', padding:20,fontSize:20}}> 
            Step 1: The Profile Picture
        </Text>
        <TextInput 
            value={image}
            onChangeText={setImage}
            style={{textAlign:'center',fontSize:20, paddingBottom:20}}
            placeholder="Enter your profile picture url"
        />
        <Text style={{color:'red', fontWeight:'bold', padding:20,fontSize:20}}> 
            Step 2: The Job
        </Text>
        <TextInput 
            value={job}
            onChangeText={setJob}
            style={{textAlign:'center',fontSize:20, paddingBottom:20}}
            placeholder="Enter your Occupation"
        />
        <Text style={{color:'red', fontWeight:'bold', padding:20,fontSize:20}}> 
            Step 3: The Age
        </Text>
        <TextInput 
            value={age}
            onChangeText={setAge}
            style={{textAlign:'center',fontSize:20, paddingBottom:20}}
            placeholder="Enter your age"
            maxLength={2}
            keyboardType="numeric"
        />
        <KeyboardAvoidingView>
            <TouchableOpacity 
                disabled={incompleteForm}
                style={[{width:250,height:70,alignItems:'center',
                    justifyContent:'center', padding:3,backgroundColor:'red',
                    borderRadius:15}, incompleteForm?{backgroundColor:'gray'}:{backgroundColor:'red'}]}
                    onPress={updateUserProfile}    
                >
                <Text style={{fontSize:25, fontWeight:'bold', color:'white'}}>Update Profile</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({});
