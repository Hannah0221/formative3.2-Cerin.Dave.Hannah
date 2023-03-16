import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/dashboard");
    }
  }, []);

  const clickHandlerLogin = async () => {
    // console.log(name, email, password);

    const requestOptions = {
      method: 'post',
      body: JSON.stringify({ email: email, password: password }),
      headers: { 'Content-Type': 'application/json' }
    }
    let result = await fetch("http://localhost:5000/login", requestOptions);
    result = await result.json();
    console.log(result);

    if (result.userId) {
      console.log("user found");
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("userName", result.userName);
      localStorage.setItem("img_url", result.img_url);
      console.log(result.img_url);
      navigate("/dashboard");
    } else {
      console.log("No User found");
    }
    if (result.status === "0xallfield") {
      console.log("Enter all field");
    }
  };

  return (

    <div className=" landingLoginPage flexSE flexColum paddingLeftSmall blackBG">
      <div>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          className="inputBox"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button
          type="button"
          className="appButtonLong normal"
          onClick={clickHandlerLogin}
        > Login </button>
      </div>

    </div>


  );
};

export default Login;
