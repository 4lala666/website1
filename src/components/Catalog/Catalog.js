import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './Catalog.module.css';

// ── Muslim data ───────────────────────────────────────────────────────────────

const MUSLIM_META = {
  gabro:  { name: 'Габбро',  folder: 'gabbro', prefix: 'Г'  },
  korday: { name: 'Кордай',  folder: 'korday', prefix: 'К'  },
  kurty:  { name: 'Курты',   folder: 'kurty',  prefix: 'КУ' },
};

const GABRO_FILES = Array.from({ length: 24 }, (_, i) => `gabbro${i + 1}.jpg`);

// korday7.jpg and korday8.jpg are absent — skip them
const KORDAY_FILES = [
  ...Array.from({ length: 6 },  (_, i) => `korday${i + 1}.jpg`),  // 1-6
  ...Array.from({ length: 17 }, (_, i) => `korday${i + 9}.jpg`),  // 9-25
];

const KURTY_FILES = [
  ...Array.from({ length: 24 }, (_, i) => `kurty${i + 1}.jpg`),
  ...Array.from({ length: 7 },  (_, i) => `kurtyarka${i + 1}.jpg`),
];

function makeMuslimItems(collectionKey, files) {
  const { name, folder, prefix } = MUSLIM_META[collectionKey];
  return files.map((filename, i) => ({
    id:             `muslim-${folder}-${i + 1}`,
    religion:       'muslim',
    collection:     collectionKey,
    collectionName: name,
    formNum:        `${prefix}-${String(i + 1).padStart(3, '0')}`,
    image:          `/images/catalog/muslim/${folder}/${filename}`,
  }));
}

// ── Metal products data ───────────────────────────────────────────────────────

const METAL_FOLDER = 'Изделия из металла';

function metalUrl(filename) {
  return '/images/catalog/' + encodeURIComponent(METAL_FOLDER) + '/' + encodeURIComponent(filename);
}

// Exact filenames in numeric order
const METAL_FILES = [
  '1.jpg',
  '2.jpg',
  '3_pages-to-jpg-0001.jpg',
  '4_pages-to-jpg-0001.jpg',
  '5_page-0001.jpg',
  '6_page-0001.jpg',
  '7_page-0001.jpg',
  '8_page-0001.jpg',
  '9_page-0001.jpg',
  '10_page-0001.jpg',
];

const METAL_ITEMS = METAL_FILES.map((filename, i) => ({
  id:             `metal-${i + 1}`,
  religion:       'metal',
  collection:     'all',
  collectionName: 'Изделия из металла',
  formNum:        `М-${String(i + 1).padStart(3, '0')}`,
  image:          metalUrl(filename),
}));

// ── Christian data ────────────────────────────────────────────────────────────

// Folder name starts with Cyrillic "с" (U+0441), not Latin "c"
const XIAN_ROOT = 'сhristianity';

function xianUrl(subfolder, filename) {
  return (
    '/images/catalog/' +
    encodeURIComponent(XIAN_ROOT) +
    '/' +
    encodeURIComponent(subfolder) +
    '/' +
    encodeURIComponent(filename)
  );
}

// Вертикальные: files 1-12 then 14-74 (no file 13)
const VERTICAL_FILES = [
  ...Array.from({ length: 12 }, (_, i) => `христианские вертикальные ${i + 1}.png`),
  ...Array.from({ length: 61 }, (_, i) => `христианские вертикальные ${i + 14}.png`),
];

// Горизонтальные: files 1-11, 13-15, 17-29 (no file 12 or 16)
const HORIZONTAL_FILES = [
  ...Array.from({ length: 11 }, (_, i) => `христианские горизонтальные ${i + 1}.png`),
  ...Array.from({ length: 3 },  (_, i) => `христианские горизонтальные ${i + 13}.png`),
  ...Array.from({ length: 13 }, (_, i) => `христианские горизонтальные ${i + 17}.png`),
];

