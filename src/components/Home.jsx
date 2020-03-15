import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
    document.title = 'Work To Day';
    const history = useHistory();
    const condition = 1;
    if (!localStorage.getItem('login_check')) {
        history.push('login')
    }
    useEffect(() => {
        
    } , []);

    return <h2>Home</h2>;
}