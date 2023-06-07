// import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from 'react';
import HeaderMain from "./HeaderMain";
import  Footer  from "./footer";

export default function AddArtwork() {

  const imageRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [titleVal, setTitle] = useState("");;
  const [descriptionVal, setDescription] = useState("");
  const [imageVal, setImage] = useState("");

  // const [titleDisplay, setTitleDisplay] = useState("");

  function sendFiles(methodX, url, data) {
    console.log(methodX);
    let formdata = new FormData();
    Object.keys(data).forEach(function (key) {
      let value = data[key];
      formdata.append(key, value);
    });

    fetch(url, {
      method: methodX,
      body: formdata
    }).then(response => {
      if (response.status === 200) {
        // nav("/")
        return response.json()
      }
      return response.json();
    })
  }

  function sendData() {
    let title = titleVal;
    let desc = descriptionVal;
    let image = imageVal[0];
    console.log(image)

    let bodyX = { "title": title, "description": desc, "image": image }

    sendFiles("POST", "http://localhost:3001/api/images/arts", bodyX, false, function (event) {
      if (event) {
        return event;
      }
    });
  }


  return (
    <main id="artwork-form">
      {/* <HeaderMain /> */}
      <h1>New Post</h1>
      <div id="addArt">
        <div class="addArt_container">
          <div id="file-btn" class="fields">
            <input type="file" ref={imageRef} onChange={(event) => { setImage(event.target.files) }} />
            {/* <button type="submit">Upload</button> */}
          </div>
          <div class="fields">
            <label for="title" >Title:</label>
            <input type="text" ref={titleRef} onChange={(event) => { setTitle(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="description" >Description:</label>
            <input type="text" ref={descriptionRef} onChange={(event) => { setDescription(event.target.value) }} />
          </div>
          {/* <div class="fields">
            <label for="password" >:</label>
            <input type="password" ref={passwordRef} onChange={(event) => { setPass(event.target.value) }} />
          </div> */}
          <div >
            <button onClick={() => sendData()} >Submit</button>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}