// src/client/Navbar.jsx
import React, { useState, useCallback, lazy, Suspense } from 'react';
import styled from 'styled-components';
import FleurimondTheme from '../theme';
import { useMediaQuery } from 'react-responsive';

const LazyCgMenu = lazy(() =>
  import('react-icons/cg').then(module => ({ default: module.CgMenu }))
);
const LazyCgCloseR = lazy(() =>
  import('react-icons/cg').then(module => ({ default: module.CgCloseR }))
);

const Nav = styled.nav`
  background-color: ${FleurimondTheme.colors.earthy.deepBrown};
  padding: 1rem;
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${FleurimondTheme.colors.earthy.peach};

  .navbar-list {
    display: flex;
    gap: 2.8rem;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      .navbar-link {
        display: inline-block;
        text-decoration: none;
        font-size: var(--font-size-md);
        text-transform: uppercase;
        color: ${FleurimondTheme.colors.earthy.lightGreen};
        transition:
          color 0.3s,
          background-color 0.3s;
        padding: 0.5rem;

        &:hover,
        &:focus {
          color: ${FleurimondTheme.colors.darkReds.crimson};
          background-color: ${FleurimondTheme.colors.warmTones.deepBrown};
          border-radius: var(--border-radius);
          text-decoration: underline;
        }
      }
    }
  }

  .mobile-navbar-btn {
    display: none;

    .mobile-nav-icon {
      font-size: 4.2rem;
      color: ${FleurimondTheme.colors.earthy.lightGreen};
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
    }
  }

  @media (max-width: ${FleurimondTheme.media.tabletL}) {
    .navbar-list {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: ${FleurimondTheme.colors.darkReds.deepPurple};
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      transform: ${({ $openMenu }) =>
        $openMenu ? 'translateX(0)' : 'translateX(100%)'};
      visibility: ${({ $openMenu }) => ($openMenu ? 'visible' : 'hidden')};
      opacity: ${({ $openMenu }) => ($openMenu ? 1 : 0)};
      transition:
        transform 0.3s ease,
        visibility 0.3s ease,
        opacity 0.3s ease;
      z-index: 999;
    }

    .navbar-list li {
      margin: 1rem 0;

      .navbar-link {
        font-size: var(--font-size-lg);
        color: ${FleurimondTheme.colors.button.primary.color};
        padding: 0.5rem 1rem;
        background-color: transparent;
        border-radius: var(--border-radius);

        &:hover,
        &:focus {
          color: ${FleurimondTheme.colors.button.primary.hover.backgroundColor};
          background-color: ${FleurimondTheme.colors.warmTones.deepBrown};
        }
      }
    }

    .mobile-navbar-btn {
      display: inline-block;
      z-index: 1000;
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
  }
`;

const Navbar = React.memo(() => {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery({
    query: `(max-width: ${FleurimondTheme.media.tabletL})`,
  });

  const handleMenuToggle = useCallback(() => {
    setOpenMenu(prev => !prev);
  }, []);

  const navItems = [
    { href: 'https://johnfleurimond.com', label: 'Fleurimond' },
    { href: 'https://johnfleurimond.com', label: 'Report a Problem' },
    { href: 'https://github.com/JOHNFLEURIMOND', label: 'Github' },
    { href: 'https://twitter.com/tcodemonger', label: 'Twitter' },
    { href: 'https://www.linkedin.com/in/john-fleurimond/', label: 'LinkedIn' },
  ];

  return (
    <>
      <Nav aria-label='Main Navigation' $openMenu={openMenu}>
        <button
          className='mobile-navbar-btn'
          onClick={handleMenuToggle}
          aria-label={openMenu ? 'Close menu' : 'Open menu'}>
          <Suspense fallback={<div>Loading...</div>}>
            {openMenu ? (
              <LazyCgCloseR className='mobile-nav-icon' />
            ) : (
              <LazyCgMenu className='mobile-nav-icon' />
            )}
          </Suspense>
        </button>
        <ul className='navbar-list' role='navigation' aria-expanded={openMenu}>
          {navItems.map((item, index) => (
            <li key={item.href + index}>
              <a
                className='navbar-link'
                href={item.href}
                title={item.label}
                onClick={() => setOpenMenu(false)}
                aria-label={`Navigate to ${item.label}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Nav>
    </>
  );
});

export default Navbar;
