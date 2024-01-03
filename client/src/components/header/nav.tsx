import { NavLink } from "react-router-dom";

const Nav = () => (
  <>
    <nav id="nav" className="nav">
      <NavLink to="/" className="navLink">
        Home
      </NavLink>
      <NavLink to="/misdemeanours" className="navLink">
        Misdemeanours
      </NavLink>
      <NavLink to="/confession" className="navLink">
        Confess To Us
      </NavLink>
    </nav>
  </>
);

export default Nav;
