import {NavLink} from "react-router-dom";

export default function Nav() {
  return (
    <nav id="main-nav" aria-label="Main navigation">
      
      <ul>
        <li>
          <NavLink to="/">Home </NavLink> 
        </li>
        <li>
          <NavLink to="/studiospace">Studio Space</NavLink>
        </li>
        <li>
          <NavLink to="/artistalley">Artist Alley</NavLink>
        </li>
        <li>
          <NavLink to="/login">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}