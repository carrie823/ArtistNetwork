// import { Link } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function StudioSpaceInfo() {
  const nav = useNavigate();
  // const artRef = useRef(null);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    // var temp = send("")

    fetch("http://localhost:3001/api/art/", {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      if (response.status === 200) {
        response.json().then(j => {
          console.log(j)
          setTitle(j[0].title)
          setDesc(j[0].description)
          setID(j[0]._id)
          setImage(`http://localhost:3001/api/art/${j[0]._id}`)
        })
      }
    })
  }, []);

  function sendDelete() {
    fetch(`http://localhost:3001/api/items/${id}/`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Item deleted successfully');
          window.location.reload();
          // Perform any necessary actions after successful deletion
        } else {
          console.log('Failed to delete item');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  // function send(url) {

  //   // fetch(url, {
  //   //   method: "GET",
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   //   }
  //   // }).then(response => {
  //   //   if (response.status === 200) {

  //   //     return response.json()
  //   //   }
  //   //   return response.json();
  //   // })
  // }

  return (
    <main id="main">
      <h1>Studio Space</h1>
      <div id="btn-container">
        <div>
          <button onClick={() => nav('/addart')}>Add Artwork</button>
        </div>
        <div>
          <button onClick={() => nav('/editartwork', { state: { "_id": id } })}>Edit Artwork</button>
        </div>
        <div >
          <button onClick={() => sendDelete()} >Delete Artwork</button>
        </div>
      </div>
      <div><h1>{title}</h1></div>
      <div><h2>{desc}</h2></div>
      <div><img src={image} /></div>
      <div class="pages">
        <button><i class="fa-solid fa-caret-left"></i> Prev</button>
        <button>Next <i class="fa-solid fa-caret-right"></i></button>
      </div>

    </main>
  );
}