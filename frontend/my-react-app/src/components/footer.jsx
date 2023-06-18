import Nav from "./Nav";
import {NavLink} from "react-router-dom";

export default function footer() {
  return (
    <footer id="footer-name">
      <div>
        <NavLink to="/homefeed">Artist Network <i class="fa-solid fa-pencil"></i></NavLink>
      </div>
      <div>
        <p>© Copyright 2023 Artist Network</p>
      </div>
    </footer>
    
  )
}