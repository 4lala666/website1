import React from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './HowWeWork.module.css';

const steps = [
  {
    num: '01',
    title: 'Консультация',
    desc: 'Приезжаете к нам или звоните — обсуждаем форму, размер, материал и пожелания по дизайну. Бесплатно.',
  },
  {
    num: '02',
    title: 'Проект и эскиз',
    desc: 'Наш дизайнер создаёт эскиз памятника в 3D. Согласовываем все детали до начала работ.',
  },
  {
    num: '03',
    title: 'Изготовление',
    desc: 'Производим в нашей мастерской в Алматы. Полируем, гравируем, контролируем качество на каждом этапе.',
  },
  {
    num: '04',
    title: 'Доставка',
    desc: 'Бережно упаковываем и доставляем памятник до места назначения по всему Казахстану.',
  },
  {
    num: '05',
    title: 'Установка',
    desc: 'Профессиональная установка с соблюдением всех технических норм. Даём гарантию на 3 года.',
  },
];

export default function HowWeWork() {
  const [ref, inView] = useInView(0.08);
  return (
    <section id="how-we-work" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={inView ? `${styles.head} ${styles.visible}` : styles.head}>
          <h2 className={styles.title}>Как мы работаем</h2>
          <p className={styles.sub}>Весь процесс от звонка до установки</p>
        </div>
        <div className={styles.timeline}>
          {steps.map((step, i) => (
            <div
              key={i}
              className={inView
                ? `${styles.step} ${styles.visible} ${styles['stepDelay' + i]}`
                : styles.step}
            >
              <div className={styles.stepLeft}>
                <div className={styles.stepNum}>{step.num}</div>
                {i < steps.length - 1 && <div className={styles.stepLine} />}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
