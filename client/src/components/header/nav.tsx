import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/confession">Confession</NavLink>
      </li>
      <li>
        <NavLink to="/misdemeanours">Misdemeanours</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
