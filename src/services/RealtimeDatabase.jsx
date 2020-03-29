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

// const night_job = '07:00'
// const chk_work_list_morningt.time_in = '19:00'
// const time_work = 12.00

export const getUsers = () => {
    return db.ref('tb_user')
};

export const getWorkingTime = () => {
    return db.ref('tb_working_time')
};

export const setWorkingTime = (time_in_morning, time_out_morning, time_in_night, time_out_night) => {
    let updates = {};
    const list = [{
        "key": '0',
        "savetime": 0,
        "time_in": time_in_morning,
        "time_out": time_out_morning,
        "work": 'Morning job'
    }, {
        "key": '1',
        "savetime": 12,
        "time_in": time_in_night,
        "time_out": time_out_night,
        "work": 'Late night'
    }]
    updates[`/tb_working_time/`] = list;
    return db.ref().update(updates)
};
// Morning job
// Late night

export const getUsersLogin = () => {
    return db.ref('tb_user')
};

export const getTracking = () => {
    return db.ref('tb_check')
};

export const getCheckInUsers = () => {
    return db.ref('tb_check').child(localStorage.getItem('login__key'))
};

export const setCheckIn = (fetchIP, fetchMACAddress, workingTime, user = localStorage.getItem('login_username'), pass = localStorage.getItem('login_password')) => {
    let newKey = db.ref().child(`tb_check/${localStorage.getItem('login__key')}`).push().key;
    let updates = {};
    let mac_address = fetchMACAddress;

    let work_list = moment().format('HH') >= 4 && moment().format('HH') <= 16 ? "Morning job" : "Late night"
    let chk_work_list_night = workingTime.find(({ work }) => work === "Late night")
    let chk_work_list_morningt = workingTime.find(({ work }) => work === "Morning job")


    let chkin = moment(moment().format()).add(chk_work_list_night.savetime, 'hours').format('HH:mm')
    let chklate = moment(chk_work_list_night.time_in, 'HH:mm').add(chk_work_list_night.savetime, 'hours').format('HH:mm')
    let datechkin = moment(chkin, 'HH:mm')
    let datechklate = moment(chklate, 'HH:mm')
    let newdate = moment(datechkin).diff(datechklate, 'minutes')
    let mewtime = newdate >= 60 ? (+(newdate / 60).toFixed(2)).toString().replace('.', ' ชั่วโมง ') : newdate

    let newdateM = moment(moment().add(0, 'hours')).diff(moment(chk_work_list_morningt.time_in, 'HH:mm').add(chk_work_list_morningt.savetime, 'hours'), 'minutes')
    let mewtimeM = newdateM >= 60 ? ((+(newdateM / 60).toFixed(2)).toString()).replace('.', ' ชั่วโมง ') : newdateM

    // .add(-12, 'hour')
    const list = {
        "_key": newKey,
        "check_in": moment().format(),
        "check_out": "",
        "check_night_late": newdate,
        "check_morning_late": newdateM,
        "check_user": user,
        "work_list": work_list,
        "MAC_ADDRESS": mac_address || '',
        "IP_ADDRESS": fetchIP || '',
    }

    // console.log(list);


    // console.log(
    //     moment(list.check_in).format(' LL เวลา HH:mm นาที ')
    //     + (localStorage.getItem('login_firstname') + ' ')
    //     + (list.work_list === "Morning job" ? moment(moment(list.check_in).add(0, 'hours')).diff(moment(chk_work_list_morningt.time_in, 'HH:mm').add(chk_work_list_morningt.savetime, 'hours'), 'minutes') > 0 ? ' กะเช้า สาย ' + mewtimeM + ' นาที' : ' กะเช้า ตรงเวลา ' : newdate > 0 ? ' เข้างานกะดึก สาย ' + mewtime + ' นาที' : ' เข้างานกะดึก ตรงเวลา ')
    // )
    // console.log(moment(moment(list.check_in).add(0, 'hours')).diff(moment(chk_work_list_morningt.time_in, 'HH:mm').add(chk_work_list_morningt.savetime, 'hours'), 'minutes'));



    // console.log(
    //         moment(list.check_in).format(' LL เวลา HH:mm นาที ')
    //         + (localStorage.getItem('login_firstname') + ' ')
    //         + (list.work_list === "Morning job" ? moment(moment(list.check_in).add(0, 'hours')).diff(moment(chk_work_list_morningt.time_in, 'HH:mm').add(chk_work_list_morningt.savetime, 'hours'), 'minutes') > 0 ? ' กะเช้า สาย ' + mewtimeM + ' นาที' : ' กะเช้า ตรงเวลา ' : newdate > 0 ? ' เข้างานกะดึก สาย ' + mewtime + ' นาที' : ' เข้างานกะดึก ตรงเวลา ')
    //     )

    sendLineNotify(
        moment(list.check_in).format(' LL เวลา HH:mm นาที ')
        + (localStorage.getItem('login_firstname') + ' ')
        + (list.work_list === "Morning job" ? moment(moment(list.check_in).add(0, 'hours')).diff(moment(chk_work_list_morningt.time_in, 'HH:mm').add(chk_work_list_morningt.savetime, 'hours'), 'minutes') > 0 ? ' กะเช้า สาย ' + mewtimeM + ' นาที' : ' กะเช้า ตรงเวลา ' : newdate > 0 ? ' เข้างานกะดึก สาย ' + mewtime + ' นาที' : ' เข้างานกะดึก ตรงเวลา ')
    )

    updates[`/tb_check/${localStorage.getItem('login__key')}/` + newKey] = list;
    return db.ref().update(updates)
};

