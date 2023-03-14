
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const LandingPage = () => {
    const navigate = useNavigate();


    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    // useEffect(() => {
    //     if (localStorage.getItem("userId")) {
    //         navigate("/dashboard");
    //     } else {
    //         localStorage.removeItem("userId");
    //         localStorage.removeItem("userName");
    //     }
    // }, []);



    return (<div className="flexFS flexColum">
    return (<div className="landingPageMain">

        <h3>Landing page</h3>

        <button onClick={() => navigate('/login')} className="appButtonLong">Login</button>
    </div>);

};

export default LandingPage; 