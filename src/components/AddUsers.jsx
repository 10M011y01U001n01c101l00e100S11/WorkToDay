import React from "react";
import { TextField, Container, Grid, Button } from "@material-ui/core";
import { useInput } from "../hooks/input-hook";
import * as FirestoreService from '../services/RealtimeDatabase';

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
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <TextField required defaultValue={username} label="Username" fullWidth {...bindUsername} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField required defaultValue={password} label="Password" type="password" {...bindPassword} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <TextField required defaultValue={firstname} label="Firstname" fullWidth {...bindFirstname} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required defaultValue={lastname} label="Lastname" fullWidth {...bindLastname} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required defaultValue={photo} label="Photo" placeholder="www.img.com" fullWidth {...bindPhoto} />
                        </Grid>
                        <Grid item xs={12}>
                        <Button type="button" fullWidth variant="contained" color="primary" onClick={addUsers}>เพิ่มข้อมูล</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
}