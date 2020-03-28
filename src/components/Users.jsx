import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import * as FirestoreService from '../services/RealtimeDatabase';
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

export default function Users() {
  const classes = useStyles();
  const [userData, setUserData] = useState([])
  
  const history = useHistory();
  document.title = 'Work To Day | Users';
  useEffect(() => {
    FirestoreService.getUsers().on("value", snapshot => {
      const array = [];
      // For each data in the entry
      snapshot.forEach(el => {
        // Push the object to the array
        // If you also need to store the unique key from firebase,
        // You can use array.push({ ...el.val(), key: el.key });
        array.push(el.val());
      });
      setUserData(array);
    });
  }, [])
  return (
    <Container>
      <div className={classes.root}>
        <center><h3>Users</h3></center>
        <Grid container spacing={3}>
          {userData?.map(({ _key, firstname, img, lastname, password, username, role }) => (

            <Grid item sm={6} md={4} lg={3} container onClick={(e) => {history.push({
              pathname: '/updateusers',
              state: { _key, firstname, img, lastname, password, username, role }
            });history.go(0);} }>
              <Paper className={classes.paper}>
                <Grid spacing={6}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src={img} />
                    </ButtonBase>
                  </Grid>
                  <Grid item sm={12} lg container>
                    <Grid item sm container direction="column" spacing={3}>
                      <Grid item sm>
                        <Typography gutterBottom variant="subtitle1">
                          {firstname} {lastname}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          ID: {username}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

    </Container>
  );
}