import React from "react";
import { TextField, Container, Grid, Button } from "@material-ui/core";
import { useInput } from "../hooks/input-hook";
import * as FirestoreService from '../services/RealtimeDatabase';
import Users from "./Users";

export default function AddUsers() {
    document.title = 'Work To Day | Add Users';
    const { value: username, bind: bindUsername, reset: resetUsername } = useInput('');
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
    const { value: firstname, bind: bindFirstname, reset: resetFirstname } = useInput('');
    const { value: lastname, bind: bindLastname, reset: resetLastname } = useInput('');
    const { value: photo, bind: bindPhoto, reset: resetPhoto } = useInput('');
    const addUsers = () => {
        FirestoreService.addUsers(username, password, lastname, photo, firstname)
        resetUsername()
        resetPassword()
        resetFirstname()
        resetLastname()
        resetPhoto()
    }
    return (
        <>
            <Container>
                <h2>AddUsers</h2>
                <form>
                    <Grid container lg={12} spacing={3}>
                        <Grid item xs={12} sm={4} md={2}>
                            <TextField required defaultValue={username} label="Username" fullWidth {...bindUsername} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <TextField required defaultValue={password} label="Password" fullWidth type="password" {...bindPassword} />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={12} spacing={3}>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField required defaultValue={firstname} label="Firstname" fullWidth {...bindFirstname} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField required defaultValue={lastname} label="Lastname" fullWidth {...bindLastname} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField required defaultValue={photo} label="Photo" placeholder="www.img.com" fullWidth {...bindPhoto} />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid item lg={12}>
                        {username && password && firstname && lastname ?
                            <Button type="button" fullWidth variant="contained" color="primary" onClick={addUsers}>เพิ่มข้อมูล</Button>
                            : <Button type="button" fullWidth variant="contained" color="secondary">เพิ่มข้อมูล</Button>
                        }
                    </Grid>
                </form>
                <Users />
            </Container>
        </>
    );
}