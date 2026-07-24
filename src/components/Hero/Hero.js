import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <picture>
        <source media="(max-width: 600px)" srcSet="/images/hero-mobile.jpg" />
        <img
          src="/images/hero.jpg"
          alt="Памятники из гранита — Sezim Stone Алматы"
          className={styles.heroBg}
        />
      </picture>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Создаём пространство для диалога поколений
        </h1>
        <p className={styles.subtitle}>
          Памятники и мемориальные комплексы из гранита — Алматы
        </p>
        <a href="#catalog" className={styles.btn}>
          Смотреть каталог
        </a>
      </div>
    </section>
  );
}