// Детские: exactly 7 files with specific names
const CHILDREN_FILES = [
  'христианские вертикальные 20.png',
  'христианские вертикальные 25.png',
  'христианские вертикальные 26.png',
  'христианские вертикальные 43.png',
  'христианские вертикальные 74.png',
  'христианские горизонтальные 17.png',
  'христианские горизонтальные 18.png',
];

// Семейные: exactly 19 files
const FAMILY_FILES = [
  'христианские горизонтальные 2.png',
  'христианские горизонтальные 3.png',
  'христианские горизонтальные 4.png',
  'христианские горизонтальные 5.png',
  'христианские горизонтальные 6.png',
  'христианские горизонтальные 7.png',
  'христианские горизонтальные 10.png',
  'христианские горизонтальные 12.png',
  'христианские горизонтальные 13.png',
  'христианские горизонтальные 14.png',
  'христианские горизонтальные 16.png',
  'христианские горизонтальные 20.png',
  'христианские горизонтальные 21.png',
  'христианские горизонтальные 22.png',
  'христианские горизонтальные 24.png',
  'христианские горизонтальные 25.png',
  'христианские горизонтальные 27.png',
  'христианские горизонтальные 28.png',
  'христианские горизонтальные 29.png',
];

const XIAN_META = {
  vertical:   { name: 'Вертикальные',   folder: 'Вертикальные',   prefix: 'В',  files: VERTICAL_FILES   },
  horizontal: { name: 'Горизонтальные', folder: 'Горизонтальные', prefix: 'Г',  files: HORIZONTAL_FILES },
  children:   { name: 'Детские',        folder: 'Детские',        prefix: 'Д',  files: CHILDREN_FILES   },
  family:     { name: 'Семейные',       folder: 'Семейные',       prefix: 'С',  files: FAMILY_FILES     },
};

function makeXianItems(collectionKey) {
  const { name, folder, prefix, files } = XIAN_META[collectionKey];
  return files.map((filename, i) => ({
    id:             `xian-${collectionKey}-${i + 1}`,
    religion:       'christian',
    collection:     collectionKey,
    collectionName: name,
    formNum:        `${prefix}-${String(i + 1).padStart(3, '0')}`,
    image:          xianUrl(folder, filename),
  }));
}

// ── Combined item list ────────────────────────────────────────────────────────

const ALL_ITEMS = [
  ...makeMuslimItems('gabro',  GABRO_FILES),
  ...makeMuslimItems('korday', KORDAY_FILES),
  ...makeMuslimItems('kurty',  KURTY_FILES),
  ...makeXianItems('vertical'),
  ...makeXianItems('horizontal'),
  ...makeXianItems('children'),
  ...makeXianItems('family'),
  ...METAL_ITEMS,
];

// ── Filter config per religion ────────────────────────────────────────────────

const RELIGION_COLLECTIONS = {
  muslim: [
    { key: 'all',    label: 'Все' },
    { key: 'gabro',  label: 'Габро' },
    { key: 'korday', label: 'Мусульманский' },
    { key: 'kurty',  label: 'Курты памятник' },
  ],
  christian: [
    { key: 'all',        label: 'Все' },
    { key: 'vertical',   label: 'Вертикальные' },
    { key: 'horizontal', label: 'Горизонтальные' },
    { key: 'children',   label: 'Детские' },
    { key: 'family',     label: 'Семейные' },
  ],
  metal: [
    { key: 'all', label: 'Все' },
  ],
};

function itemCount(rel, col) {
  return ALL_ITEMS.filter(
    item => item.religion === rel && (col === 'all' || item.collection === col)
  ).length;
}

// ── Image with 404 fallback ───────────────────────────────────────────────────

