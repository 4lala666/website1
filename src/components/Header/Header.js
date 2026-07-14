import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'О компании', href: '#about' },
  { label: 'Памятники', href: '#catalog' },
  { label: 'Комплексы', href: '#catalog' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function closeMenu() { setMenuOpen(false); }

  return (
    <header className={scrolled ? `${styles.header} ${styles.scrolled}` : styles.header}>
      <div className={styles.inner}>

        {/* Logo */}
        <a href="/" className={styles.logo}>
          <img src="/images/logo-icon.png" alt="Sezim Stone" className={styles.logoImg} />
        </a>

        {/* Search — center */}
        <div className={styles.searchWrap}>
          <label className={styles.searchLabel} htmlFor="site-search">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="9" r="6" />
              <path d="M13.5 13.5 18 18" />
            </svg>
          </label>
          <input
            id="site-search"
            type="search"
            className={styles.searchInput}
            placeholder="Поиск по каталогу..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Right: nav + phone + CTA */}
        <div className={styles.right}>
          <nav className={styles.nav}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
          <a href="tel:+77759962343" className={styles.phone}>
            +7 775 996 2343
          </a>
          <a href="#contacts" className={styles.cta}>
            Оставить заявку
          </a>
        </div>

        {/* Burger */}
        <button
          className={menuOpen ? `${styles.burger} ${styles.burgerOpen}` : styles.burger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Меню"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={menuOpen ? `${styles.mobileMenu} ${styles.mobileMenuOpen}` : styles.mobileMenu}>
        <nav className={styles.mobileNav}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="tel:+77759962343" className={styles.mobilePhone}>
          +7 775 996 2343
        </a>
        <a href="#contacts" className={styles.mobileCta} onClick={closeMenu}>
          Оставить заявку
        </a>
      </div>
    </header>
  );
}
