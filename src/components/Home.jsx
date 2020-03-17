import React, { useState, useEffect } from "react";
import * as FirestoreService from '../services/RealtimeDatabase';
import { Button, Container } from "@material-ui/core";
import CheckIn from "./CheckIn";
import moment from "moment";
import { useHistory } from "react-router-dom";

export default function Home() {
    document.title = 'Work To Day';
    const [userCheckData, setCheckUserData] = useState([])
    const history = useHistory();
    const onCheckIn = () => {
        FirestoreService.setCheckIn()
    }
    const onCheckOut = () => {
        FirestoreService.setCheckOut(userCheckData?.[0])
    }
    FirestoreService.fetchIP().then(e => console.log(e))

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
    }, [])

    console.log(moment().diff(moment(userCheckData?.[0]?.check_in), 'second'));


    return (
        <>
            <br />
            <Container>
                <CheckIn CheckInData={userCheckData.reverse()} />
            </Container>
            {userCheckData?.[0]?.check_in && moment().diff(moment(userCheckData?.[0]?.check_in), 'second') < 10 ?
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => history.go()}
                    style={{ bottom: 0, position: 'fixed' }}
                >
                    Warnning
                </Button> :
                userCheckData?.[0]?.check_in && !userCheckData?.[0]?.check_out ? <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
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