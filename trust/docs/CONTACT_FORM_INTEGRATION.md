# Forms → Google Sheets Integration

Form submissions are stored in a private Google Sheet via a Google Apps Script
Web App. No custom backend, no server to host, no database.

```
Visitor fills the form
        ↓
Client-side validation          src/utils/contactValidation.ts
        ↓
POST to the Web App             src/services/googleSheetsService.ts
        ↓
Validate + sanitise             google-apps-script/Code.gs
        ↓
Append a row                    private Google Sheet
        ↓
{ "success": true, … }
        ↓
Success panel, form cleared     src/pages/Contact.tsx
```

The contact form is wired up today. One script serves **every** form — see
[Adding another form](#adding-another-form).

The website code is complete. What remains is the one-time Google setup below,
which has to be done while signed in as the Trust's own Google account.

---

## Files

```
google-apps-script/
└── Code.gs                     The Web App script — paste into Apps Script

src/
├── config/
│   └── googleAppsScript.ts     Web App URL (from env) + request timeout
├── services/
│   ├── googleSheetsService.ts  The shared transport — every form uses it
│   └── contactService.ts       Shapes the contact form's payload
├── types/
│   ├── form.ts                 FormType, FormError, SubmitResult — shared
│   └── contact.ts              ContactForm, EMPTY_CONTACT_FORM
├── utils/
│   ├── validators.ts           Generic, reusable field rules
│   ├── contactValidation.ts    Contact rules built on validators.ts
│   └── errors.ts               Network / validation / unknown error builders
└── pages/
    └── Contact.tsx             The form, its states, and the submit handler
```

Validators return **i18n keys**, not English text, so messages work in all six
languages. The shared ones live under `forms.validation.*` and `forms.errors.*`
in `src/i18n/locales/*.ts`; translate them with `t()` from `useI18n`.

---

## Step 1 — The Google Sheet

The Trust's sheet is **`Trust Contact Enquiries`**:

<https://docs.google.com/spreadsheets/d/11m9mYchcwixtaH85cCsbEnwoKSAYnhz4YuRV2E2CEJo/edit>

The script creates each tab and its header row automatically on the first
submission, so there is nothing to set up by hand. The contact form lands in a
tab named **`Contact Enquiries`** with these columns:

| Date & Time | Name | Email | Phone | Subject | Message |
| --- | --- | --- | --- | --- | --- |

Leave the sheet **private** — do not use "Anyone with the link". The script runs
as the account that owns it, so the sheet never needs to be shared publicly.

## Step 2 — The Apps Script

From the sheet: **Extensions → Apps Script**. Name the project
`Trust Contact Form API`. Delete the placeholder `myFunction`, then paste the
entire contents of [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
Save.

Check the timezone constant near the top if the Trust is not in India:

```js
var TIMEZONE = 'Asia/Kolkata'
```

## Step 3 — Deploy as a Web App

**Deploy → New deployment → ⚙ → Web app**:

| Setting | Value |
| --- | --- |
| Execute as | **Me** (the sheet owner) |
| Who has access | **Anyone** |

Google will ask you to authorise the script, then warn that the app is
unverified — choose **Advanced → Go to … (unsafe)**. This is expected for a
private script you wrote yourself.

Copy the **Web app URL**. It ends in `/exec`:

```
https://script.google.com/macros/s/AKfycb…/exec
```

> "Who has access: Anyone" makes the *script* callable without a Google login —
> which is what lets the public contact form post to it. It does **not** make
> the sheet readable. Only the Trust's account can open the spreadsheet.

## Step 4 — Store the URL

Copy `.env.example` to `.env` (git-ignored) and paste the URL:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb…/exec
```

Restart `npm run dev` — Vite only reads env files at startup.

The URL is read in exactly one place, `src/config/googleAppsScript.ts`. Never
hardcode it in a component or service.

---

## Testing

### Locally

1. `npm run dev`, open <http://localhost:5173/contact>.
2. Submit the form with real-looking values.
3. The spinner appears, then the "Thank you!" panel, and a new row lands in the
   sheet within a second or two.

Quick check that the deployment itself is alive — open the `/exec` URL in a
browser. A working deployment replies:

```json
{"success":true,"message":"Trust forms endpoint is running."}
```

You can also test the script without the website:

```bash
curl -L -X POST "$VITE_GOOGLE_SCRIPT_URL" \
  -H 'Content-Type: text/plain;charset=utf-8' \
  -d '{"formType":"contact","name":"Test User","email":"test@example.com","phone":"9876543210","subject":"Test","message":"Hello"}'
```

`-L` matters — Apps Script redirects `/exec` to its content host.

### In production

Vite inlines `VITE_*` values **at build time**, so the variable must exist on
the host, not just on your laptop:

- **Netlify:** Site configuration → Environment variables → add
  `VITE_GOOGLE_SCRIPT_URL` → redeploy.
- **Vercel:** Project → Settings → Environment Variables → add it for
  Production (and Preview, if you test there) → redeploy.

A redeploy is required after any change to the value. Then submit the live form
once and confirm the row appears.

---

## Managing the sheet

**Permissions.** Keep the sheet private. Share it (**Share** button) only with
the Trust accounts that need to read enquiries, as **Editor** or **Viewer**.
The script runs as whoever deployed it — if that person loses access to the
account, redeploy from an account that owns the sheet.

**Downloading as Excel.** Open the sheet and choose
**File → Download → Microsoft Excel (.xlsx)**. The file downloads with every
row as it stands. To export a single form's data, open that tab first — the
download includes all tabs, so delete the others in Excel if you need just one.

**Pausing submissions.** **Deploy → Manage deployments → Archive**.

---

## Adding another form

One Apps Script serves every form. To add a Volunteer, Sponsorship, Donation
Enquiry, or Event Registration form:

**1. Register it in `google-apps-script/Code.gs`** — add an entry to `FORMS`,
then redeploy as a new version:

```js
volunteer: {
  sheet: 'Volunteers',                                    // its own tab
  fields: ['name', 'email', 'phone', 'interest'],         // column order
  required: ['name', 'email', 'phone', 'interest'],
  formats: { email: 'email', phone: 'phone' },
  labels: { interest: 'Area of Interest' },               // header text
},
```

The tab and its header row are created on the first submission.

**2. Add the name to `FormType`** in `src/types/form.ts`.

**3. Add a service** alongside `contactService.ts` — build the values, then
hand them to the shared transport:

```ts
export function submitVolunteerForm(form: VolunteerForm): Promise<SubmitResult> {
  return submitToGoogleSheet('volunteer', {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    interest: form.interest.trim(),
  })
}
```

Reuse `src/utils/validators.ts` for the field rules and `src/utils/errors.ts`
for the failure shapes — both are form-agnostic. The error and validation
messages under `forms.*` in the locale files are shared too.

---

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Error message on every submit; console says `VITE_GOOGLE_SCRIPT_URL is not set` | No `.env` locally, or the variable is missing on the host. Add it and restart / redeploy. |
| Console shows a CORS error | The URL is wrong or the deployment is not public. Confirm it ends in `/exec` (not `/dev`) and that access is set to **Anyone**. |
| Rows stopped appearing after a script edit | Apps Script serves the last **deployed** version, not the last saved one. Deploy → Manage deployments → edit → New version. |
| Error message, and the `/exec` URL returns an HTML login page | Access is set to "Anyone with a Google Account" instead of **Anyone**. |
| `Unknown form type` in the console | The `formType` sent by the service has no entry in `FORMS`. Add it and redeploy. |
| Submission succeeds but no row appears | Open Apps Script → **Executions** to see the failure. |
| Timestamps in the wrong timezone | Change `TIMEZONE` in `Code.gs` and redeploy. |
| Form hangs, then errors | The request timed out after 10s (`requestTimeoutMs` in `src/config/googleAppsScript.ts`). Usually a cold start or slow network — retry. |

Apps Script's own logs live under **Executions** in the script editor. That's
the first place to look when a submission is accepted by the browser but never
reaches the sheet.

---

## Notes for developers

**Why the request body is `text/plain`.** Sending `Content-Type: application/json`
makes the browser send a CORS preflight `OPTIONS` request first, and Apps Script
cannot answer it — the request fails before it ever runs. `text/plain` is a
CORS-safelisted content type, so the POST goes straight through. The body is
still JSON, and `Code.gs` parses it with `JSON.parse`.

**Why not `mode: 'no-cors'`.** It would also avoid the preflight, but it makes
the response opaque — the form could not tell success from failure and would
show "Thank you!" even when the enquiry was lost.

**Security.** No Google credentials exist in the frontend; the only public value
is the Web App URL, which can do nothing but append a row. `Code.gs` re-validates
every field server-side (never trusting the client), caps field lengths, and
prefixes any value starting with `=`, `+`, `-` or `@` with an apostrophe so it
cannot be interpreted as a spreadsheet formula. A `LockService` lock serialises
concurrent writes. On the client, a ref guard plus the disabled button prevents
duplicate submissions from repeated clicks.

**A public endpoint invites spam.** The script accepts any well-formed
submission. If junk rows become a problem, the usual next step is a honeypot
field — the donation form already has one worth copying
(`src/components/donation/ConfirmationForm.tsx`).
