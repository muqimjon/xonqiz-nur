/// <reference types="node" />

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(data: unknown): void;
}

interface Inquiry {
  name?: string;
  phone?: string;
  world?: string;
  message?: string;
}

const clip = (v: unknown, n: number) =>
  String(v ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, n);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  let data: Inquiry = {};
  if (req.body && typeof req.body === 'object') {
    data = req.body as Inquiry;
  } else if (typeof req.body === 'string') {
    try {
      data = JSON.parse(req.body) as Inquiry;
    } catch {
      data = {};
    }
  }

  const name = clip(data.name, 80);
  const phone = clip(data.phone, 40);
  const world = clip(data.world, 60);
  const message = clip(data.message, 1500);
  if (!name || !phone) {
    res.status(422).json({ ok: false });
    return;
  }

  const token = process.env['TELEGRAM_BOT_TOKEN'];
  const chatId = process.env['TELEGRAM_CHAT_ID'];
  if (!token || !chatId) {
    res.status(500).json({ ok: false });
    return;
  }

  const text =
    `🔔 Yangi so'rov — xonqiz.uz\n\n` +
    `👤 ${name}\n` +
    `📞 ${phone}\n` +
    (world ? `📦 ${world}\n` : '') +
    (message ? `\n${message}` : '');

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });

  res.status(tg.ok ? 200 : 502).json({ ok: tg.ok });
}
