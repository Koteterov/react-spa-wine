import "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <img src="/images/logo.png" alt="logo_picture" />

      <ul className="menu">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/wine/all">All Wines</Link>
        </li>

        <li>
          <Link to="/wine/create">Create Post</Link>
        </li>
        <li>
          <Link to="/wine/my-wines">My Wines</Link>
        </li>
        <li>
          <Link to="/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="">Logout</Link>
        </li>
        <li>
          <Link to="/user/register">Register</Link>
        </li>
        <li>
          <Link to="/user/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
