# Xonqiz Nur — inquiry → Telegram relay

A tiny free Cloudflare Worker that receives the website inquiry form and forwards it to your Telegram. The bot token stays on the server (a Worker secret) and never reaches the browser.

## 1. Create the bot

1. Open Telegram, talk to **@BotFather** → `/newbot` → choose a name → copy the **token** (looks like `123456:ABC-...`).
2. Send any message to your new bot once (so it can message you back).
3. Get your **chat id**: talk to **@userinfobot** → it replies with your numeric `Id`. (Or open `https://api.telegram.org/bot<TOKEN>/getUpdates` after messaging the bot and read `chat.id`.)

## 2. Deploy the Worker

From this `worker/` folder:

```bash
npx wrangler login
npx wrangler deploy
npx wrangler secret put BOT_TOKEN   # paste the BotFather token
npx wrangler secret put CHAT_ID     # paste your numeric chat id
```

`wrangler deploy` prints a URL like `https://xonqiz-inquiry.<your-subdomain>.workers.dev`.

## 3. Wire the site to it

Open `src/app/services/inquiry.service.ts` and set:

```ts
const RELAY_URL = 'https://xonqiz-inquiry.<your-subdomain>.workers.dev';
```

Then rebuild and redeploy the site (`npm run build`). Until `RELAY_URL` is set, the form falls back to opening the visitor's email app — so it keeps working before the bot is configured.

## Notes

- Allowed origins are set in `index.js` (`ALLOWED`). Keep `https://xonqiz.uz`; remove `http://localhost:4411` once you no longer test locally.
- The Worker only forwards `name`, `phone`, `world`, `message` (trimmed and length-capped) to the chat in `CHAT_ID`. Nothing is stored.
