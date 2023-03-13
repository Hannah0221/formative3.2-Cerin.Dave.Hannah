
import { Link, useNavigate } from "react-router-dom";


const LandingPage = () => {

    const navigate = useNavigate();
    return (<div>
        <h3>Landing page</h3>
        <button onClick={() => navigate('/login')} className="appButtonLong">Login</button>
    </div>);

};

export default LandingPage; 