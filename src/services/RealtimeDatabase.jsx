import * as firebase from "firebase/app";
import 'firebase/database'
const firebaseConfig = {
    apiKey: "AIzaSyDYHgcGjAglCjsex4BjI9cFFR-KaGG2Ras",
    authDomain: "ufa66-checkin.firebaseapp.com",
    databaseURL: "https://ufa66-checkin.firebaseio.com",
    projectId: "ufa66-checkin",
    storageBucket: "ufa66-checkin.appspot.com",
    messagingSenderId: "1073662313747",
    appId: "1:1073662313747:web:3fbf437025e180f31186e6",
    measurementId: "G-ZGTDDBZWCQ"
  };
  
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export const getUsers = () => {
    return db.ref('tb_user').once('value')
};

export const getUsersLogin = (user, pass) => {
    return db.ref('tb_user').once('value').then(data => data.val().find(({username, password}) => username.toString() === user.toString() && password.toString() === pass.toString()))
};


export const getGroceryListItems = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .get();
}