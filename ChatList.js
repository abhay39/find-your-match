import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React,{useEffect, useState} from 'react';
import {onSnapshot,collection, query, where} from 'firebase/firestore';
import {db} from '../firebase';
import useAuth from '../hooks/useAuth';
import ChatRow from '../components/ChatRow';


const ChatList = () => {
    const [matches, setMatches] =useState([]);
    const {user}=useAuth();

    useEffect(()=>
        onSnapshot(
            query(
                collection(db,'matches'),
                where("usersMatched",'array-contains',user.uid)),(snapshot)=>setMatches(snapshot.docs.map((doc)=>({
                    id:doc.id, 
                    ...doc.data(),
        }))
        )),
    [user]);
        console.log(matches);
  return (
    matches.length>0 ? (
        <FlatList
            data={matches}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=><ChatRow matchDetails={item}/>}
        />

    ):( 
        <View>
            <Text style={{padding:30,marginTop:50,fontSize:25,fontWeight:'bold', textAlign:'center', justifyContent:'center',}}>No Message at the current time.</Text>
            <Image 
                  style={{
                    height:400,
                    width:400,
                    alignItems:'center',
                    justifyContent:'center',
                    marginLeft:10
                  }}
                  height={100}
                  width={100}
                  source={{uri:'https://i.imgur.com/C2cTnhH.png'}}
                  />
        </View>
        
    )
  );
};

export default ChatList;

const styles = StyleSheet.create({});
