# 🎀 Birthday Surprise

A single-page, password-locked birthday surprise for someone you love. The
recipient enters a secret PIN, then walks through a sequence of cute animated
screens — a birthday reveal, blowing out candles, choosing a gift, a developing
polaroid, a scrapbook letter — and lands on a song you picked just for them.

Soft pink scrapbook aesthetic. Built with **Vite + React + Tailwind + Framer
Motion**. No backend — it builds to a static folder you can host anywhere.

---

## Quick start

```bash
npm install
npm run dev      # local dev server (usually http://localhost:5173)
```

Then build for deploy:

```bash
npm run build    # outputs static files to ./dist
npm run preview  # preview the production build locally
```

---

## ✏️ Personalizing it — edit ONE file

Everything you'd want to change lives in [`src/config.js`](src/config.js):

| Field            | What it does                                                        |
| ---------------- | ------------------------------------------------------------------- |
| `secretCode`     | The 4-digit PIN that unlocks the surprise (default `1225`).         |
| `recipientName`  | Their name / nickname, shown in headings and the letter.            |
| `letterText`     | The handwritten letter on the scrapbook screen.                     |
| `photos`         | Array of photo paths, e.g. `['/photos/1.jpg', '/photos/2.jpg']`.    |
| `youtubeId`      | The song for the final screen (the `v=...` part of a YouTube URL).  |
| `candleCount`    | How many candles are on the cake.                                   |
| `polaroidCaption`| Caption under the developed polaroid.                               |
| `gifts`          | The notes behind the bottle 🍾 and star ⭐, plus the camera’s memory.|
| `signoff`        | Your sign-off line under the letter and song.                       |

### Set the PIN

```js
secretCode: '1225',   // change to any 4 digits
```

### Add photos

1. Drop image files into `public/photos/` (e.g. `1.jpg`, `2.jpg`).
2. Reference them in `config.js` with a **leading slash**:

```js
photos: ['/photos/1.jpg', '/photos/2.jpg'],
```

Until you add real photos, each photo slot shows a cute pink placeholder, so
nothing looks broken.

### Change the message

```js
letterText: 'Happy birthday babe! ...',
```

### Set the song

Take the YouTube URL `https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`** and put
just the ID in config:

```js
youtubeId: 'dQw4w9WgXcQ',
```

> Note: some browsers block autoplay with sound until the user interacts. If the
> song doesn't auto-start, the recipient can just tap play.

---

## 🎨 Swapping the artwork

The characters, cake, and camera are drawn as **inline SVG** components in
`src/components/` (`Character.jsx`, `Cake.jsx`, and the camera inside
`PolaroidReveal.jsx`). To use your own art instead, drop files into
`public/illustrations/` and replace the inline `<svg>` with an `<img>` — see
[`public/illustrations/README.md`](public/illustrations/README.md).

Please don't use Snoopy or any branded/trademarked character.

---

## 🌬️ "Blow the candles" — the mic bonus

On the *Make a wish* screen there's a **BLOW** button that always works. If the
recipient grants microphone permission, the app also listens for a real blow
(a volume spike) and extinguishes the candles for real. Mic blocked or
unsupported? The button is the fallback — no setup needed.

---

## 🚀 Deploy

The site is fully static (`npm run build` → `dist/`). Asset paths are relative,
so it works on Vercel, Netlify, and GitHub Pages without extra config.

### Vercel (recommended)

**Option A — dashboard**
1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Done — you'll get a shareable URL.

**Option B — CLI**
```bash
npm i -g vercel
vercel          # follow prompts; accept the Vite defaults
vercel --prod   # deploy to production
```

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

Or drag-and-drop the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

### GitHub Pages

```bash
npm run build
npx gh-pages -d dist     # or commit dist/ to a gh-pages branch
```

Relative asset paths are already configured (`base: './'` in
`vite.config.js`), so it works from a project subpath.

---

## 🗂️ Project structure

```
src/
  config.js                 ← edit everything here
  App.jsx                   ← screen state machine + transitions
  confetti.js               ← celebration bursts
  hooks/useBlowDetection.js ← optional mic blow detection
  components/
    Background.jsx           floating hearts + sparkles
    Character.jsx  Cake.jsx  PhotoFrame.jsx
    ui/Button.jsx
    screens/
      LockScreen.jsx         1. PIN lock (heart number pad)
      BirthdayReveal.jsx     2. "HAPPY BIRTHDAY!"
      MakeAWish.jsx          3. blow the candles
      LoveMessage.jsx        4. "Happy Birthday my love"
      ChooseGift.jsx         5. camera / bottle / star
      PolaroidReveal.jsx     6. developing polaroid
      ScrapbookLetter.jsx    7. scrapbook + handwritten letter
      FinalSong.jsx          8. the song
public/
  photos/         ← your photos
  illustrations/  ← swap-in art
```

Made with 💕
