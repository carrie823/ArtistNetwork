import { Link } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ArtistAlleyInfo() {

  const nav = useNavigate();

  // const artRef = useRef(null);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    // var temp = send("")

    fetch("http://localhost:3001/api/sale/", {
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
          setLink(j[0].link)
          setID(j[0]._id)
          setImage(`http://localhost:3001/api/sale/${j[0]._id}`)


        })

      }

    })

  }, []);

  function sendDelete() {
    fetch(`http://localhost:3001/api/items/sale/${id}/`, {
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

  return (
    <main id="main">
      <h1>Artist Alley</h1>
      <div id="btn-container2">
        <div>
          <button onClick={()=> nav('/addsales')}>Add Sale</button>
        </div>
        <div>
          <button onClick={()=> nav('/editsale', {state: { "_id": id }})}>Edit Sale</button>
        </div>
        <div >
          <button onClick={() => sendDelete()} >Delete Sale</button>
        </div>
      </div>

      <div>{title}</div>
      <div>{desc}</div>
      <div><button><a target="_blank" href={link}></a>Shop Here</button></div>
      {/* <div>
        <button><Link to={{link}}/>Shop Here</button>
      </div> */}
      <form action={link}>
        <input  type="submit" value="Shop Here" />
      </form>
      <img src={image} />
      <div class="pages">
        <button><i class="fa-solid fa-caret-left"></i> Prev</button>
        <button>Next <i class="fa-solid fa-caret-right"></i></button>
      </div>

    </main>
  );
}