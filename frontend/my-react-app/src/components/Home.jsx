// import Nav from "./Nav";
import { Link } from "react-router-dom";
import HeaderMain from "./HeaderMain";

export function Home() {
  return (
    <main id="home-content">
      <HeaderMain />
      <h1>
        Welcome to Artist Network
      </h1>
      <h2>
        Where artists can share and sell artwork 
      </h2>
    </main>
    
  )
}