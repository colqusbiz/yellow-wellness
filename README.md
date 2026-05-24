# Yellow Wellness — Deployment Guide

## What's in this folder

```
yellow-wellness/
├── index.html          ← Entry point
├── package.json        ← Project dependencies
├── vite.config.js      ← Build config
├── netlify.toml        ← Netlify routing rules
├── public/
│   └── favicon.svg     ← Browser tab icon
└── src/
    ├── main.jsx        ← React entry
    └── App.jsx         ← Your full website
```

---

## Step 1 — Install Node.js (if you don't have it)

Download from: https://nodejs.org  
Choose the "LTS" version. Install it like any normal program.

---

## Step 2 — Build the website

1. Open **Terminal** (Mac) or **Command Prompt** (Windows)
2. Navigate to this folder:
   ```
   cd path/to/yellow-wellness
   ```
3. Install dependencies (one time only):
   ```
   npm install
   ```
4. Build the site:
   ```
   npm run build
   ```
   This creates a `dist/` folder — that's your finished website.

---

## Step 3 — Deploy to Netlify

1. Go to https://netlify.com and sign up free
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the **`dist`** folder onto the page
4. Netlify gives you a live URL instantly (e.g. `yellow-wellness-abc123.netlify.app`)

---

## Step 4 — Buy your domain

1. Go to https://namecheap.com
2. Search: `yellowwellness.co.uk`
3. Purchase it (~£10/year)

---

## Step 5 — Connect domain to Netlify

1. In Netlify → **Site settings** → **Domain management**
2. Click **"Add a domain"** → type `yellowwellness.co.uk`
3. Netlify shows you DNS records to add
4. Log into Namecheap → **Domain List** → **Manage** → **Advanced DNS**
5. Add the records Netlify gives you
6. Wait up to 1 hour — your site is live at www.yellowwellness.co.uk ✓

---

## Updating your website in future

1. Edit `src/App.jsx` with your changes
2. Run `npm run build` again
3. Drag the new `dist/` folder to Netlify → done

---

## Things to update before going live

In `src/App.jsx`, search and replace:
- `hello@yellowwellness.co.uk` → your real email
- `London, UK` → your actual location (or keep vague for privacy)
- Prices → adjust if needed
- `Mon–Sat, 9am–7pm` → your actual hours
