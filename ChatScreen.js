import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import React from 'react';
import  Header  from '../components/Header';
import { useNavigation } from '@react-navigation/core';
import ChatList from '../components/ChatList';

const ChatScreen = () => {
  const navigation = useNavigation();
  return (
    
    <SafeAreaView style={{flex:1}}>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
