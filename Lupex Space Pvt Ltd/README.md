# 🚀 Lupex Space v3 — Premium Website

Apple-level aerospace startup website with all features implemented.

---

## 📁 File Structure

```
lupex-space/
├── index.html          ← Complete HTML (all 10 sections)
├── style.css           ← Full design system + responsive CSS
├── main.js             ← All JS: loader, canvas, form, music, animations
├── README.md           ← This file
└── assets/             ← (create this folder)
    ├── team/
    │   ├── founder.jpg
    │   ├── cofounder.jpg
    │   └── tech.jpg
    └── schools/
        └── snd.png
```

---

## ▶️ Run Locally

```bash
# Option 1: Direct open
open index.html    # macOS
start index.html   # Windows

# Option 2: Live server (recommended)
npx serve .
# → http://localhost:3000

# Option 3: Python
python -m http.server 8080
# → http://localhost:8080

# Option 4: VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

---

## 📧 Contact Form — EmailJS Setup (REQUIRED)

The contact form uses **EmailJS** — sends messages directly to `info@lupexspace.com` from the browser. No backend needed.

### Step-by-Step Setup:

1. **Create account** at [emailjs.com](https://www.emailjs.com) (free tier: 200 emails/month)

2. **Add Email Service**
   - Dashboard → Email Services → Add New Service
   - Choose Gmail/Outlook/Custom SMTP
   - Connect your `info@lupexspace.com` account
   - Copy the **Service ID** (e.g. `service_lupex`)

3. **Create Email Template**
   - Dashboard → Email Templates → Create Template
   - Subject: `[Lupex Space] New enquiry from {{from_name}}`
   - Body:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Organisation: {{organisation}}
     Type: {{type}}
     
     Message:
     {{message}}
     ```
   - To Email: `info@lupexspace.com`
   - Copy the **Template ID** (e.g. `template_contact`)

4. **Get Public Key**
   - Dashboard → Account → General → Public Key
   - Copy it (e.g. `user_abc123xyz`)

5. **Paste into `main.js`** (around line 230):
   ```javascript
   const EMAILJS_PUBLIC_KEY  = 'user_abc123xyz';   // ← your key
   const EMAILJS_SERVICE_ID  = 'service_lupex';    // ← your service
   const EMAILJS_TEMPLATE_ID = 'template_contact'; // ← your template
   ```

> **Fallback**: If EmailJS isn't set up, clicking "Send Message" opens the user's mail client with a pre-filled email — so messages still reach you.

---

## 🎵 Background Music

- Auto-muted on load (browser policy requires user interaction)
- Fixed play/pause button — bottom right corner
- Default source: a royalty-free ambient track from Pixabay
- **To use your own music**: Replace the `<source src="...">` in `index.html`:
  ```html
  <source src="assets/ambient.mp3" type="audio/mpeg"/>
  ```
  Recommended: 2–5 min loop, ~64kbps, soft ambient/space theme

---

## 👤 Adding Real Team Photos

Replace placeholder divs in `index.html` (search for `tc-placeholder`):

```html
<!-- Replace this: -->
<div class="tc-image tc-placeholder">
  <div class="tcp-avatar">...</div>
</div>

<!-- With this: -->
<div class="tc-image">
  <img src="assets/team/founder.jpg" alt="Founder Name" loading="lazy"/>
</div>
```

Image specs: `400×533px` (3:4 ratio), JPG/WebP, under 150KB each.

---

## 🏫 Adding More School Logos

Copy a school card block in the `#schools` section and update:

```html
<div class="school-card reveal" data-delay="0">
  <div class="sc-logo-wrap">
    <div class="sc-logo-placeholder">
      <img src="assets/schools/school-name.png" alt="School Name"/>
    </div>
    <div class="sc-overlay"><span>View Profile →</span></div>
  </div>
  <div class="sc-info">
    <h4>School Name</h4>
    <p>City, State</p>
    <span class="sc-status active">Active Partner</span>
  </div>
</div>
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#080a10` |
| Surface | `rgba(255,255,255,0.042)` |
| Accent (Sky) | `#38bdf8` |
| Warm Accent | `#f97316` |
| Display Font | Cormorant Garamond |
| Body Font | DM Sans |

To change the accent colour globally, update one line in `style.css`:
```css
--sky: #38bdf8;  /* change to any color */
```

---

## 🌍 Deployment (Free Options)

| Platform | Steps |
|----------|-------|
| **Netlify Drop** | Go to netlify.com/drop → drag the folder → live in 30s |
| **Vercel** | `npx vercel` in folder → auto-deploys |
| **GitHub Pages** | Push to GitHub → Settings → Pages → Deploy from `/root` |
| **Cloudflare Pages** | Connect GitHub → automatic CDN deployment |

**Recommended**: Netlify (easiest) or Cloudflare Pages (fastest CDN globally).

---

## ✅ Feature Checklist

| Feature | Status |
|---------|--------|
| Instagram link (navbar + footer) | ✅ |
| LinkedIn link (navbar + footer) | ✅ |
| Email updated to info@lupexspace.com | ✅ |
| Satellite references removed | ✅ |
| Goals: 1,00,000 students + 200 institutions | ✅ |
| Roadmap: 2026, 2027, 2028, 2030 | ✅ |
| Est. 2025 | ✅ |
| Collaborated Schools section | ✅ |
| SND Public School, Palwal, Haryana | ✅ |
| Founders section (3 cards) | ✅ |
| Hover zoom + overlay + role text | ✅ |
| Glowing orbital rings (3D depth) | ✅ |
| Premium animations (reveal, parallax, tilt) | ✅ |
| Mobile hamburger (fixed, smooth) | ✅ |
| Responsive (320px–4K) | ✅ |
| Custom cursor with lag ring | ✅ |
| Page progress bar | ✅ |
| Background music player | ✅ |
| Contact form (EmailJS + mailto fallback) | ✅ |
| Animated counters | ✅ |
| Shooting star canvas | ✅ |
| Social icons with hover animations | ✅ |
| Grain texture overlay | ✅ |
| SEO meta tags | ✅ |

---

© 2025 Lupex Space Pvt Ltd. Made in India 🇮🇳
