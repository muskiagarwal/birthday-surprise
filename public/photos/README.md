# Photos

Put the photos you want to show here, then point `src/config.js` at them.

By default `config.js` expects:

- `1.jpg` → shown in the developing **polaroid** + the **scrapbook** collage
- `2.jpg` → second photo in the **scrapbook** collage

```js
// src/config.js
photos: ['/photos/1.jpg', '/photos/2.jpg'],
```

Reference them with a **leading slash** (`/photos/1.jpg`) — files in `public/`
are served from the site root.

Until you add real photos, the site shows a cute pink 📸 placeholder card in
each photo slot, so nothing looks broken. Any image format works (`.jpg`,
`.png`, `.webp`) — just match the filename/extension in `config.js`.
