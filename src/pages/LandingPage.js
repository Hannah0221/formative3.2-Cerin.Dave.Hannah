
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



    return (<div className="landingLoginPage flexFS flexColum">
        <div>
            <button onClick={() => navigate('/login')} className="landingButton">SIGN UP</button>
            <button onClick={() => navigate('/login')} className="landingButton">LOG IN</button>

        </div>
    </div>);

};

export default LandingPage; 