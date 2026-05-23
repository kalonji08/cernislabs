# CernisLabs Website

Next.js 14 marketing site for [CernisLabs](https://www.cernislabs.com) — built with Tailwind CSS, Framer Motion, and Phosphor Icons.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 |
| Icons | @phosphor-icons/react v2 |
| Forms | Formspree |
| Hosting | Vercel |
| Domain | GoDaddy → Vercel DNS |

---

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 1. Linking Formspree (contact form)

The contact form at `/components/ContactForm.tsx` posts to Formspree. Follow these steps:

### Step 1 — Create a Formspree account
Go to [https://formspree.io](https://formspree.io) and sign up for a free account.

### Step 2 — Create a new form
1. Click **New Form**
2. Name it `CernisLabs Contact`
3. Set the notification email to `hello@cernislabs.com`
4. Click **Create Form**

### Step 3 — Copy your Form ID
After creating the form, Formspree gives you an endpoint like:
```
https://formspree.io/f/xpwzgkdo
                          ^^^^^^^^
                          This part is your Form ID
```

### Step 4 — Add it to your environment file
Create a `.env.local` file in the project root (this file is gitignored):
```bash
NEXT_PUBLIC_FORMSPREE_ID=xpwzgkdo
```
Replace `xpwzgkdo` with your actual Form ID.

### Step 5 — Add the same variable to Vercel
When you deploy (see Section 2 below), add the environment variable in Vercel:
- **Key:** `NEXT_PUBLIC_FORMSPREE_ID`
- **Value:** your Form ID (e.g. `xpwzgkdo`)
- **Environment:** Production, Preview, Development

> **Note:** Until the environment variable is set, the form falls back to the placeholder `YOUR_FORM_ID` and submissions will fail. Always set this before going live.

### Step 6 — Verify it works
1. Run `npm run dev`
2. Fill in the contact form and submit
3. Check your Formspree dashboard — the submission should appear under your form
4. Check `hello@cernislabs.com` for the notification email

---

## 2. Deploying to Vercel

### Step 1 — Install Vercel CLI (optional but useful)
```bash
npm i -g vercel
```

### Step 2 — Push your branch to GitHub
Make sure your code is on GitHub (push the `dev` branch, then merge to `main`):
```bash
git push origin dev
# Merge to main on GitHub, then:
git checkout main && git pull
```

### Step 3 — Import the project on Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select `kalonji08/cernislabs`
4. Vercel auto-detects Next.js — leave all build settings as default
5. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_FORMSPREE_ID` → your Formspree form ID
6. Click **Deploy**

Vercel will build and give you a URL like `cernislabs.vercel.app`. Test it before pointing your domain.

---

## 3. Connecting your GoDaddy domain to Vercel

### Step 1 — Add the domain in Vercel
1. In your Vercel project, go to **Settings → Domains**
2. Click **Add Domain**
3. Type your domain: `cernislabs.com` (and optionally `www.cernislabs.com`)
4. Vercel will show you the DNS records you need to add

### Step 2 — Update DNS in GoDaddy

Log in to [https://dcc.godaddy.com](https://dcc.godaddy.com) → select your domain → **DNS**.

#### For the apex domain (`cernislabs.com`)

GoDaddy does not support `ANAME`/`ALIAS` records on all plans. Use the **A record** method:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 600 |

> This is Vercel's IP for apex domains. Vercel routes it automatically.

#### For `www` (recommended — redirect to apex or vice versa)

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | `www` | `cname.vercel-dns.com` | 600 |

#### Remove conflicting records
Delete any existing `A` records for `@` and any `CNAME` for `www` that GoDaddy added by default.

### Step 3 — Verify in Vercel
Back in **Settings → Domains**, Vercel will poll for the DNS change. Green checkmarks appear once propagation is complete (usually 5–30 minutes, up to 48 hours in rare cases).

### Step 4 — SSL
Vercel provisions a free Let's Encrypt SSL certificate automatically once DNS is verified. No action needed.

### Step 5 — Test
Visit `https://cernislabs.com` — you should see the live site with a valid HTTPS padlock.

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Yes | Formspree form ID (e.g. `xpwzgkdo`) |

---

## Project structure

```
/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Page composition
│   └── globals.css       # Base styles
├── components/
│   ├── Nav.tsx           # Sticky navigation
│   ├── Hero.tsx          # Hero with counters, orbs, tilt panel
│   ├── MarqueeStrip.tsx  # Infinite scrolling strip
│   ├── Beliefs.tsx       # Four principles
│   ├── Services.tsx      # Spotlight bento cards
│   ├── WhyUs.tsx         # Differentiators
│   ├── Process.tsx       # 4-step process
│   ├── Sectors.tsx       # Industry sectors
│   ├── ContactForm.tsx   # Formspree contact form  ← new
│   ├── Footer.tsx        # CTA + footer bar
│   └── ScrollProgress.tsx
├── .env.local            # Local env vars (gitignored)
├── .gitignore
└── README.md
```

---

## Deployment checklist

- [ ] `NEXT_PUBLIC_FORMSPREE_ID` set in Vercel environment variables
- [ ] Formspree form notification email set to `hello@cernislabs.com`
- [ ] DNS A record `@` → `76.76.21.21` in GoDaddy
- [ ] DNS CNAME `www` → `cname.vercel-dns.com` in GoDaddy
- [ ] Domain verified (green) in Vercel → Settings → Domains
- [ ] HTTPS working on `https://cernislabs.com`
- [ ] Contact form test submission received in Formspree dashboard
