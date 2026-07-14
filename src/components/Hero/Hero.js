import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <img
        src="/images/hero.jpg"
        alt="Памятники из гранита — M-Granite Алматы"
        className={styles.heroBg}
      />
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
