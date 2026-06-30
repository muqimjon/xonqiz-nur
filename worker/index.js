const ALLOWED = ['https://xonqiz.uz', 'https://www.xonqiz.uz', 'http://localhost:4411'];

function cors(origin) {
  const allow = ALLOWED.includes(origin) ? origin : ALLOWED[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
  };
}

const clip = (v, n) =>
  String(v ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, n);

function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...cors(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors(origin) });
    if (request.method !== 'POST') return json({ ok: false }, 405, origin);

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false }, 400, origin);
    }

    const name = clip(data.name, 80);
    const phone = clip(data.phone, 40);
    const world = clip(data.world, 60);
    const message = clip(data.message, 1500);
    if (!name || !phone) return json({ ok: false }, 422, origin);

    const text =
      `🔔 Yangi so'rov — xonqiz.uz\n\n` +
      `👤 ${name}\n` +
      `📞 ${phone}\n` +
      (world ? `📦 ${world}\n` : '') +
      (message ? `\n${message}` : '');

    const tg = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text, disable_web_page_preview: true }),
    });

    return json({ ok: tg.ok }, tg.ok ? 200 : 502, origin);
  },
};
