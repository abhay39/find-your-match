import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import {useTailwind} from 'tailwind-rn';

const LoginScreen = () => {
  const tailwind = useTailwind();
  const {signInWithGoogle, loading} = useAuth();
  const navigation=useNavigation();
  
  return (
    <View style={{flex:1,}}>
      <ImageBackground source={{uri:'https://i.imgur.com/wOXw0Wo.png'}}
      resizeMode='cover' style={tailwind("flex-1"),{height:'100%'}}>
        <TouchableOpacity style={styles.container}
        onPress={signInWithGoogle}
        >
          
          <Text style={{fontSize:18, fontWeight:'bold',color:'#2F03F0', marginLeft:40}}>Sign In & Get Swapping</Text>
        </TouchableOpacity>
        <Image style={{height:50, width:50,marginRight:100, marginTop:-50, marginLeft:65}} source={{uri:'https://i.imgur.com/WlPAGby.png'}}/>
      </ImageBackground>
      
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop:700,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius:20,
    height:50,
    marginHorizontal:'15%',
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    fontFamily : 'semi-bold',
    color:'black',
  }
});
