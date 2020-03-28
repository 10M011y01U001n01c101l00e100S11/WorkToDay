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
    const [fetchIPAddress, setFetchIPAddress] = useState([{ id: '' }])
    const [fetchMACAddress, setFetchMACAddress] = useState()
    const [workingTime, setWorkingTime] = useState()
    const [timeming, setTimeming] = useState(moment())
    const [timemingCheckOut, setTimemingCheckOut] = useState(false)
    const history = useHistory();

    const onCheckIn = () => {
        FirestoreService.setCheckIn(fetchIP, fetchMACAddress, workingTime)
        setTimeout(() => {
            history.go()
        }, 10000);
    }
    const onCheckOut = () => {
        setTimemingCheckOut(true)
        FirestoreService.setCheckOut(chkData?.[0], workingTime)
        setTimeout(() => {
            history.go()
        }, 60000);
    }

    FirestoreService.fetchIP().then(e => setFetchIP(e))
    FirestoreService.fetchMacAddress().then(e => setFetchMACAddress(e))

    useEffect(() => {
        if (!localStorage.getItem('login_check')) {
            history.push('login')
        }
    })

    useEffect(() => {
        FirestoreService.IP_ADDRESS().on("value", snapshot => {
            const array = [];
            snapshot.forEach(el => {
                array.push(el.val());
            });
            setFetchIPAddress(array);
        });
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
        FirestoreService.getWorkingTime().on("value", snapshot => {
            const array = [];
            snapshot.forEach(el => {
                array.push(el.val());
            });
            setWorkingTime(array);
        })
        setInterval(() => {
            setTimeming(moment())
        }, 2000);
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
                <><h2 style={{ marginTop: '9vh' }} align='center'>{localStorage.getItem('login_firstname')} {localStorage.getItem('login_lastname')}</h2></>
                {chkData?.[0]?.check_in && !chkData?.[0]?.check_out ? <><h2 style={{ marginTop: '9vh' }} align='center'>คุณเข้างานเวลา {moment(chkData?.[0]?.check_in).format('HH:mm')} นาที</h2></> : <><h2 style={{ marginTop: '9vh' }} align='center'>คุณยังไม่ได้บันทึกการเข้างาน</h2></>}
            </Container>
            {!fetchIPAddress.find(({ ip }) => ip === fetchIP)?.ip ? <p></p> : !timemingCheckOut ? (chkData?.[0]?.check_in && (moment().diff(moment(chkData?.[0]?.check_in), 'seconds') < 18000)) ?
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="inherit"
                    style={{ bottom: 0, position: 'fixed' }}
                >
                    Warnning Check In
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
                </Button> : <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="inherit"
                    style={{ bottom: 0, position: 'fixed' }}
                >
                    Warnning Check Out
                </Button> 
            }
        </>
    );
}