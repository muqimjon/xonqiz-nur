interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
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

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  let data: Inquiry = {};
  try {
    data = (await request.json()) as Inquiry;
  } catch {
    data = {};
  }

  const name = clip(data.name, 80);
  const phone = clip(data.phone, 40);
  const world = clip(data.world, 60);
  const message = clip(data.message, 1500);
  if (!name || !phone) {
    return Response.json({ ok: false }, { status: 422 });
  }

  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return Response.json({ ok: false }, { status: 500 });
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

  return Response.json({ ok: tg.ok }, { status: tg.ok ? 200 : 502 });
};
