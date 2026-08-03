import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoImg from '../assets/logo.png';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Health Card', href: '/health-card' },
  { label: 'Hospitals', href: '/hospitals' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Partner', href: '/vendor-partnership' },
  { label: 'Contact Us', href: '/contact' },
];



export default function Header() {
  const [activeLink, setActiveLink] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">


      {/* Main Nav */}
      <div className="header__main">
        {/* Logo */}
        <div className="header__logo">
          <img src={logoImg} alt="Novamax Logo" className="header__logo-img" />
        </div>

        {/* Nav Links */}
        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`} aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.label} className="header__nav-item">
                <Link
                  to={link.href}
                  className={`header__nav-link ${activeLink === link.label ? 'header__nav-link--active' : ''}`}
                  onClick={() => {
                    setActiveLink(link.label);
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="header__auth">
          <button className="header__btn header__btn--login">Login</button>
          <button className="header__btn header__btn--register">Register</button>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="header__hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
