// import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect} from 'react';
import HeaderMain from "./HeaderMain";

export default function AddSale() {

  const imageRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const linkRef = useRef();
  const [titleVal, setTitle] = useState("");;
  const [descriptionVal, setDescription] = useState("");
  const [imageVal, setImage] = useState("");
  const [linkVal, setLink] = useState("");



  function sendFiles(methodX, url, data) {
  //   let formdata = new FormData();
  //   Object.keys(data).forEach(function (key) {
  //     let value = data[key];
  //     formdata.append(key, value);
  //   });
  //   let xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     if (xhr.status !== 200) return "done"
  //     else return "not done"
  //   };
  //   xhr.open(method, url, true);
  //   xhr.send(formdata);
  // }

  console.log(methodX);
  let formdata = new FormData();
  Object.keys(data).forEach(function (key) {
    let value = data[key];
    formdata.append(key, value);
  });
  // console.log("HI")
  // console.log(formdata)
  // console.log(methodX)
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
  //   let xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     if (xhr.status !== 200) return "done"
  //     else return "not done"
  //   };
  //   xhr.open(method, url, true);
  //   xhr.send(formdata);
  // }



  // fetch(url, {
  //   method: methodX,
  //   body: JSON.stringify(data)
  // }).then(response => {
  //   if (response.status === 200) {
  //     // nav("/")
  //     return response.json()
  //   }
  //   return response.json();
  // })
}

  function sendData() {
    let title = titleVal;
    let desc = descriptionVal;
    let imageX = imageVal[0];
    let link = linkVal;
    console.log(link)

    let bodyX = { "title": title, "description": desc, "link": link, image: imageX }

    sendFiles("POST", "http://localhost:3001/api/images/sales", bodyX, false, function (event) {
      console.log(event)
      if (event) {
        return event;
      }
    });
  }

  return (
    <main id="sale-form">
      <HeaderMain />
      <h1>New Post</h1>
      <div id="addArt">
        <div class="addArt_container">
          <input type="file" ref={imageRef} onChange={(event) => { setImage(event.target.files) }} />
          {/* <button type="submit">Upload</button> */}
          <div class="fields">
            <label for="title" >Title:</label>
            <input type="text" ref={titleRef} onChange={(event) => { setTitle(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="description" >Description:</label>
            <input type="text" ref={descriptionRef} onChange={(event) => { setDescription(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="link" >Shop Link:</label>
            <input type="text" ref={linkRef} onChange={(event) => { setLink(event.target.value) }} />
          </div>
          <div >
            <button onClick={() => sendData()} >Submit</button>
          </div>
        </div>
      </div>
    </main>
  );
}