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

# Website assistant: any OpenAI-compatible provider
CHAT_API_KEY=
CHAT_MODEL=
CHAT_BASE_URL=

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

Pick a model that supports tool (function) calling.

**Important:** the chat widget and the analytics IDs are switched on at build time. After adding or changing `CHAT_API_KEY`, `CHAT_MODEL` or the `NEXT_PUBLIC_*` values, run the build again (step 2), then restart.

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
