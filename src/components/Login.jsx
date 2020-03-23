import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import * as FirestoreService from '../services/RealtimeDatabase';
import { useInput } from "../hooks/input-hook";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Check In / Out
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: "300px",
        height: "300px"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const { value: username, bind: bindUsername } = useInput('');
    const { value: password, bind: bindPassword } = useInput('');

    const history = useHistory();
    const onSubmitLogin = () => FirestoreService.getUsersLogin().on('child_added', async function (data) {
        if (data) {
            if (username === data.val().username && password === data.val().password) {
                await localStorage.setItem('login_check', true)
                await localStorage.setItem('login_data', JSON.stringify(data.val()))
                await localStorage.setItem('login__key', data.val()._key)
                await localStorage.setItem('login_role', data.val().role)
                await localStorage.setItem('login_firstname', data.val().firstname)
                await localStorage.setItem('login_lastname', data.val().lastname)
                await localStorage.setItem('login_img', data.val().img)
                await localStorage.setItem('login_username', username)
                await localStorage.setItem('login_password', password)
                await history.push('home')
                await history.go(0)
            }
        } else {
            Swal.fire(
                'Login false!',
                'users หรือ password',
                'warning'
            ).then(() => history.go())
        }
    });

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar
                        src="logo512.png"
                        className={classes.avatar}
                    />
                    <form className={classes.form} onSubmit={onSubmitLogin} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...bindUsername}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...bindPassword}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmitLogin}
                        >
                            Sign In
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}