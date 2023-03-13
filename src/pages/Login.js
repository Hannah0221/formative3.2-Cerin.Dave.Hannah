import { useEffect, useState } from "react";
import React from "react";

const Login=()=>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickHandlerLogin = async () => {
    console.log(name, email, password);

    const requestOptions = {
      method:'post',
      body: JSON.stringify({name: name, email:email, password:password}),
      headers: { 'Content-Type': 'application/json' }
    }
    let result = await fetch("http://localhost:5000/login",requestOptions);
    result = await result.json();
    console.log(result);
  };

  return (
    <div>
      <h3>Login</h3>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => {setName(e.target.value)}}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)}}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
      />
      <button
        type="button"
        className="appButtonLong normal"
        onClick={clickHandlerLogin}
      > Login </button> 
    </div>
  );
};

export default Login;
