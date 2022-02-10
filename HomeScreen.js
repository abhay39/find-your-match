import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect,useState,useLayoutEffect, useRef } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import useAuth from '../hooks/useAuth';
import {useTailwind} from 'tailwind-rn';
import {AntDesign, Entypo,Ionicons} from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper';
import {doc, onSnapshot, collection, setDoc, getDocs, query, where,getDoc, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase';
import generateId from '../lib/generateId';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const HomeScreen = () => {
  const tailwind = useTailwind();
    const navigation=useNavigation();
    const {user, logout}=useAuth();
    const [profiles, setProfiles] = useState([]);
    const swipeRef=useRef(null);

    useLayoutEffect(()=>
      onSnapshot(doc(db,'users', user.uid),snapshot=>{
        // console.log(snapshot);
        if(!snapshot.exists()){
          navigation.navigate('Modal');
        }
      }),
    [])

    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown:false,
      })
    });

    useEffect(()=>{
      let unsub;

      const fetchCards=async()=>{
        const passes =await getDocs(collection(db,'users', user.uid, 'passes'))
        .then((snapshot)=>snapshot.docs.map((doc)=>doc.id));
        
        const passedUserIds=passes.length > 0 ? passes : ['test'];

        const swipes = await getDocs(collection(db,'users', user.uid, 'swipes'))
        .then(snapshot=>snapshot.docs.map(doc=>doc.id))

        const swipedUserIds=swipes.length > 0 ? swipes : ['test'];

        unsub=onSnapshot(
          query(
            collection(db, 'users'),
            where('id','not-in',[...passedUserIds,...swipedUserIds])),
            (snapshot)=>{
          setProfiles(
            snapshot.docs.filter(doc=>doc.id !== user.uid).map(doc =>({
              id:doc.id,
              ...doc.data()
            }))
          )
        })
      }
      fetchCards();
      return unsub;
    },[db])

    const swipeLeft=(cardIndex)=>{
      if(!profiles[cardIndex]){
        return;
      }
      const userSwiped=profiles[cardIndex];
      // console.log(`You Swiped Pass on ${userSwiped.displayName}`);
      setDoc(doc(db,'users', user.uid, 'passes',userSwiped.id),userSwiped);
    }


    const swipeRight=async(cardIndex)=>{
      if(!profiles[cardIndex]){
        return;
      }
      const userSwiped=profiles[cardIndex];

      const loggedInProfile=await(await getDoc(doc(db, 'users', user.uid))).data();

      // check if the user swiped on you

      getDoc(doc(db,'users', userSwiped.id, 'swipes', user.uid)).then((documentSnapshot)=>{
        if(documentSnapshot.exists()){
          // Create a Match
          // console.log(`Horray, You MATCHED with ${userSwiped.displayName}`);

          setDoc(doc(db,'users', user.uid, 'swipes',userSwiped.id),userSwiped);

          // creating a match

          setDoc(doc(db,'matches',generateId(user.uid, userSwiped.id)),{
            users:{
              [user.uid]:loggedInProfile,
              [userSwiped.id]:userSwiped
            },
            usersMatched:[user.uid, userSwiped.id],

            timestamp:serverTimestamp(),
          });
            navigation.navigate('Match',{
              loggedInProfile,userSwiped
            });
        }
        else{ 
          // user has swiped as first interaction between the two or didnot get swipped on

          // console.log(`You Swiped on ${userSwiped.displayName} (${userSwiped.job})`);

          setDoc(doc(db,'users', user.id, 'swipes', userSwiped.id),userSwiped);
        }
      });

      // console.log(`You Swiped on ${userSwiped.displayName}(${userSwiped.job})`);

      setDoc(doc(db,'users', user.uid, 'swipes',userSwiped.id),userSwiped);
    };

  

  return (
    <SafeAreaView style={{marginTop:40, flex:1}}>
      {/* Header */}
      <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{marginLeft:20, top:3}}
          onPress={logout}
        >
          <Image style ={styles.image} source={{uri:user.photoURL}}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Modal')} style={{marginTop:-45}}>
          <Image style={{height:50, width:50}} source={{uri:'https://i.imgur.com/HYyYuUh.jpg'}}/>
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft:340, marginTop:-60}}
          onPress={()=>navigation.navigate('Chat')}
        >
          <Ionicons name="chatbubbles-sharp" size={50} color="#FF6556" style={{marginTop:10}}/>
        </TouchableOpacity>
      </View>
      {/* Card */}
      <View style={styles.container}>
        <Swiper 
          ref={swipeRef}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          // animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex)=>
            {
              // console.log('Swipe PASS'); 
              swipeLeft(cardIndex)
            }}
          onSwipedRight={(cardIndex)=>{
            // console.log('Swipe MATCH')
            swipeRight(cardIndex)
          }}
          overlayLabels={{
            left:{
              title:"NOPE",
              style:{
                label:{
                  textAlign:'right',
                  color:'red',
                }
              }
            },
            right:{
              title:"MATCH",
              style:{
                label:{
                  textAlign:'left',
                  color:'green',
                }
              }
            }
          }}
          renderCard={(card)=>card ? (
              <View key={card.id} style={styles.card}>
                {/* <Text>{card.firstName}</Text> */}
                <Image style={{height:500, width:"100%", marginTop:-80, borderRadius:25}} source={{uri:card.photoURL}} />
                <View>
                  <View>
                    <Text style={{marginTop:20,marginLeft:15,fontWeight:'bold', fontSize:24}}>{card.displayName}</Text>
                    <Text style={{marginLeft:15, fontSize:14}}>{card.job}</Text>
                  </View>
                  <Text style={{textAlign: "center", fontSize:25, marginLeft:320, marginTop:-50,fontWeight:'bold'}}>{card.age}</Text>
                </View>
              </View>
            ):(
               <View style={{backgroundColor:'white', height:500,justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',paddingBottom:30, fontSize:20}}>No more Profile</Text>
                  <Image 
                  style={{
                    height:200,
                    width:200,
                  }}
                  height={100}
                  width={100}
                  source={{uri:'https://i.imgur.com/C2cTnhH.png'}}
                  />
                </View>
            )}
        />
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <TouchableOpacity
         onPress={()=>swipeRef.current.swipeLeft()}
         style={{alignItems:'center', justifyContent:'center', width:60, height:60, backgroundColor:'#ff69b4', borderRadius:30}}>
          <Entypo name="cross" size={40} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>swipeRef.current.swipeRight()}
         style={{alignItems:'center', justifyContent:'center', width:60, height:60, backgroundColor:'#7cfc00', borderRadius:30}}>
          <AntDesign name="heart" size={40} color="green" />
        </TouchableOpacity>
          
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image:{
    width:50,
    height:50,
    borderRadius:50,
    marginRight:350,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  card: {
    // flex: 1,
    height:530,
    borderRadius: 25,
    // borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop:50,
  },
  text: {
    marginRight:20,
    textAlign: "left",
    fontSize: 20,
    backgroundColor: "transparent"
  }
});
