# iServe — One-Page Website

A single scrolling landing page (pure HTML/CSS/JS, no build step, no backend) — ready for GitHub Pages.

## Files
```
index.html        → the whole page (header, hero, features, extra services, CTA, footer)
css/style.css      → all styling & animations
js/script.js       → mobile menu, scroll progress bar, active-link highlighting, reveal-on-scroll
assets/            → every icon/illustration used (from your design assets)
```

## How to update contact info
Search `index.html` for:
- `01005352860` — phone number (also used to build the `wa.me` WhatsApp links)
- `iserve.eg2024@gmail.com` — email

To change the WhatsApp number, replace `201005352860` (country code + number, no leading 0 or +)
in every `https://wa.me/201005352860...` link.

## Deploy on GitHub Pages (free)
1. Create a new GitHub repository (e.g. `iserve-website`).
2. Upload all files in this folder, keeping the same structure (`index.html` at the root).
3. Go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch **main**, folder **/(root)**.
5. Save. Your site will be live in a minute or two at:
   `https://<your-username>.github.io/iserve-website/`

That's it — no build tools, no server, no dependencies beyond a Google Fonts link.

## Notes
- Fully responsive (mobile → desktop), right-to-left Arabic layout.
- The only external network request is Google Fonts (Cairo + Caveat). Everything else is local.
- The floating WhatsApp button (bottom corner) is shown on mobile only, since the header already has a WhatsApp button on desktop.
