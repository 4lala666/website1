import React from 'react';
import styles from './Footer.module.css';

const navCols = [
  {
    title: 'Каталог',
    links: ['Памятники', 'Мемориальные комплексы', 'Обрамление', 'Доставка и установка'],
  },
  {
    title: 'Компания',
    links: ['О нас', 'Производство', 'Гарантии', 'Контакты'],
  },
  {
    title: 'Помощь',
    links: ['Как выбрать памятник', 'Фото и гравировка', 'Оплата и рассрочка', 'Частые вопросы'],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/images/logo.png" alt="Sezim Stone" className={styles.logoImg} />
            <p className={styles.tagline}>
              Создаём пространство для диалога поколений
            </p>
            <div className={styles.contacts}>
              <a href="tel:+77759962343" className={styles.contactLink}>+7 775 996 2343</a>
              <a href="mailto:info@mgranite.kz" className={styles.contactLink}>info@mgranite.kz</a>
              <span className={styles.address}>г. Алматы, ул. Илтипат, 51</span>
              <span className={styles.hours}>Ежедневно 09:00 — 18:00</span>
            </div>
          </div>
          {navCols.map(col => (
            <div key={col.title} className={styles.col}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              <ul className={styles.colList}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#catalog" className={styles.colLink}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <span className={styles.copy}>© 2025 Sezim Stone. Все права защищены.</span>
          <div className={styles.legal}>
            <a href="#contacts" className={styles.legalLink}>Политика конфиденциальности</a>
            <a href="#contacts" className={styles.legalLink}>Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
