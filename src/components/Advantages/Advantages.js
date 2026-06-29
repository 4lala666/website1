import React from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './Advantages.module.css';

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Собственное производство',
    desc: 'Производим памятники на собственном оборудовании в Алматы. Никаких посредников — только прямое производство.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 3v5h-7V8Z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Доставка по Казахстану',
    desc: 'Доставляем готовые изделия в любой город страны. Бережная упаковка и страхование груза.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Индивидуальный дизайн',
    desc: 'Разрабатываем уникальный эскиз под ваши пожелания. Гравировка портрета, орнаментов, эпитафии.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Гарантия 5 лет',
    desc: 'Предоставляем официальную гарантию на все изделия. Устраняем дефекты бесплатно в гарантийный период.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Работаем 17+ лет',
    desc: 'Богатый опыт изготовления памятников. Знаем все тонкости работы с гранитом и мрамором.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Рассрочка 0%',
    desc: 'Гибкие условия оплаты. Рассрочка без процентов до 12 месяцев. Работаем с наличными и безналом.',
  },
];

export default function Advantages() {
  const [ref, inView] = useInView(0.08);
  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={inView ? `${styles.head} ${styles.visible}` : styles.head}>
          <h2 className={styles.title}>Почему выбирают нас</h2>
          <p className={styles.sub}>Мы вкладываем душу в каждый памятник</p>
        </div>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={i}
              className={inView
                ? `${styles.card} ${styles.visible} ${styles['delay' + i]}`
                : styles.card}
            >
              <div className={styles.iconWrap}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
