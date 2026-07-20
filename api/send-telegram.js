// Vercel serverless function — token stays server-side, never exposed to browser

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

// Server-side validation mirrors the client rules
function validateBody({ name, phone, comment }) {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return 'Имя должно содержать минимум 2 символа';
  }
  if (!phone || typeof phone !== 'string' || !/^[+\d][\d\s\-().]{4,18}$/.test(phone.trim())) {
    return 'Некорректный номер телефона';
  }
  if (comment && comment.length > 500) {
    return 'Комментарий не должен превышать 500 символов';
  }
  return null;
}

module.exports = async function handler(req, res) {
  // CORS headers (same origin on Vercel, but needed for vercel dev)
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, comment, _hp } = req.body || {};

  // Honeypot — bots fill this, humans don't
  if (_hp) {
    // Silently pretend success so bots don't know they were blocked
    return res.status(200).json({ ok: true });
  }

  // Server-side validation (defence in depth — client also validates)
  const validationError = validateBody({ name, phone, comment });
  if (validationError) {
    return res.status(422).json({ error: validationError });
  }

  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const text =
    `🔔 Новая заявка с сайта Sezim Stone\n` +
    `👤 Имя: ${name.trim()}\n` +
    `📞 Телефон: ${phone.trim()}\n` +
    `💬 Комментарий: ${comment?.trim() || '—'}`;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    if (!tgRes.ok) {
      const body = await tgRes.text();
      console.error('Telegram API error:', tgRes.status, body);
      throw new Error(`Telegram ${tgRes.status}`);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send-telegram error:', err.message);
    return res.status(502).json({ error: 'Failed to send message' });
  }
};