function ProductImage({ src, alt, className }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={styles.imgFallback}>
        <svg
          className={styles.imgFallbackIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className={styles.imgFallbackText}>Фото скоро будет</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className || styles.cardImg}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function Modal({ item, onClose }) {
  const handleKey = useCallback(
    e => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.collectionName} ${item.formNum}`}
    >
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.modalImgWrap}>
          <ProductImage
            src={item.image}
            alt={`${item.collectionName} ${item.formNum}`}
            className={styles.modalImg}
          />
        </div>

        <div className={styles.modalInfo}>
          <p className={styles.modalCollection}>{item.collectionName}</p>
          <h3 className={styles.modalFormNum}>Форма {item.formNum}</h3>
          <p className={styles.modalNote}>
            Цена зависит от размера, гравировки и комплектации.<br />
            Уточните стоимость у нашего специалиста.
          </p>
          <a
            href="https://wa.me/77052221016"
            className={styles.modalBtnWa}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className={styles.modalWaIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741 1.001 1.021-3.672-.236-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Получить консультацию
          </a>
          <a href="#contacts" className={styles.modalBtnSecondary} onClick={onClose}>
            Заполнить форму →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Catalog() {
  const [ref, inView]               = useInView(0.05);
  const [religion, setReligion]     = useState('muslim');
  const [collection, setCollection] = useState('all');
  const [modalItem, setModalItem]   = useState(null);

  const currentCollections = RELIGION_COLLECTIONS[religion];

  const filtered = useMemo(
    () => ALL_ITEMS.filter(item =>
      item.religion === religion &&
      (collection === 'all' || item.collection === collection)
    ),
    [religion, collection]
  );

  function handleReligion(rel) {
    setReligion(rel);
    setCollection('all');
  }

  return (
    <section id="catalog" className={styles.section} ref={ref}>
      {modalItem && (
        <Modal item={modalItem} onClose={() => setModalItem(null)} />
      )}

      <div className={styles.container}>

        {/* Header */}
        <div className={inView ? `${styles.head} ${styles.visible}` : styles.head}>
          <h2 className={styles.sectionTitle}>Каталог памятников</h2>
          <p className={styles.sectionSub}>Выберите форму и получите консультацию</p>
        </div>

        {/* Religion tabs */}
        <div className={inView ? `${styles.religionTabs} ${styles.visible}` : styles.religionTabs}>
          {[
            { key: 'muslim',    label: 'Мусульманские' },
            { key: 'christian', label: 'Христианские' },
            { key: 'metal',     label: 'Изделия из металла' },
          ].map(tab => (
            <button
              key={tab.key}
              className={
                religion === tab.key
                  ? `${styles.religionTab} ${styles.religionTabActive}`
                  : styles.religionTab
              }
              onClick={() => handleReligion(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Collection sub-filter — hidden when there are no sub-categories */}
        {currentCollections.length > 1 && (
          <div className={inView ? `${styles.subFilter} ${styles.visible}` : styles.subFilter}>
            {currentCollections.map(col => (
              <button
                key={col.key}
                className={
                  collection === col.key
                    ? `${styles.subBtn} ${styles.subBtnActive}`
                    : styles.subBtn
                }
                onClick={() => setCollection(col.key)}
              >
                {col.label}
                <span className={styles.subBtnCount}>
                  {itemCount(religion, col.key)}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Product grid */}
        <div className={styles.grid}>
          {filtered.map(item => (
            <button
              key={item.id}
              className={inView ? `${styles.card} ${styles.cardVisible}` : styles.card}
              onClick={() => setModalItem(item)}
              aria-label={`${item.collectionName} — Форма ${item.formNum}`}
            >
              <div className={
                item.religion !== 'muslim'
                  ? `${styles.cardImgWrap} ${styles.cardImgWrapContain}`
                  : styles.cardImgWrap
              }>
                <ProductImage
                  src={item.image}
                  alt={`${item.collectionName} ${item.formNum}`}
                  className={item.religion !== 'muslim' ? styles.cardImgContain : undefined}
                />
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardCollection}>{item.collectionName}</span>
                <span className={styles.cardForm}>Форма {item.formNum}</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
