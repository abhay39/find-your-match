import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import {Foundation} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const Header = ({title, callEnabled}) => {
    const navigation = useNavigation();
  return (
    <View style={{marginLeft:10,marginTop:40, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
            <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
          </TouchableOpacity>
          <Text style={{fontSize:25, fontWeight:'bold'}}>{title}</Text>
      </View>
      {callEnabled && (
            <TouchableOpacity style={{padding:10, backgroundColor:'#E1BBB3', borderRadius:50, margin:10}}>
                <Foundation name="telephone" size={25} color="red" />
            </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
