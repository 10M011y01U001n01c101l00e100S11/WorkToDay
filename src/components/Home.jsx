import React, { useState, useEffect } from "react";
import * as FirestoreService from '../services/RealtimeDatabase';
import { Button, Container, Grid } from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';


export default function Home() {
    document.title = 'Work To Day';
    const [userCheckData, setCheckUserData] = useState([])
    const [fetchIP, setFetchIP] = useState([])
    const [timeming, setTimeming] = useState(moment())
    const history = useHistory();

    const onCheckIn = () => {
        FirestoreService.setCheckIn()
    }
    const onCheckOut = () => {
        FirestoreService.setCheckOut(chkData?.[0])
    }
    FirestoreService.fetchIP().then(e => setFetchIP(e))

    useEffect(() => {
        if (!localStorage.getItem('login_check')) {
            history.push('login')
        }
    })
    useEffect(() => {
        FirestoreService.getCheckInUsers().orderByValue().on("value", snapshot => {
            const array = [];
            // For each data in the entry
            snapshot.forEach(el => {
                // Push the object to the array
                // If you also need to store the unique key from firebase,
                // You can use array.push({ ...el.val(), key: el.key });
                array.push(el.val());
            });
            setCheckUserData(array);
        });

        setInterval(() => {
            setTimeming(moment())
        }, 1000);
    }, [])

    const chkData = [userCheckData.reverse().find(({ check_out }) => check_out === '') || 0]

    return (
        <>
            <br />
            <Container maxWidth="xs">
                {/* <CheckIn CheckInData={chkData} /> */}
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}>
                    <Grid item xs>
                        <Paper elevation={6}><h1 style={{ textAlign: '-webkit-center', paddingTop: '20px', paddingBottom: '20px' }}>{timeming.format('HH')}</h1></Paper>
                    </Grid>
                    <h1>:</h1>
                    <Grid item xs>
                        <Paper elevation={6}><h1 style={{ textAlign: '-webkit-center', paddingTop: '20px', paddingBottom: '20px' }}>{timeming.format('mm')}</h1></Paper>
                    </Grid>
                    <h1>:</h1>
                    <Grid item xs>
                        <Paper elevation={6}><h1 style={{ textAlign: '-webkit-center', paddingTop: '20px', paddingBottom: '20px' }}>{timeming.format('ss')}</h1></Paper>
                    </Grid>
                </Grid>
    {chkData?.[0]?.check_in && !chkData?.[0]?.check_out ? <><h1 style={{marginTop: '18vh'}} align='center'>คุณเข้างานเวลา {moment(chkData?.[0]?.check_in).format('HH:mm')}</h1></> : <><h1 style={{marginTop: '18vh'}} align='center'>คุณยังไม่ได้บันทึกการเข้างาน</h1></> }
            </Container>
            {!FirestoreService.IP_ADDRESS.find(({ ip }) => ip === fetchIP)?.ip ? <p></p> : chkData?.[0]?.check_in && moment().diff(moment(chkData?.[0]?.check_in), 'second') < 10 ?
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="inherit"
                    onClick={() => history.go()}
                    style={{ bottom: 0, position: 'fixed' }}
                >
                    Warnning
                </Button> :
                chkData?.[0]?.check_in && !chkData?.[0]?.check_out ? <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={onCheckOut}
                    style={{ bottom: 0, position: 'fixed' }}
                >
                    Check Out
                </Button> : <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onCheckIn}
                        style={{ bottom: 0, position: 'fixed' }}
                    >
                        Check In
                </Button>
            }
        </>
    );
}