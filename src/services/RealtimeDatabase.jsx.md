import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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
const db = firebase.firestore();

export const createGroceryList = (userName, userId) => {
    return db.collection('groceryLists')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
            users: [{ 
                userId: userId,
                name: userName
            }]
        });
};

export const getGroceryList = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .get();
};

export const getGroceryListItems = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .get();
}

export const streamGroceryListItems = (groceryListId, observer) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .orderBy('created')
        .onSnapshot(observer);
};

export const addUserToGroceryList = (userName, groceryListId, userId) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion({ 
                userId: userId,
                name: userName
            })
        });
};

export const addGroceryListItem = (item, groceryListId, userId) => {
    return getGroceryListItems(groceryListId)
        .then(querySnapshot => querySnapshot.docs)
        .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
        .then(matchingItem => {
            if (!matchingItem) {
                return db.collection('groceryLists')
                    .doc(groceryListId)
                    .collection('items')
                    .add({
                        name: item,
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        createdBy: userId
                    });
            }
            throw new Error('duplicate-item-error');
        });
};