import React, { useState, useEffect, useRef } from 'react';
import styles from './Gallery.module.css';

const slides = [
  { src: '/images/gallery/gallery-01.webp', label: 'Гранитный памятник',     desc: 'Комплекс из гранита Кордай, с использованием кованных металлических элементов, гравировка портретов выполнена на гранитных плитках Шаньси»'   },
  { src: '/images/gallery/gallery-02.webp', label: 'Мемориальный комплекс',  desc: 'Мемориальный комплекс выполнен полностью из гранита Курты'              },
  { src: '/images/gallery/gallery-03.webp', label: 'Фигурный памятник',      desc: 'Мемориальный комплекс выполнен полностью из гранита Кордай, с гравировкой орнаментов на изделиях, также проведены работы по озеленению. Перила и калитка кованый металл.'           },
  { src: '/images/gallery/gallery-04.webp', label: 'Мусульманский памятник', desc: 'Комплекс из гранита Курты с использованием кованных элементов, основной памятник выполнен из гранита Шаньси'              },
  { src: '/images/gallery/gallery-05.webp', label: 'Мемориальный комплекс',  desc: 'Комплекс семейный из гранита Курты'             },
  { src: '/images/gallery/gallery-06.webp', label: 'Детский памятник',       desc: 'Благоустройство выполнено тротуарной плиткой, гранитные изделия из гранита Кордай, металлическое ограждение, на памятниках вставка из гранита Шаньси'                 },
  { src: '/images/gallery/gallery-07.webp', label: 'Фигурный памятник',      desc: 'Комплекс выполнен из гранита Кок-сорой, основной памятник из мрамора Коелга'                  },
  { src: '/images/gallery/gallery-08.webp', label: 'Гранитное обрамление',   desc: ' Памятник, цветник, лавочка, парапеты - гранит Аксай,Столбы - гранит Габбро-Диабаз, Облицовка комплекса и отмостки - гранит Кок-сорой'              },
  { src: '/images/gallery/gallery-09.webp', label: 'Гранитное обрамление',   desc: 'Мемориальный комплекс изготовлены из гранита Evergreen, ограждения металлические кованные из квадрата 14, узоры на памятнике выполнены на фрезерном станке'              },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  function goTo(index) {
    setCurrent(index);
  }

  function next() { goTo((current + 1) % slides.length); }
  function prevSlide() { goTo((current - 1 + slides.length) % slides.length); }

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  });

  function handleDotClick(i) {
    clearInterval(timerRef.current);
    goTo(i);
  }

  return (
    <section id="gallery" className={styles.section}>

      <div className={styles.head}>
        <div className={styles.container}>
          <h2 className={styles.title}>Галерея работ</h2>
          <p className={styles.sub}>Реализованные проекты нашей мастерской</p>
        </div>
      </div>

      <div className={styles.sliderOuter}>

        {/* [←]  card  [→] */}
        <div className={styles.sliderLayout}>

          <button className={styles.navBtn} onClick={prevSlide} aria-label="Предыдущий">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.card}>
            <div className={styles.track}>
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={
                    i === current
                      ? `${styles.slide} ${styles.slideActive}`
                      : styles.slide
                  }
                  aria-hidden={i !== current}
                >
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className={styles.slideImg}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <p className={styles.caption}>{slides[current].desc}</p>
          </div>

          <button className={styles.navBtn} onClick={next} aria-label="Следующий">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === current ? `${styles.dot} ${styles.dotActive}` : styles.dot}
              onClick={() => handleDotClick(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
