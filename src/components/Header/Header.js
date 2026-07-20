import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSearch } from '../../context/SearchContext';
import styles from './Header.module.css';

// ── Global search index ───────────────────────────────────────────────────────

const SEARCH_INDEX = [
  // Sections
  {
    id: 's1', type: 'section',
    title: 'Каталог памятников',
    sub:   'Мусульманские, христианские, комплексы, металл',
    action: { scroll: '#catalog' },
    words: 'каталог памятники памятник форма купить заказать гранит',
  },
  {
    id: 's2', type: 'section',
    title: 'Галерея работ',
    sub:   'Реализованные проекты мастерской',
    action: { scroll: '#gallery' },
    words: 'галерея работы проекты фото мемориальный комплекс примеры',
  },
  {
    id: 's3', type: 'section',
    title: 'Как мы работаем',
    sub:   'Этапы: заказ, производство, установка',
    action: { scroll: '#how-we-work' },
    words: 'этапы работа процесс заказ установка доставка монтаж производство',
  },
  {
    id: 's4', type: 'section',
    title: 'О компании',
    sub:   'Sezim Stone — 6 лет опыта, Алматы',
    action: { scroll: '#advantages' },
    words: 'о компании sezim stone преимущества опыт алматы казахстан качество',
  },
  {
    id: 's5', type: 'section',
    title: 'Контакты',
    sub:   '+7 775 996 2343 · г. Алматы',
    action: { scroll: '#contacts' },
    words: 'контакты алматы телефон адрес написать заказать связаться',
  },

  // Catalog tabs
  {
    id: 't1', type: 'catalog',
    title: 'Мусульманские памятники',
    sub:   'Габро · Кордай · Курты',
    action: { tab: 'muslim' },
    words: 'мусульманские ислам полумесяц габро кордай курты памятник мечеть',
  },
  {
    id: 't2', type: 'catalog',
    title: 'Христианские памятники',
    sub:   'Вертикальные · Горизонтальные · Детские · Семейные',
    action: { tab: 'christian' },
    words: 'христианские крест вертикальные горизонтальные детские семейные православные',
  },
  {
    id: 't3', type: 'catalog',
    title: 'Изделия из металла',
    sub:   'Кованые элементы и ограждения',
    action: { tab: 'metal' },
    words: 'металл кованые ограждения металлические изделия решётки',
  },
  {
    id: 't4', type: 'catalog',
    title: 'Мемориальные комплексы',
    sub:   'Благоустройство под ключ · 6 проектов',
    action: { tab: 'complex' },
    words: 'комплексы мемориальный благоустройство ограждение плитка под ключ',
  },

  // Company info
  {
    id: 'i1', type: 'info',
    title: 'Рассрочка 0%',
    sub:   'Без переплат и процентов',
    action: { scroll: '#advantages' },
    words: 'рассрочка кредит ноль процентов без переплат оплата частями',
  },
  {
    id: 'i2', type: 'info',
    title: 'Гарантия 3 года',
    sub:   'На все изделия из гранита',
    action: { scroll: '#advantages' },
    words: 'гарантия качество надёжность три года изделия',
  },
  {
    id: 'i3', type: 'info',
    title: 'Доставка и установка',
    sub:   'По всему Казахстану',
    action: { scroll: '#how-we-work' },
    words: 'доставка установка казахстан алматы монтаж выезд',
  },
  {
    id: 'i4', type: 'info',
    title: 'Собственное производство',
    sub:   'Гранит обрабатывается на нашем заводе',
    action: { scroll: '#advantages' },
    words: 'производство завод гранит обработка фрезерный станок',
  },
  {
    id: 'i5', type: 'info',
    title: '+7 775 996 2343',
    sub:   'WhatsApp · Звонки',
    action: { scroll: '#contacts' },
    words: 'телефон номер позвонить вотсап whatsapp 775 996 2343',
  },
];

function dispatchTabEvent(tab) {
  window.dispatchEvent(new CustomEvent('catalog:tab', { detail: { tab } }));
}

