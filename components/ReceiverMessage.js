import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn';

const RecieverMessage = ({message}) => {
  const tailwind = useTailwind();
  return (
    <View >
      <Text
        style={{backgroundColor:'#EFE9E9',padding:10,borderRadius:10,marginLeft:60,padding:10,margin:10, alignSelf:'flex-start',left:0, color:'blue',fontSize:16,fontWeight:'bold'}}
      >{message.message}</Text>
      <Image style={{marginTop:-50,borderRadius:30,height:50, width:50}} source={{uri:message.photoURL}}/>
    </View>
  );
};

export default RecieverMessage;

const styles = StyleSheet.create({});
