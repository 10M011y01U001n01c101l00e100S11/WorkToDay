import React, { useState, useEffect } from "react";
import * as FirestoreService from '../services/RealtimeDatabase';
import { Container } from "@material-ui/core";
import CheckIn from "./CheckIn";
import { useHistory } from "react-router-dom";

export default function CheckHistory() {
    document.title = 'Work To Day | history';
    const [userCheckData, setCheckUserData] = useState([])
    const history = useHistory();
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

    useEffect(() => {
        if (localStorage.getItem('login_check') !== '2.0.1') {
            history.push('login')
        }
    })

    return (
        <>
            <br />
            <Container>
                <CheckIn CheckInData={userCheckData.reverse()} />
            </Container>
        </>
    );
}