import React, { useRef, useState, useEffect } from 'react';
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  // const [data, setData] = useState();
  const nameRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const copyrightRef = useRef();
  const [nameVal, setName] = useState("");
  const [passwordVal, setPass] = useState("");;
  const [userVal, setUser] = useState("");
  const [copyrightVal, setCopyright] = useState("");
  const nav = useNavigate();


  function send(sendMethod, url, data) {
    // var xhr = new XMLHttpRequest();
    // xhr.onload = function () {
    //   if (xhr.status !== 200) return;
    //   else return "not 200"
    // };
    // console.log(data)
    // xhr.open(method, url, true);
    // if (!data) xhr.send();
    // else {
    //   xhr.setRequestHeader('Content-Type', 'application/json');
    //   console.log("hello")
    //   let x = JSON.stringify(data)
    //   console.log(x)
    //   xhr.send(x);
    // }

    fetch( url, {
      method: sendMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {

      return response.json()
    })
  }

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   const response = await fetch(
  //   //     'http://localhost:3001/signup/'); // Replace '/api/data' with your actual backend API endpoint
  //   //   const jsonData = await response.json();
  //   //   setData(jsonData);
  //   // };
  //   //fetchData();
  // }, []);

  function sendData() {
    let nameX = nameVal;
    let pass = passwordVal;
    let user = userVal;
    let copyright = copyrightVal;
    console.log(copyrightVal)

    let bodyX = { name: nameX, username: user, password: pass, copyright: copyright }

    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(bodyX)
    // };

    // fetch('http://localhost:3001/signup/', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))

    send("POST", "http://localhost:3001/signup/", bodyX, false, function (event) {
      if (event) {
        return event;
      }
    });

  }


  return (
    <>
      <Header />
      <h1>Sign Up</h1>
      <h2>Create Your Account</h2>
      <div id="signup">
        <div class="signup_container">
          <div class="fields">
            <label for="name" >Name:</label>
            <input type="text" ref={nameRef} onChange={(event) => { setName(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="username" >Username:</label>
            <input type="text" ref={usernameRef} onChange={(event) => { setUser(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="password" >Password:</label>
            <input type="password" ref={passwordRef} onChange={(event) => { setPass(event.target.value) }} />
          </div>
          <div>
            <input type="checkbox" id="copyright" name="copyright" value="agree" ref={copyrightRef} onChange={(event) => { setCopyright(event.target.value) }}/>
            <label for="copyright"> I agree to the Terms and Conditions of Artist Network.</label>
          </div>
          <div >
            <button onClick={() => sendData()} >Sign Up</button>
          </div>
          <div class="login-signup">
            <p>Already have an account?</p> 
            <button onClick={() => nav('/login')}>Login</button>
          </div>
          <div>
            <p><strong>Terms and Conditions:</strong></p>
          </div>
          <div>
            <p><strong>Users must submit orginal artwork and abide by Canadian Copyright Laws.</strong></p>
          </div>
          <div>
            <p><strong>Artist Network is not legally repsonsible for any images posted on our platform.</strong></p>
          </div>
        </div>
      </div>
    </>
  );
}
