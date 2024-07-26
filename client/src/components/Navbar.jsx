// src/components/Navbar.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.div`
  background-color: #212e3d;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: #fff;
  margin: 0;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0e87ea;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>Community Forum</Logo>
      <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/history'>History</NavLink>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
