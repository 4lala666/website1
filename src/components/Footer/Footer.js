import React from 'react';
import styles from './Footer.module.css';

// ── Contact icons ─────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.18 19.79 19.79 0 011 2.18 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 7.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ── Social icons ──────────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741 1.001 1.021-3.672-.236-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}



function GmapsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const contacts = [
  { icon: <PhoneIcon />, value: '+7 775 996 2343',          href: 'tel:+77759962343' },
  { icon: <MailIcon />,  value: 'info@mgranite.kz',         href: 'mailto:info@mgranite.kz' },
  { icon: <MapPinIcon />,value: 'г. Алматы, ул. Илтипат, 51', href: null },
  { icon: <ClockIcon />, value: 'Понедельник — Суббота 09:00 — 18:00',  href: null },
];

const socials = [
  { icon: <WhatsAppIcon />,  href: 'https://wa.me/77759962343', label: 'WhatsApp' },
  { icon: <GmapsIcon />,     href: 'https://maps.google.com/maps?q=Алматы,+ул.+Илтипат,+51', label: 'Google Maps' },
];

const navCols = [
  {
    title: 'Каталог',
    links: [
      { label: 'Памятники',              href: '#catalog' },
      { label: 'Мемориальные комплексы', href: '#gallery' },
      { label: 'Изделия из металла',     href: '#catalog' },
      { label: 'Доставка и установка',   href: '#how-we-work' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'О нас',        href: '#advantages' },
      { label: 'Производство', href: '#how-we-work' },
      { label: 'Гарантии',     href: '#advantages' },
      { label: 'Контакты',     href: '#contacts' },
    ],
  },

];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.goldLine} aria-hidden="true" />

      <div className={styles.container}>

        {/* ── Top grid ── */}
        <div className={styles.top}>

          {/* Brand column */}
          <div className={styles.brand}>
            <a href="/" className={styles.logoLink}>
              <img src="/images/logo.png" alt="Sezim Stone" className={styles.logo} />
            </a>

            <p className={styles.tagline}>
              Создаём пространство для диалога поколений
            </p>

            <ul className={styles.contactList}>
              {contacts.map((c, i) => (
                <li key={i} className={styles.contactItem}>
                  <span className={styles.contactIcon}>{c.icon}</span>
                  {c.href
                    ? <a href={c.href} className={styles.contactLink}>{c.value}</a>
                    : <span className={styles.contactText}>{c.value}</span>
                  }
                </li>
              ))}
            </ul>

            <div className={styles.socials}>
              {socials.map(s => (
                <a key={s.label} href={s.href} className={styles.socialLink}
                  target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(col => (
            <div key={col.title} className={styles.col}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              <ul className={styles.colList}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.colLink}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── Divider ── */}
        <div className={styles.divider} aria-hidden="true" />

        {/* ── Bottom bar ── */}
        <div className={styles.bottom}>
          <span className={styles.copy}>© 2025 Sezim Stone. Все права защищены.</span>
          <div className={styles.legal}>
            <a href="#contacts" className={styles.legalLink}>Политика конфиденциальности</a>
            <a href="#contacts" className={styles.legalLink}>Пользовательское соглашение</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
