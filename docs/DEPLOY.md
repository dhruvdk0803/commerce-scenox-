# Running Scenox Commerce on your own server

## Requirements

- Node.js 20 or newer (the site is built and tested on Node 24)
- About 2 GB of free RAM while building (the build generates ~620 static pages)
- A reverse proxy for HTTPS (nginx, Caddy or similar) pointing at the Node process

## 1. Environment file

Create a file named `.env.production` in the project folder **on the server** (never commit it; `.env*` files other than `.env.example` are ignored by git). Use `.env.example` as the template.

```
# Lead emails (you already have these working)
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
LEAD_TO_EMAIL=
LEAD_FROM_EMAIL=

# Nox, the website assistant: any OpenAI-compatible provider
CHAT_API_KEY=
CHAT_MODEL=
CHAT_BASE_URL=https://ekam.scenoxlabs.com/v1

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

`CHAT_BASE_URL` examples:
- OpenAI: leave empty
- Azure OpenAI: `https://<resource>.openai.azure.com/openai/v1` (`CHAT_MODEL` = your deployment name)
- Google Gemini: `https://generativelanguage.googleapis.com/v1beta/openai`
- Groq: `https://api.groq.com/openai/v1`
- OpenRouter: `https://openrouter.ai/api/v1`
- DeepSeek: `https://api.deepseek.com/v1`

Pick a model that supports tool (function) calling. To see which model names your key can use:

```
curl -H "Authorization: Bearer YOUR_KEY" https://ekam.scenoxlabs.com/v1/models
```

These values are read only on the server, inside the chat API route. They are never sent to the browser (checked by building with test values and scanning every browser file).

**Important:** the chat widget and the analytics IDs are switched on at build time. After adding or changing `CHAT_API_KEY`, `CHAT_MODEL` or the `NEXT_PUBLIC_*` values, run the build again (step 2), then restart.

## 1b. Let Nox book calls on your Google Calendar (optional)

Without this, Nox sends people to the /book page to pick a slot. With it, Nox offers open times in the visitor's own time zone and books the call itself (Google emails the visitor an invite with a Meet link, and you get the lead email).

1. Go to console.cloud.google.com, create a project, and enable **Google Calendar API**.
2. **OAuth consent screen:** choose *Internal* if you use Google Workspace; otherwise *External*, then **Publish app** (in *Testing* mode Google expires the token after 7 days).
3. **Credentials → Create credentials → OAuth client ID → Desktop app.** Copy the client ID and secret.
4. On your own computer, in the project folder, run:
   ```
   node scripts/google-calendar-auth.mjs CLIENT_ID CLIENT_SECRET
   ```
   Open the link it prints, sign in with the Google account whose calendar takes bookings, and allow access. It prints three lines.
5. Paste those three lines (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`) into `.env.production` on the server.
6. Set your availability in the same file (all times in `BOOKING_TIMEZONE`):
   ```
   BOOKING_TIMEZONE=Asia/Kolkata
   BOOKING_WEEKDAYS=1,2,3,4,5      # Mon=1 … Sun=7
   BOOKING_HOURS=10:00-18:00       # use 10:00-23:00 to give US visitors more morning slots
   BOOKING_SLOT_MINUTES=30
   BOOKING_NOTICE_HOURS=12         # earliest slot from now
   BOOKING_DAYS_AHEAD=14
   BOOKING_VISITOR_HOURS=08-21     # only offer times between 8 am and 9 pm for the visitor
   ```
   Nox checks your calendar's busy times before offering or booking a slot, so meetings booked through the Google appointment page are respected. Keep these hours in line with the hours on that appointment schedule.

## 2. Build and start

```
npm ci
npm run build
npm run start -- -p 3000
```

Keep it running with a process manager, for example PM2:

```
npm i -g pm2
pm2 start npm --name scenox-commerce -- run start -- -p 3000
pm2 save
pm2 startup
```

## 3. Reverse proxy (nginx example)

```
server {
  server_name commerce.scenoxstudios.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
  client_max_body_size 6m;   # the free-sample form accepts a 3 MB file
}
```

Add HTTPS with Certbot (`certbot --nginx -d commerce.scenoxstudios.com`). The `X-Forwarded-For` header matters: the form and chat rate limits use it to tell visitors apart.

## 4. Updating

```
git pull
npm ci
npm run build
pm2 restart scenox-commerce
```

## Notes

- Rate limits for forms and chat are kept in memory per process. Run a single instance (the default with the commands above); several instances behind a load balancer would each keep their own counts.
- Image optimisation uses `sharp`, installed with the project dependencies.
- After switching DNS from Vercel to your server, re-check `https://commerce.scenoxstudios.com/sitemap.xml` loads, then resubmit it in Google Search Console.
