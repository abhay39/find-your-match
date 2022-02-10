import { StyleSheet,Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { db } from '../firebase';
import {query, collection, onSnapshot, orderBy } from 'firebase/firestore';


const ChatRow = ({matchDetails}) => {
    const navigation=useNavigation();
    const {user}=useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState("");

    useEffect(()=>{
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users,user.uid));
    },[matchDetails, user]);

    useEffect(
        ()=>
            onSnapshot(
                query(
                    collection(db, 'matches', matchDetails.id, 'message'),
                    orderBy('timestamp', 'desc')
                    ),
                    (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
            ),[matchDetails,db]
    );
        

  return (
    <TouchableOpacity style={{flexDirection:'row', alignItems:'center',paddingLeft:20,marginTop:30,marginLeft:10,marginRight:20,backgroundColor:'white', height:80, borderRadius:15}}
    onPress={()=>navigation.navigate('Message',{
        matchDetails,
    })}
    >
        
        <Image 
            style={{borderRadius:40, height:65, width:65}}
            source={{uri:matchedUserInfo?.photoURL}}
        />
        <View>
            <Text style={{fontWeight:'bold',fontSize:16, marginLeft:15}}>
                {matchedUserInfo?.displayName}
            </Text>
            <Text style={{marginLeft:15,marginTop:10,fontWeight:'bold'}}
            >{lastMessage || 'Say Hi'}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({});
