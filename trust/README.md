# நம்பிக்கை அறக்கட்டளை — Nambikkai Charitable Trust Website

A modern, responsive website for a charitable trust (அறக்கட்டளை). This is the
**Phase 1 (MVP)** build: an informational website that introduces the trust,
showcases its programs and activities, and provides ways to get in touch.

Built with **React + TypeScript + Vite** and plain CSS. The code is kept simple
and modular so that future developers can easily understand and extend it.

---

## ✨ Features

- **Six pages** — Home, About Us, Programs & Activities, Gallery, News & Events
  (with event detail pages), and Contact.
- **Multilingual** — English, Tamil, Telugu, Hindi, Malayalam, and Kannada, with
  a language selector in the header. The choice is remembered between visits and
  switches instantly. See [Multilingual support](#-multilingual-support).
- **Fully responsive** — works on desktop, tablet, and mobile.
- **Reusable components** — header, footer, cards, buttons, banners, lightbox.
- **Content-driven** — all text/data lives in `src/data/`, separate from the UI.
- **Accessible** — semantic HTML, skip link, keyboard-friendly menu and gallery.
- **No heavy dependencies** — only React and React Router.

---

## 🚀 Getting started

You need [Node.js](https://nodejs.org/) 18+ installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (with hot reload)
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

### Available scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the local development server.           |
| `npm run build`   | Type-check and build for production (`dist/`).|
| `npm run preview` | Preview the production build locally.         |
| `npm run lint`    | Check the code with Oxlint.                   |

---

## 📁 Project structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Routes (which URL shows which page)
├── index.css             # Global styles + design tokens (colours, spacing…)
│
├── data/                 # All site content — edit these to change text
│   ├── site.ts           # Trust name, contact details, social links
│   ├── navigation.ts     # Header/footer menu links
│   ├── about.ts          # Mission, vision, values, history, trustees
│   ├── programs.ts       # Programs & activities
│   ├── events.ts         # News, events, announcements
│   ├── gallery.ts        # Gallery photos and videos
│   └── stats.ts          # Home page impact numbers
│
├── lib/
│   └── format.ts         # Small helpers (e.g. date formatting)
│
├── components/
│   ├── layout/           # Header, Footer, Layout (shared shell)
│   ├── ui/               # Reusable pieces (cards, buttons, gallery, banner)
│   └── home/             # Sections used only on the Home page
│
└── pages/                # One file per page (Home, About, Contact, …)
```

Each component keeps its styles in a `.css` file next to it (e.g.
`Header.tsx` + `Header.css`), so styling is easy to find.

---

## ✏️ How to edit content

Most updates **do not require touching any UI code** — just edit the files in
`src/data/`:

- **Change the trust name, address, phone, email, or social links** →
  `src/data/site.ts`
- **Add or edit a program** → `src/data/programs.ts`
- **Add a news item or event** → `src/data/events.ts`
  (each event automatically gets its own detail page at `/news/<slug>`)
- **Add gallery photos** → drop the image into `public/gallery/` and add an
  entry in `src/data/gallery.ts`
- **Change the impact statistics** → `src/data/stats.ts`

To **add a whole new page**:

1. Create a file in `src/pages/`, e.g. `Donate.tsx`.
2. Add a `<Route>` for it in `src/App.tsx`.
3. Add a link in `src/data/navigation.ts`.

To **change the colours/fonts**, edit the design tokens (CSS variables) at the
top of `src/index.css`.

---

## 📝 Notes on placeholder content

This MVP ships with **sample/placeholder content** so every section is visible.
Before going live, replace:

- The trust name, tagline, and contact details in `src/data/site.ts`.
- Registration/legal numbers in `src/data/site.ts` and on the About page.
- Placeholder gallery images in `public/gallery/` with real photos.
- The Google Maps location (`mapEmbedUrl` in `src/data/site.ts`).
- The sample YouTube videos in `src/data/gallery.ts`.

**Contact form:** in Phase 1 the form shows a thank-you message but does not yet
send anything. To make it live, connect it to an email service (e.g. Formspree,
EmailJS) or your own API inside `handleSubmit` in `src/pages/Contact.tsx`.

---

## 💚 Donation system

Visitors can donate **without any payment gateway** — by UPI, by scanning a QR
code, or by direct bank transfer — and then submit a short confirmation form.
Administrators verify and manage those confirmations from a simple dashboard.

- **Donate page** (`/donate`) — hero appeal, donation causes, the three ways to
  give (UPI / QR / bank), a confirmation form, and public transparency figures.
  Reached from the **Donate** button in the header.
- **Admin dashboard** (`/admin`) — search, filter, view payment screenshots, and
  set each donation's status to *Pending / Verified / Rejected*.

### Where the code lives

```
src/data/donation.ts                     # ← edit UPI, QR, bank, categories here
src/lib/donations.ts                     # storage + reference numbers (localStorage)
src/components/donation/                  # page sections (hero, UPI, QR, bank, form…)
src/components/ui/CopyButton.tsx          # reusable "copy to clipboard" button
src/pages/Donate.tsx / Donate.css         # the public donation page
src/pages/Admin.tsx / Admin.css           # the admin dashboard
public/donation/upi-qr.svg               # ← replace with the real QR image
```

All donation text is translated like the rest of the site — the keys live under
`donate.*` and `admin.*` in `src/i18n/locales/`.

### How to update the donation details

Everything below is edited in **`src/data/donation.ts`** — no UI code changes.

| To change…            | Do this                                                        |
| --------------------- | -------------------------------------------------------------- |
| **UPI ID**            | Edit `upiId` (and `upiPayeeName`).                             |
| **QR code image**     | Replace `public/donation/upi-qr.svg` with the real QR (keep the file name, or point `qrImage` at a new file — a square PNG/SVG ≥ 512×512 scans best). |
| **Bank details**      | Edit the `bank` object (account name/number, bank, branch, IFSC, type). |
| **Donation categories** | Add/remove entries in `donationCategories`, then add the matching title + description to **every** locale file under `donate.categories.items.<id>`. |
| **Admin passcode**    | Edit `adminPasscode` (see the security note below).           |

### Donation verification workflow

1. A donor pays via UPI / QR / bank, then fills in the **confirmation form** on
   `/donate` (name, mobile, email, amount, category, method, transaction
   reference, date, optional notes, optional screenshot).
2. On submit, the confirmation is saved and the donor gets a **reference
   number** (e.g. `TRUST-20260701-4821`) to quote later.
3. An admin opens `/admin`, enters the passcode, and reviews the list. Each new
   donation starts as **Pending Verification**.
4. The admin checks the payment (e.g. against the bank statement, using the
   transaction reference and screenshot) and marks it **Verified** or
   **Rejected**. The status can be changed again at any time.

### Managing uploaded payment screenshots

Screenshots are **optional**, limited to **JPG/PNG up to 1 MB**, and stored
inline with the donation (as a data URL). In the admin dashboard, click **View
screenshot** on a row to see the proof in a pop-up. Keeping images small avoids
filling the browser's storage.

### ⚠️ Important: no backend yet (Phase 1)

Like the contact form, the donation system currently has **no server**.
Submissions and the admin passcode live in the **browser** (`localStorage` /
`sessionStorage`), so:

- Data is stored **only in the browser that submitted it** — it is not shared
  between devices, and the admin dashboard only sees donations made on the same
  browser. This is fine for a demo/MVP.
- The admin passcode is a **light gate only**, not real security.

**Before going live with real donors**, move submissions to a real backend/API
and protect `/admin` with server-side authentication. Only two files talk to
storage — swap the read/write helpers in `src/lib/donations.ts` and the passcode
check in `src/pages/Admin.tsx`, and the rest of the UI stays the same.

## 🌍 Multilingual support

The site ships in six languages: **English, Tamil (தமிழ்), Telugu (తెలుగు),
Hindi (हिन्दी), Malayalam (മലയാളം), and Kannada (ಕನ್ನಡ)**.

- A **language selector** sits in the header (a globe icon + dropdown).
- The selection is saved to `localStorage` and **restored on the next visit**.
- Switching is **instant** — no page reload.
- All translatable text lives in `src/i18n/locales/` — nothing is hard-coded in
  components.

**To translate or add text**, edit the locale files in `src/i18n/locales/`.
**To add a new language**, follow the short guide in
[`src/i18n/README.md`](src/i18n/README.md). The English file (`en.ts`) is the
source of truth, and TypeScript fails the build if any language is missing a key.

## 🌐 Deployment

Build the site, then upload the generated `dist/` folder to any static host.

```bash
npm run build      # outputs to dist/
```

Because this is a single-page app, the host must serve `index.html` for unknown
routes (so deep links like `/about` work on refresh). Config files for the two
most common hosts are already included:

- **Netlify** — drag-and-drop the `dist/` folder, or connect the repo.
  `public/_redirects` handles routing. Build command: `npm run build`,
  publish directory: `dist`.
- **Vercel** — import the repo; `vercel.json` handles routing. Vercel detects
  the Vite framework automatically.
- **Other static hosts** — configure a fallback so all paths serve
  `index.html`.

---

## 🛠️ Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build tool & dev server)
- [React Router](https://reactrouter.com/) (page navigation)
- Plain CSS with custom properties (design tokens) — no CSS framework.
