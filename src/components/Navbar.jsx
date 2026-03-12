import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Search</NavLink>
        </li>
        <li>
          <NavLink to="/carparks">Explore</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
      </ul>
    </nav>
  );
}
