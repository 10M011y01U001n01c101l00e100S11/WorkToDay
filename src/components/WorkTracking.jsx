import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

import * as FirestoreService from '../services/RealtimeDatabase';
import { Container } from "@material-ui/core";
import WorkTrackingTab from "./WorkTrackingTab";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 220,
    height: 220,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function WorkTracking() {
  const classes = useStyles();
  const [userData, setUserData] = useState([])
  const [userDetail, setUserDetail] = useState([])
  document.title = 'Work To Day | Users';
  useEffect(() => {
    FirestoreService.getTracking().on("value", snapshot => {
      const array = [];
      const subArray = [];
      const masterArray = [];
      snapshot.forEach((el) => {     
        array.push(el.key);

        el.forEach(e => {
          if (array.find(e => e === el.key)) {
            subArray.push({key: el.key, value: e.val()})
          }
                
        })
      });
      array.forEach(e => {
        masterArray.push([subArray.filter(({key}) => key === e).reverse()[0]])
        // console.log([subArray.filter(({key}) => key === e).reverse()[0]]);
        
      })
        setUserData(masterArray)
    });
    FirestoreService.getUsers().on("value", snapshot => {
      const array = [];
      snapshot.forEach(el => {
        array.push(el.val());
      });
      setUserDetail(array)
    })
  }, [])
  
  // console.log(userData);
  // console.log(userDetail);
  
    // eslint-disable-next-line
    Array.from(userData, e => {
      // eslint-disable-next-line
      Array.from(e, el => {
        el.fristname = userDetail.find(({_key}) => _key === el.key)?.fristname
        el.img = userDetail.find(({_key}) => _key === el.key)?.img
        el.lastname = userDetail.find(({_key}) => _key === el.key)?.lastname
        el.password = userDetail.find(({_key}) => _key === el.key)?.password
        el.role = userDetail.find(({_key}) => _key === el.key)?.role
        el.username = userDetail.find(({_key}) => _key === el.key)?.username
      })
    })

  return (
    <Container>
      <div className={classes.root}>


        {/* <Container maxWidth="md"> */}
          <br />
          <center><WorkTrackingTab userData={userData} /></center>
          <br />
        {/* </Container> */}
      </div>

    </Container>
  );
}