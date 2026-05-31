# Cephas Creations Website

## ⚡ Quick Start (first time)

```bash
npm install
npm run dev
```

Open http://localhost:5173 — you should see the site.

---

## 🔧 THINGS YOU MUST SET BEFORE GOING LIVE

### 1. EmailJS (FREE — sends form to owner's email)

1. Go to https://www.emailjs.com and create a free account
2. Add a new **Email Service** (connect your Gmail) → copy the **Service ID**
3. Create a new **Email Template** — use these variables in the template body:

```
New Enquiry — Cephas Creations

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}

Service Requested: {{department}}
Budget Range: {{budget}}
Project Location: {{location}}
Desired Timeline: {{timeline}}
How They Heard About Us: {{hear_about}}

Project Description:
{{description}}
```

4. Copy the **Template ID**
5. Go to Account > API Keys → copy your **Public Key**
6. Open `src/components/Contact.jsx` and fill in:

```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
```

---

### 2. Owner WhatsApp Number

In BOTH of these files, replace `2348000000000` with the owner's real number (country code, no + or spaces):

- `src/components/Contact.jsx`
- `src/components/WhatsAppButton.jsx`
- `src/components/Footer.jsx`

Example: for +234 812 345 6789, use `2348123456789`

---

### 3. Calendly (FREE — calendar booking)

1. Go to https://calendly.com and create a free account with the owner's email
2. Set availability (e.g. Mon–Fri 9am–5pm)
3. Copy the Calendly profile URL (looks like: https://calendly.com/cephascreations)
4. Open `src/components/Contact.jsx` and fill in:

```js
const CALENDLY_URL = 'https://calendly.com/YOUR_USERNAME'
```

---

### 4. Update Real Business Info

In `index.html`:
- Replace phone number in the JSON-LD schema
- Replace email address

In `src/components/Footer.jsx`:
- Replace email address
- Replace phone number
- Replace WhatsApp number

---

## 🚀 Deploy to Vercel (FREE hosting)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cephas-creations.git
git push -u origin main

# 2. Go to vercel.com
# 3. Click "Add New Project"
# 4. Import your GitHub repo
# 5. Set these build settings:
#    Framework: Vite
#    Build Command: npm run build
#    Output Directory: dist
# 6. Click Deploy
```

The `vercel.json` file is already included — this fixes any 404 errors on page refresh.

---

## 🌐 Custom Domain

1. Buy domain on Namecheap or Cloudflare (~₦15,000–₦20,000/yr for .com)
2. In Vercel > your project > Settings > Domains
3. Add your domain and follow the DNS instructions

---

## 📁 File Map

```
src/
  components/
    Navbar.jsx         — sticky navigation with mobile menu
    Hero.jsx           — full-screen hero section
    About.jsx          — about + stats
    Departments.jsx    — 4 departments with tab switcher
    Contact.jsx        — enquiry form + Calendly booking
    WhatsAppButton.jsx — floating WhatsApp chat button
    Footer.jsx         — footer with links and contact info
  App.jsx              — puts it all together
  main.jsx             — entry point
  index.css            — global styles + Tailwind

index.html             — SEO meta tags + schema markup
vercel.json            — fixes 404 on Vercel
tailwind.config.js     — custom colors and fonts
```

---

## 💰 Running Cost

| Service  | Cost     |
|----------|----------|
| Vercel   | FREE     |
| EmailJS  | FREE (200 emails/month) |
| Calendly | FREE     |
| Domain   | ~₦15,000/year |

**No monthly subscription. No Lovable. Full control.**
