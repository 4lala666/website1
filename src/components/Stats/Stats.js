import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Stats.module.css';

const stats = [
  { target: 17,   suffix: '+', label: 'лет на рынке',           desc: 'Работаем с 2007 года' },
  { target: 5000, suffix: '+', label: 'выполненных заказов',     desc: 'По всему Казахстану' },
  { target: 5,    suffix: '',  label: 'лет гарантии',            desc: 'На все изделия' },
  { target: 100,  suffix: '%', label: 'собственное производство', desc: 'Без посредников' },
];

function StatCard({ target, suffix, label, desc, isActive }) {
  const value = useCountUp(target, isActive, target >= 1000 ? 2500 : 1800);
  return (
    <div className={styles.card}>
      <div className={styles.num}>
        <span className={styles.count}>{value.toLocaleString('ru-RU')}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
}

export default function Stats() {
  const [ref, inView] = useInView(0.2);
  return (
    <section id="about" className={styles.stats} ref={ref}>
      <div className={styles.inner}>
        {stats.map((s, i) => (
          <StatCard key={i} {...s} isActive={inView} />
        ))}
      </div>
    </section>
  );
}
