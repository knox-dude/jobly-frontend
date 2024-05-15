import { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import CurrUserContext from "../CurrUserContext/CurrUserContext";

function NavBar() {
  const args = {
    color: "light",
    light: true,
    dark: false,
    expand: "md",
    fixed: "top",
    toggle: "true",
  };

  // state for toggling of navigation bar
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  // get curent user from context (ignore logout, login, signup)
  const {user} = useContext(CurrUserContext);

  const renderNavBasedOnToken = () => {
    if (user) {
      return (
        <>
          <NavItem>
            <NavLink tag={Link} to="/companies/">
              Companies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/jobs">
              Jobs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile">
              {user.username}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/logout">
              Logout
            </NavLink>
          </NavItem>
        </>
      );
    } else {
      return (
        <>
          <NavItem>
            <NavLink tag={Link} to="/login">
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/signup">
              Signup
            </NavLink>
          </NavItem>
        </>
      );
    }
  }

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">jobly</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar onClick={() => setIsOpen(false)}>
          <Nav className="ms-auto" navbar>
            {renderNavBasedOnToken()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
