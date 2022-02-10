import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';
import { useRoute } from '@react-navigation/core';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import {query,addDoc, collection, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const MessageScreen = ({}) => {
    const {user}= useAuth();
    const {params} = useRoute();
    const {matchDetails} = params;
    const [input, setInput] = useState('');
    const [message, setMessage] = useState([]);

    useEffect(()=>
        onSnapshot(query(collection(db,'matches',matchDetails.id,'messages'),orderBy('timestamp', 'desc')),snapshot=> setMessage(snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))))
    ,[matchDetails,db])

    const sendMessage = () => {
        addDoc(collection(db,'matches',matchDetails.id, 'messages'), {
           timestamp:serverTimestamp(),
            userId:user.uid,
            displayName:user.displayName,
            photoURL:matchDetails.users[user.uid].photoURL,
            message:input,
        })
        setInput("");
    };

       

  return (
    <SafeAreaView style={{flex:1}}>
        <Header title={getMatchedUserInfo(matchDetails.users, user.uid).displayName} callEnabled/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={{flex:1}}
        keyboardVerticalOffset={10}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <FlatList
               inverted={-1}
                data={message}
                style={{paddingLeft:10}}
                keyExtractor={item => item.id}
                renderItem={({item: message}) => 
                    message.userId===user.uid ? (
                        <SenderMessage key={message.id} message={message} />
                    ):(
                        <ReceiverMessage key={message.id} message={message} />
                    )
                }
               />
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

         <View
        style={{flexDirection:'row', justifyContent:'space-between', borderColor:'white', paddingLeft:20, paddingTop:20}}
      >
          <TextInput
            style={{height: 40}}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          /> 
          
     <Button onPress={sendMessage} title='Send' color='red' />
          
      </View> 
      
      
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
    
});

// incompleteForm?{backgroundColor:'gray'}:{backgroundColor:'red'}