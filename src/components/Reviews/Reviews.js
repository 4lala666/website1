import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';

const reviews = [
  {
    name: 'Айгерим К.',
    date: '15 января 2025',
    rating: 5,
    text: 'Огромная благодарность мастерам Sezim Stone. Памятник изготовили быстро и очень качественно. Гравировка портрета получилась точь-в-точь. Рекомендую всем.',
  },
  {
    name: 'Сергей М.',
    date: '3 декабря 2024',
    rating: 5,
    text: 'Профессиональный подход на каждом этапе. Помогли выбрать материал, разработали эскиз, всё согласовали. Установили чётко в оговорённые сроки. Работой довольны.',
  },
  {
    name: 'Нурлан А.',
    date: '21 ноября 2024',
    rating: 5,
    text: 'Заказали памятник для отца. Ребята отнеслись с уважением и пониманием, помогли определиться с дизайном. Качество гранита отличное. Спасибо за вашу работу.',
  },
  {
    name: 'Зарина Б.',
    date: '7 октября 2024',
    rating: 5,
    text: 'Быстро, качественно и по адекватной цене. Сделали рассрочку без переплат. Установка прошла аккуратно. Соседи по кладбищу спрашивали, где заказывали.',
  },
  {
    name: 'Максим В.',
    date: '18 сентября 2024',
    rating: 4,
    text: 'Хорошее соотношение цена/качество. Небольшая задержка в производстве, но предупредили заранее. Итоговый результат понравился, претензий нет.',
  },
];

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          className={i <= count ? `${styles.star} ${styles.starFilled}` : styles.star}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(i => (i + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.title}>Отзывы клиентов</h2>
          <p className={styles.sub}>
            Источник: 2GIS ·
            <a
              href="https://2gis.kz"
              className={styles.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              посмотреть все
            </a>
          </p>
        </div>

        <div className={styles.sliderArea}>
          {reviews.map((r, i) => (
            <div
              key={i}
              className={i === active ? `${styles.card} ${styles.cardActive}` : styles.card}
              aria-hidden={i !== active}
            >
              <Stars count={r.rating} />
              <p className={styles.text}>"{r.text}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {r.name.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.name}>{r.name}</span>
                  <span className={styles.date}>{r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {reviews.map((_, i) => (
            <button
              key={i}
              className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
              onClick={() => setActive(i)}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
