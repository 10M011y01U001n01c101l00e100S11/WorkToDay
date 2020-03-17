import * as firebase from "firebase/app";
import 'firebase/database'
import moment from "moment";
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
    return db.ref('tb_user')
};

export const getUsersLogin = (user, pass) => {
    return db.ref('tb_user')
};

export const getTracking = (user, pass) => {
    return db.ref('tb_check')
};

export const getCheckInUsers = (user, pass) => {
    return db.ref('tb_check').child(localStorage.getItem('login__key'))
};

export const setCheckIn = (user = localStorage.getItem('login_username'), pass = localStorage.getItem('login_password')) => {
    let newKey = db.ref().child(`tb_check/${localStorage.getItem('login__key')}`).push().key;
    let updates = {};
    const list = {
        "_key": newKey,
        "check_in": moment().format(),
        "check_out": "",
        "check_user": user,
        "work_list": moment().format('HH') >= 6 && moment().format('HH') <= 18 ? "Morning job" : "Late night"
    }
    updates[`/tb_check/${localStorage.getItem('login__key')}/` + newKey] = list;
    return db.ref().update(updates)
};

export const setCheckOut = (e) => {    
    let updates = {};
    const list = {
        "_key": e._key,
        "check_in": e.check_in,
        "check_out": moment().format(),
        "check_user": e.check_user,
        "work_list": e.work_list
    }
    updates[`/tb_check/${localStorage.getItem('login__key')}/` + e._key ] = list;
    return db.ref().update(updates)
};

export const addUsers = (username = '', password = '', lastname = '', img = '', fristname = '') => {
    let newKey = db.ref().child(`tb_user`).push().key;
    let updates = {};
    const list = {
        "_key": newKey,
        "fristname": fristname,
        "img": img || 'https://f0.pngfuel.com/png/980/886/male-portrait-avatar-png-clip-art.png',
        "lastname": lastname,
        "password": password,
        "username": username,
        "role": "user"
    }
    updates[`/tb_user/` + newKey] = list;
    return db.ref().update(updates)
};


export const fetchIP = () => {
   return fetch('https://api.ipify.org/?format=json').then((e) => e.json()).then(e => (e.ip))
}

export const IP_ADDRESS = [{ip: '124.122.16.16'}, {ip: '183.89.70.85'}, {ip: '1.47.105.198'}, {ip: '223.205.234.94'}]