// ── Header ────────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef                     = useRef(null);
  const { query, setQuery }             = useSearch();

  // Compute results from global search index
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(item => {
      const hay = `${item.title} ${item.sub} ${item.words}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 8);
  }, [query]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Click-outside: close dropdown
  useEffect(() => {
    function onMouseDown(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  function handleSearchChange(text) {
    setQuery(text);
    setShowDropdown(text.trim().length > 0);
  }

  function handleClear() {
    setQuery('');
    setShowDropdown(false);
  }

  function handleResultClick(result) {
    setShowDropdown(false);
    setQuery('');

    if (result.action.tab) {
      dispatchTabEvent(result.action.tab);
      setTimeout(() => {
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (result.action.scroll) {
      const el = document.querySelector(result.action.scroll);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleComplexesNav(e) {
    e.preventDefault();
    setMenuOpen(false);
    dispatchTabEvent('complex');
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function closeMenu() { setMenuOpen(false); }

  const badgeClass = type =>
    type === 'section' ? styles.badgeSection :
    type === 'catalog' ? styles.badgeCatalog :
    styles.badgeInfo;

  const badgeLabel = type =>
    type === 'section' ? 'Раздел' :
    type === 'catalog' ? 'Каталог' :
    'Информация';

  return (
    <header className={scrolled ? `${styles.header} ${styles.scrolled}` : styles.header}>
      <div className={styles.inner}>

        {/* Logo */}
        <a href="/" className={styles.logo} aria-label="Sezim Stone — на главную">
          <img src="/images/logo-icon.png" alt="" className={styles.logoImg} aria-hidden="true" />
          <span className={styles.logoText}>Sezim Stone</span>
        </a>

        {/* Global search */}
        <div className={styles.searchOuter} ref={dropdownRef}>
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
              type="text"
              className={styles.searchInput}
              placeholder="Поиск по сайту..."
              value={query}
              onChange={e => handleSearchChange(e.target.value)}
              onFocus={() => { if (query.trim()) setShowDropdown(true); }}
              autoComplete="off"
            />
            {query && (
              <button
                className={styles.searchClear}
                onClick={handleClear}
                aria-label="Очистить поиск"
              >
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" aria-hidden="true">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>
            )}
          </div>

          {showDropdown && (
            <div
              id="search-dropdown"
              className={styles.dropdown}
              role="menu"
              aria-label="Результаты поиска"
            >
              {results.length > 0 ? (
                results.map(r => (
                  <button
                    key={r.id}
                    className={styles.dropResult}
                    role="menuitem"
                    onClick={() => handleResultClick(r)}
                  >
                    <span className={`${styles.dropBadge} ${badgeClass(r.type)}`}>
                      {badgeLabel(r.type)}
                    </span>
                    <span className={styles.dropTitle}>{r.title}</span>
                    <span className={styles.dropSub}>{r.sub}</span>
                  </button>
                ))
              ) : (
                <div className={styles.dropEmpty}>Ничего не найдено</div>
              )}
            </div>
          )}
        </div>

        {/* Right: nav + phone + CTA */}
        <div className={styles.right}>
          <nav className={styles.nav}>
            <a href="#advantages" className={styles.navLink}>О компании</a>
            <a href="#catalog"    className={styles.navLink}>Памятники</a>
            <a href="#catalog"    className={styles.navLink} onClick={handleComplexesNav}>Комплексы</a>
            <a href="#contacts"   className={styles.navLink}>Контакты</a>
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
          <a href="#advantages" className={styles.mobileNavLink} onClick={closeMenu}>О компании</a>
          <a href="#catalog"    className={styles.mobileNavLink} onClick={closeMenu}>Памятники</a>
          <a href="#catalog"    className={styles.mobileNavLink} onClick={handleComplexesNav}>Комплексы</a>
          <a href="#contacts"   className={styles.mobileNavLink} onClick={closeMenu}>Контакты</a>
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
