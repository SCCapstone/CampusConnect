import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const register = (email,password) => {
  if (!email || !password) {
    return
  }
  createUser(email, password)
}

export const createUser = async (email, password) => {
  try {
    let response = await auth().createUserWithEmailAndPassword(email, password)
    if (response) {
      console.log(tag, "?", response)
    }
  } catch (e) {
    console.error(e.message)
  }
}