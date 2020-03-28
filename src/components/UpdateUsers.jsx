import React from "react";
import { TextField, Container, Grid, Button } from "@material-ui/core";
import { useInput } from "../hooks/input-hook";
import * as FirestoreService from '../services/RealtimeDatabase';
import Users from "./Users";
import { useLocation, useHistory } from "react-router-dom";

export default function UpdateUsers() {
    document.title = 'Work To Day | Add Users';
    const location = useLocation();
    const history = useHistory();

    const { value: username, bind: bindUsername } = useInput(location?.state?.username);
    const { value: password, bind: bindPassword } = useInput(location?.state?.password);
    const { value: firstname, bind: bindFirstname } = useInput(location?.state?.firstname);
    const { value: lastname, bind: bindLastname } = useInput(location?.state?.lastname);
    const { value: photo, bind: bindPhoto } = useInput(location?.state?.img);

    const updateUsers = () => {
        FirestoreService.updateUsers(location?.state?._key, firstname, photo, lastname, password, username, location?.state?.role)
        history.push('users')
    }
    
    return (
        <>
            <Container>
                <h2>ระบบแก้ไขข้อมูลผู้ใช้งาน</h2>
                <form>
                    <img src={photo} width='300px' alt='' />
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
                            <Button type="button" fullWidth variant="contained" color="primary" onClick={updateUsers}>แก้ไขข้อมูล</Button>
                            : <Button type="button" fullWidth variant="contained" color="secondary">แก้ไขข้อมูล</Button>
                        }
                    </Grid>
                </form>
                <Users />
            </Container>
        </>
    );
}