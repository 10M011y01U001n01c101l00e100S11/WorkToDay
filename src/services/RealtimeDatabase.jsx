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

export const setCheckIn = (fetchIP, fetchMACAddress, user = localStorage.getItem('login_username'), pass = localStorage.getItem('login_password')) => {
    let newKey = db.ref().child(`tb_check/${localStorage.getItem('login__key')}`).push().key;
    let updates = {};
    let mac_address = fetchMACAddress;
    let chkin = moment(moment().format()).add(12, 'hours').format('HH:mm')
    let chklate = moment('23:30', 'HH:mm').add(12, 'hours').format('HH:mm')
    let datechkin = moment(chkin, 'HH:mm')
    let datechklate = moment(chklate, 'HH:mm')
    let newdate = moment(datechkin).diff(datechklate, 'minutes')
    let mewtime = newdate >= 60 ? (+(newdate/60).toFixed(2)).toString().replace('.', ' ชั่วโมง ') : newdate
    const list = {
        "_key": newKey,
        "check_in": moment().format(),
        "check_night_late": newdate,
        "check_out": "",
        "check_user": user,
        "work_list": moment().format('HH') >= 6 && moment().format('HH') <= 18 ? "Morning job" : "Late night",
        "MAC_ADDRESS": mac_address || '',
        "IP_ADDRESS": fetchIP || '',
    }
    sendLineNotify(
       moment(list.check_in).format(' LL ')
        + (localStorage.getItem('login_firstname') + ' ' + localStorage.getItem('login_lastname'))
        + (list.work_list === "Morning job" ? moment(moment(list.check_in).add(0, 'hours')).diff(moment('11.30', 'HH:mm').add(0, 'hours'), 'minutes') > 0 ? ' กะเช้า สาย ' : ' กะเช้า ตรงเวลา ' : newdate > 0 ? ' เข้างานกะดึก สาย ' + mewtime + ' นาที' : ' เข้างานกะดึก ตรงเวลา ')
        )
        

        
        
        
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
    updates[`/tb_check/${localStorage.getItem('login__key')}/` + e._key] = list;
    return db.ref().update(updates)
};

export const addUsers = (username = '', password = '', lastname = '', img = '', firstname = '') => {
    let newKey = db.ref().child(`tb_user`).push().key;
    let updates = {};
    const list = {
        "_key": newKey,
        "firstname": firstname,
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

export const fetchMacAddress = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch("https://work-at-home.herokuapp.com/ ", requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => error);
}

export const sendLineNotify = (list) => {
    // eslint-disable-next-line
    fetch("https://work-at-home.herokuapp.com/linenoti?message=" + list)
        .then(response => response.text())
}

export const IP_ADDRESS = () => {
    return db.ref('tb_ip')
};
