import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListItemPanel from "../components/ListItemPanel";

const Dashboard = () => {
    const [userName, SetUserName] = useState("");
    const [userId, SetUserId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        SetUserId(localStorage.getItem('userId'));
        SetUserName(localStorage.getItem('userName'));
    }, []);

    const clickHandlerlogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        navigate("/");
    };

    return (<div>
        <h3>Dash board</h3>

        {/* Header elements */}
        <h4>{userName}</h4>
        <button
            type="button"
            className="appButtonLong normal"
            onClick={clickHandlerlogout}
        > Logout </button>

        <ListItemPanel />




    </div>);

};

export default Dashboard;