export const setCheckOut = (e, workingTime) => {
    let updates = {};
    let chk_work_list_night = workingTime.find(({ work }) => work === "Late night")
    let chk_work_list_morningt = workingTime.find(({ work }) => work === "Morning job")

    const list = {
        "_key": e._key,
        "check_in": e.check_in,
        "check_out": moment().format(),
        "check_night_late": e?.check_night_late,
        "check_morning_late": e?.check_night_late,
        "check_user": e.check_user,
        "work_list": e.work_list,
        "MAC_ADDRESS": e?.MAC_ADDRESS,
        "IP_ADDRESS": e?.IP_ADDRESS,
    }

    let morning_job = moment(chk_work_list_morningt.time_out, 'HH:mm').diff(moment(), 'minutes') > 0 ? ' ออกงานก่อนเวลา ' + moment(chk_work_list_morningt.time_out, 'HH:mm').fromNow(true) : 'ออกงานตรงเวลา'
    let night_job = moment(chk_work_list_night.time_out, 'HH:mm').diff(moment(), 'minutes') > 0 ? ' ออกงานก่อนเวลา ' + moment(chk_work_list_night.time_out, 'HH:mm').fromNow(true) : 'ออกงานตรงเวลา'
    // let newdateM = 469
    // let mewtimeM = newdateM >= 60 ? (+(newdateM / 60).toFixed(2)).toString().replace('.', ' ชั่วโมง ') : newdateM
    // let newdateM = moment(list.check_out).diff(moment(list.check_in), 'minutes')
    // let mewtimeM = newdateM >= 60 ? (+(newdateM / 60).toFixed(2)) < time_work ? (+(time_work - (+(newdateM / 60).toFixed(2))).toFixed(2)).toString().replace('0.', '').replace('.', ' ชั่วโมง ') : (+(newdateM / 60).toFixed(2)).toString().replace('.', ' ชั่วโมง ') : ' 11 ชั่วโมง ' + (59 - +(((+(newdateM / 60).toFixed(2)).toString()).substring(2)))
    // console.log(newdateM);
    // console.log(mewtimeM[0] === '0' ? mewtimeM.slice(1) : mewtimeM);
    // console.log(' 11 ชั่วโมง ' + (59 - +(((+(newdateM / 60).toFixed(2)).toString()).substring(2))));
    // console.log((newdateM < 720 ? ' ออกงานก่อนเวลา ' + (mewtimeM[0] === '0' ? mewtimeM.slice(1) : mewtimeM) + ' นาที ' : ' ออกงานตรงเวลา'));
    // console.log(moment('07:00','HH:mm').fromNow(true));
    // console.log(moment(chk_work_list_night.time_out,'HH:mm').diff(moment(), 'minutes') > 0 ? ' ออกงานก่อนเวลา ' + moment(chk_work_list_night.time_out,'HH:mm').fromNow(true) : 'ออกงานตรงเวลา');
    // console.log(moment(chk_work_list_morningt.time_out,'HH:mm').diff(moment(), 'minutes') > 0 ? ' ออกงานก่อนเวลา ' + moment(chk_work_list_morningt.time_out,'HH:mm').fromNow(true) : 'ออกงานตรงเวลา');
    // console.log(moment('07:00','HH:mm').diff(moment(), 'minutes') > 0 );
    // console.log(e.work_list === "Morning job" ? (morning_job) : (night_job));


    // console.log(
    //     moment(list.check_out).format(' LL เวลา HH:mm นาที ')
    //     + (localStorage.getItem('login_firstname') + ' ')
    //     + (e.work_list === "Morning job" ? (morning_job) : (night_job))
    // )
    // console.log(e.work_list);
    // console.log(moment(chk_work_list_night.time_out,'HH:mm').diff(moment(), 'minutes'));


    sendLineNotify(
        moment(list.check_out).format(' LL เวลา HH:mm นาที ')
        + (localStorage.getItem('login_firstname') + ' ')
        + (e.work_list === "Morning job" ? (morning_job) : (night_job))
    )
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


export const updateUsers = (_key, firstname, img, lastname, password, username, role) => {
    let updates = {};
    const list = {
        "_key": _key,
        "firstname": firstname,
        "img": img || 'https://f0.pngfuel.com/png/980/886/male-portrait-avatar-png-clip-art.png',
        "lastname": lastname,
        "password": password,
        "username": username,
        "role": role
    }
    updates[`/tb_user/` + _key] = list;
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
