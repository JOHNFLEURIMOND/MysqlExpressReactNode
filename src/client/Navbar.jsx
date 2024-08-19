// src/components/Navbar.jsx

import React from 'react';
import styled from '@emotion/styled';

const NavbarContainer = styled.nav`
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.li`
  a {
    text-decoration: none;
    color: #007bff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Navbar = () => (
  <NavbarContainer>
    <NavList>
      <NavItem>
        <a href='https://johnfleurimond.com'>Fleurimond</a>
      </NavItem>
      <NavItem>
        <a href='https://johnfleurimond.com' title='Report a Problem'>
          Report a Problem
        </a>
      </NavItem>
      <NavItem>
        <a href='https://github.com/JOHNFLEURIMOND' title='Github'>
          Github
        </a>
      </NavItem>
      <NavItem>
        <a href='https://twitter.com/tcodemonger' title='Twitter'>
          Twitter
        </a>
      </NavItem>
      <NavItem>
        <a href='https://www.linkedin.com/in/john-fleurimond/' title='LinkedIn'>
          LinkedIn
        </a>
      </NavItem>
    </NavList>
  </NavbarContainer>
);

export default Navbar;
