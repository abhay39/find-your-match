import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext,useEffect,useMemo,useState } from 'react';
import * as Google from 'expo-google-app-auth';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import {GoogleAuthProvider,onAuthStateChanged,signInWithCredential, signOut} from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

const config = {
  scopes:["profile", "email"],
  permissions:["public_profile", "email", "gender", "location"],
  androidClientId:'318312832931-2jsf0ssdjha5gihn7k19fliitl46tvar.apps.googleusercontent.com',
  iosClientId:'318312832931-uj9m5v9kbe300f34p3a9ltf3lq5sb0mp.apps.googleusercontent.com',
}

export const AuthProvider = ({children}) => {
  const [error,setError]=useState(null);
  const [user,setUser]=useState(null);
  const [loadingInitial,setLoadingInitial]=useState(true);
  const [loading,setLoading]=useState(false);


  useEffect(()=>
    onAuthStateChanged(auth,(user)=>{
      if(user){
        // Logged in
        setUser(user);
      }
      else{
        // Not Loged in
        setUser(null);
      }

      setLoadingInitial(false);
    }),[])


    const logout = () => {
      setLoading(true);
      signOut(auth).catch((error)=>setError(error)).finally(()=>setLoading(false));
    }


    const signInWithGoogle = async() => {
      setLoading(true);
        await Google.logInAsync(config)
        .then(async(logInResult)=>{
          if(logInResult.type=='success'){
            const {idToken,accessToken}=logInResult;
            const credential=GoogleAuthProvider.credential(idToken,accessToken);
            await signInWithCredential(auth, credential);
          }
          return Promise.reject();
        }).catch(error=>setError(error)).finally(()=>setLoading(false));
    }

    const memoedValue=useMemo(()=>({
          user,
          loading,
          error,
          signInWithGoogle,
          logout,
    }),[user,loading,error]);
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth(){
    return useContext(AuthContext);
}


const styles = StyleSheet.create({});
