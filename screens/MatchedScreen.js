import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';

const MatchedScreen = () => {
  const navigation=useNavigation();
  const {params} = useRoute();

  const {loggedInProfile, userSwiped} = params;

  return (
    <View style={{height:'100%', backgroundColor:'#EC2A01', paddingTop:20, opacity:0.89}}>
      <View style={{justifyContent:'center', paddingTop:20}}>
        <Image style={{height:100, width:400,marginLeft:10, marginTop:40}} source={{uri:'https://i.imgur.com/LnqcnIZ.png'}}/>
      </View>
      <Text style={{color:'white', textAlign:'center', marginTop:50, fontSize:20}}>
        You and {userSwiped.displayName} have liked each other!
      </Text>
      <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:50}}>
        <Image style={styles.imageMatch} source={{uri:loggedInProfile.photoURL}}/>
        <Image style={styles.imageMatch} source={{uri:userSwiped.photoURL}}
        />
      </View>
      <TouchableOpacity style={styles.sendMessage}
      onPress={()=>{
        navigation.goBack();
        navigation.navigate('Chat');
      }}
      >
        <Text style={{textAlign:'center',fontSize:25, color:'red'}}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;

const styles = StyleSheet.create({
  imageMatch:{
    width:130,
    height:130,
    borderRadius:80,
  },
  sendMessage:{
    backgroundColor:'white',
    margin:50,
    alignItems:'center',
    paddingTop:20,
    paddingBottom:20,
    borderRadius:20 ,
    marginTop:100,
  }
});
