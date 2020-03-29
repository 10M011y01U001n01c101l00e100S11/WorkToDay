import React from "react";
import { TextField, Container, Grid, Button } from "@material-ui/core";
import * as FirestoreService from '../services/RealtimeDatabase';
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function TimeTracking() {
    document.title = 'Work To Day | Edit Time Tracking';
    const [timeTracking, setTimeTracking] = useState([]);
    const [timeInMorning, setTimeInMorning] = useState('');
    const [timeOutMorning, setTimeOutMorning] = useState('');
    const [timeInNight, setTimeInNight] = useState('');
    const [timeOutNight, setTimeOutNight] = useState('');

    useEffect(() => {
        FirestoreService.getWorkingTime().on('value', e => {
            setTimeTracking(e.val())
            setTimeInMorning(e.val().find(({ work }) => work === 'Morning job').time_in)
            setTimeOutMorning(e.val().find(({ work }) => work === 'Morning job').time_out)
            setTimeInNight(e.val().find(({ work }) => work === 'Late night').time_in)
            setTimeOutNight(e.val().find(({ work }) => work === 'Late night').time_out)

            console.log(e.val().find(({ work }) => work === 'Morning job').time_in)
            console.log(e.val().find(({ work }) => work === 'Morning job').time_out)
            console.log(e.val().find(({ work }) => work === 'Late night').time_in)
            console.log(e.val().find(({ work }) => work === 'Late night').time_out)

        })
    }, [])

    return (
        <>
            <Container>
                <h2>ระบบแก้ไขเวลาเข้าออกงาน</h2>
                <form>
                    {
                        timeTracking.filter(({ work }) => work === 'Morning job').map((e) => (
                            <Grid container lg={12} spacing={3}>
                                <Grid item xs={12} sm={4} md={2}>
                                    <TextField defaultValue={e.work} InputProps={{ readOnly: true }} label='Time Name' fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={4} md={2}>
                                    <TextField required defaultValue={e.time_in} label="TimeIn" onChange={(e) => setTimeInMorning(e.target.value)} fullWidth type="time" />
                                </Grid>
                                <Grid item xs={12} sm={4} md={2}>
                                    <TextField required defaultValue={e.time_out} label="TimeIn" onChange={(e) => setTimeOutMorning(e.target.value)} fullWidth type="time" />
                                </Grid>
                            </Grid>
                        ))
                    }
                    {
                        timeTracking.filter(({ work }) => work === 'Late night').map((e) => (
                            <Grid container lg={12} spacing={3}>
                                <Grid item xs={12} sm={4} md={2}>
                                    <TextField defaultValue={e.work} InputProps={{ readOnly: true }} label='Time Name' fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={4} md={2}>
                                    <TextField required defaultValue={e.time_in} label="TimeIn" onChange={(e) => setTimeInNight(e.target.value)} fullWidth type="time" />
                                </Grid>
                                <Grid item xs={12} sm={4} md={2}>
                                    <TextField required defaultValue={e.time_out} label="TimeIn" onChange={(e) => setTimeOutNight(e.target.value)} fullWidth type="time" />
                                </Grid>
                            </Grid>
                        ))
                    }
                    <br />
                    <Grid item lg={12}>
                        <Button type="button" fullWidth variant="contained" onClick={() => { FirestoreService.setWorkingTime(timeInMorning, timeOutMorning, timeInNight, timeOutNight); Swal.fire( 'Good job!', 'แก้ไขข้อมูลเวลาการเข้าออกงานสำเร็จ!', 'success') }} color="primary">แก้ไขข้อมูล</Button>
                    </Grid>
                </form>
            </Container>
        </>
    );
}