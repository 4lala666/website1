import React, { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './ContactForm.module.css';

const TG_TOKEN   = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID;

async function sendToTelegram({ name, phone, comment }) {
  const text =
    `🔔 Новая заявка с сайта Sezim Stone\n` +
    `👤 Имя: ${name}\n` +
    `📞 Телефон: ${phone}\n` +
    `💬 Комментарий: ${comment || '—'}`;

  const res = await fetch(
    `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text }),
    }
  );

  if (!res.ok) throw new Error(`Telegram API error: ${res.status}`);
  return res.json();
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741 1.001 1.021-3.672-.236-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactForm() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm]       = useState({ name: '', phone: '', comment: '' });
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    try {
      await sendToTelegram(form);
      setForm({ name: '', phone: '', comment: '' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function handleReset() {
    setStatus('idle');
  }

  return (
    <section id="contacts" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={styles.layout}>

          {/* Left: info */}
          <div className={inView ? `${styles.info} ${styles.visible}` : styles.info}>
            <h2 className={styles.title}>Свяжитесь с нами</h2>
            <p className={styles.sub}>
              Проконсультируем бесплатно, поможем выбрать памятник<br />
              и оформим заказ в удобное для вас время.
            </p>
            <div className={styles.contacts}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Адрес</span>
                <span className={styles.contactVal}>г. Алматы, ул. Илтипат, 51</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Телефон</span>
                <a href="tel:+77759962343" className={styles.contactLink}>+7 775 996 2343</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <a href="mailto:info@mgranite.kz" className={styles.contactLink}>info@mgranite.kz</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Режим работы</span>
                <span className={styles.contactVal}>Понедельник — Суббота</span>
                <span className={styles.contactVal}>09:00–18:00</span>
              </div>
            </div>
            <a
              href="https://wa.me/77759962343"
              className={styles.waBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.waIcon}><WhatsAppIcon /></span>
              Написать в WhatsApp
            </a>
            <div className={styles.mapWrap}>
              <iframe
                title="Sezim Stone на карте"
                className={styles.map}
                src="https://maps.google.com/maps?q=Алматы,+ул.+Илтипат,+51&t=&z=16&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className={inView ? `${styles.formWrap} ${styles.visible}` : styles.formWrap}>

            {status === 'success' && (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Заявка принята!</h3>
                <p className={styles.successText}>
                  Спасибо! Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className={styles.success}>
                <div className={`${styles.successIcon} ${styles.errorIcon}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Ошибка отправки</h3>
                <p className={styles.successText}>
                  Что-то пошло не так, позвоните нам напрямую:
                </p>
                <a href="tel:+77759962343" className={styles.errorPhone}>
                  +7 775 996 2343
                </a>
                <button className={styles.retryBtn} onClick={handleReset}>
                  Попробовать снова
                </button>
              </div>
            )}

            {(status === 'idle' || status === 'sending') && (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Получить консультацию</h3>
                <div className={styles.group}>
                  <label className={styles.label} htmlFor="cf-name">Имя</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                  />
                </div>
                <div className={styles.group}>
                  <label className={styles.label} htmlFor="cf-phone">Телефон</label>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    className={styles.input}
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                  />
                </div>
                <div className={styles.group}>
                  <label className={styles.label} htmlFor="cf-comment">Комментарий</label>
                  <textarea
                    id="cf-comment"
                    name="comment"
                    className={styles.textarea}
                    placeholder="Опишите, что вас интересует..."
                    value={form.comment}
                    onChange={handleChange}
                    rows={4}
                    disabled={status === 'sending'}
                  />
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Отправляем...' : 'Получить консультацию'}
                </button>
                <p className={styles.privacyNote}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
