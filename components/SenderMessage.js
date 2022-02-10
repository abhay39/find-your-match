import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SenderMessage = ({message}) => {
  return (
    <View style={{backgroundColor:'#5CA6E9',padding:10,borderRadius:20, marginLeft:'auto',marginRight:20,marginBottom:10}}>
      <Text
        style={{color:'white',textAlign:'center', fontSize:16,fontWeight:'bold', alignItems:'center',justifyContent:'center',}}
      >{message.message}</Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({});
