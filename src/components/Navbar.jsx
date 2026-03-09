import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/carparks">Find Parking</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">My Favorites</NavLink>
        </li>
      </ul>
    </nav>
  );
}
