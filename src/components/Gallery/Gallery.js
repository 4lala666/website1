import React, { useState, useEffect, useRef } from 'react';
import styles from './Gallery.module.css';

const slides = [
  { src: '/images/gallery/gallery-01.webp', label: 'Гранитный памятник',     desc: 'Классический вертикальный, гранит «Чёрный Индийский»'   },
  { src: '/images/gallery/gallery-02.webp', label: 'Мемориальный комплекс',  desc: 'Семейный комплекс с обрамлением и вазами'              },
  { src: '/images/gallery/gallery-03.webp', label: 'Фигурный памятник',      desc: 'Индивидуальный дизайн с гравировкой портрета'           },
  { src: '/images/gallery/gallery-04.webp', label: 'Мусульманский памятник', desc: 'Гранит «Ясень», гравировка арабской вязью'              },
  { src: '/images/gallery/gallery-05.webp', label: 'Двойной памятник',       desc: 'Гранит «Габбро-Диабаз», полный цикл установки'          },
  { src: '/images/gallery/gallery-06.webp', label: 'Гранитное обрамление',   desc: 'Благоустройство захоронения под ключ'                   },
  { src: '/images/gallery/gallery-07.webp', label: 'Гранитный памятник',     desc: 'Вертикальный памятник с портретной гравировкой'         },
  { src: '/images/gallery/gallery-08.webp', label: 'Мемориальный комплекс',  desc: 'Комплекс с цоколем и гранитным обрамлением'             },
  { src: '/images/gallery/gallery-09.webp', label: 'Христианский памятник',  desc: 'Крест с цоколем, гранит «Дымовский»'                    },
  { src: '/images/gallery/gallery-10.webp', label: 'Детский памятник',       desc: 'Мягкие формы, розовый гранит «Лезники»'                 },
  { src: '/images/gallery/gallery-11.webp', label: 'Двойной комплекс',       desc: 'Горизонтальный, семейный, гранит «Габбро»'              },
  { src: '/images/gallery/gallery-12.webp', label: 'Фигурный памятник',      desc: 'Арочный силуэт с рельефным орнаментом'                  },
  { src: '/images/gallery/gallery-13.webp', label: 'Гранитное обрамление',   desc: 'Полное благоустройство, плитка и цветники'              },
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
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.container}>
          <h2 className={styles.title}>Галерея работ</h2>
          <p className={styles.sub}>Реализованные проекты нашей мастерской</p>
        </div>
      </div>

      <div className={styles.sliderWrap}>
        {/* Slides */}
        <div className={styles.track}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className={
                i === current
                  ? `${styles.slide} ${styles.slideActive}`
                  : `${styles.slide}`
              }
              aria-hidden={i !== current}
            >
              <div className={styles.slidePlaceholder}>
                <img
                  src={slide.src}
                  alt={slide.label}
                  className={styles.slideImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.slideCaption}>
                <p className={styles.captionText}>{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prevSlide} aria-label="Предыдущий">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next} aria-label="Следующий">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

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
