import React, { useState, useEffect } from "react";
import * as FirestoreService from '../services/RealtimeDatabase';
import { Button, Container } from "@material-ui/core";
import CheckIn from "./CheckIn";

export default function Home() {
    document.title = 'Work To Day';
    const [userCheckData, setCheckUserData] = useState([])
    const onCheckIn = () => {
        FirestoreService.setCheckIn()
    }
    FirestoreService.fetchIP().then(e => console.log(e))

    useEffect(() => {
        FirestoreService.getCheckInUsers().on("value", snapshot => {
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

    console.log(userCheckData);
    
    return (
        <Container>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onCheckIn}
            >
                Check In
            </Button>
            <CheckIn CheckInData={userCheckData} />
        </Container>
    );
}