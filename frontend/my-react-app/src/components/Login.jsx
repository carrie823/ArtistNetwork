import React, { useRef, useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
// import {NavLink} from "react-router-dom";

export function Login() {
  // const nameRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  // const [nameVal, setName] = useState("");
  const [passwordVal, setPass] = useState("");;
  const [userVal, setUser] = useState("");
  const nav = useNavigate();

  function send(sendMethod, url, data) {

    fetch(url, {
      method: sendMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 200) {
        nav("/")
        return response.json()
      }
      return response.json();
    })
  }


  function sendData() {
    // let nameX = nameVal;
    let pass = passwordVal;
    let user = userVal;
    console.log(user)

    let bodyX = { username: user, password: pass }

    send("POST", "http://localhost:3001/login/", bodyX, false, function (event) {

      if (event) {
        nav("/")
      }
    });

  }


  return (
    <>
      <Header />
      <h1>Login</h1>
      <div id="login">
        <div class="login_container">
          {/* <div class="fields">
            <label for="name" >Name:</label>
            <input type="text" ref={nameRef} onChange={(event) => { setName(event.target.value) }} />
          </div> */}
          <div class="fields">
            <label for="username" >Username:</label>
            <input type="text" ref={usernameRef} onChange={(event) => { setUser(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="password" >Password:</label>
            <input type="password" ref={passwordRef} onChange={(event) => { setPass(event.target.value) }} />
          </div>
          <div>
            <button onClick={() => sendData()} >Login</button>
          </div>
          <div class="login-signup">
            <p>Don't have an account?</p>
            <button onClick={() => nav('/signup')}>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
}
