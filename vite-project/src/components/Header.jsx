import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, X, Menu } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className="header" ref={navRef}>
      {/* Main Nav */}
      <div className="header__main">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/">
            <img src={logoImg} alt="Novamax Logo" className="header__logo-img" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="header__nav-list">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.label} className="header__nav-item">
                  <Link
                    to={link.href}
                    className={`header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="header__auth">
          <a
            href="https://play.google.com/store/apps/details?id=com.bhoomitechzone.novamax"
            target="_blank"
            rel="noopener noreferrer"
            className="header__btn header__btn--download"
          >
            <Smartphone size={18} style={{ marginRight: '6px' }} />
            Get The App
          </a>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="header__hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} color="#1a3a6b" /> : (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          )}
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      {menuOpen && (
        <div
          className="header__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
