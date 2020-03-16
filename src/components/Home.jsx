import React from "react";
import * as FirestoreService from '../services/RealtimeDatabase';
import { Button } from "@material-ui/core";

export default function Home() {
    document.title = 'Work To Day';
    const onCheckIn = () => {
        FirestoreService.setCheckIn()
    }
    return (
        <div>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onCheckIn}
            >
                Check In
            </Button>
        </div>
    );
}