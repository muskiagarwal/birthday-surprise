// ─────────────────────────────────────────────────────────────────────────────
//  💖  EDIT EVERYTHING HERE  💖
//  This is the only file you need to touch to personalize the surprise.
//  Photos & illustrations live in /public — see the README for how to swap them.
// ─────────────────────────────────────────────────────────────────────────────

const config = {
  // 4-digit PIN that unlocks the experience.
  secretCode: '1906',

  // Shown in headings and the letter sign-off.
  recipientName: 'Bestie',

  // The handwritten letter on the scrapbook screen.
  letterText:
    'Happy birthday bestie! I know I always say this to you, but I really do miss you. Thank you for being such an amazing friend and for always being there for me.',

  // Photos used in the polaroid + scrapbook screens.
  // Drop your images in /public/photos and reference them with a leading slash.
  photos: ['/photos/1.jpg', '/photos/2.jpg'],

  // YouTube video ID (the part after "watch?v=") for the final song screen.
  // e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  'dQw4w9WgXcQ'
  youtubeId: '4NRXx6U8ABQ',

  // Number of lit candles on the cake.
  candleCount: 18,

  // Caption under the developed polaroid photo.
  polaroidCaption: 'Who is this gorgeous?? 😍',

  // The three gifts on the "Choose a gift" screen.
  // The camera reveals photos[0]; the bottle & star show their `note` text.
  gifts: {
    camera: {
      // Short line shown before the polaroid screen.
      note: 'A little memory of us 📸',
    },
    bottle: {
      title: 'A message in a bottle 🍾',
      note: 'No matter the distance, you are always one of my favorite people. Sending a whole ocean of love your way. 🌊💌',
    },
    star: {
      title: 'A wish upon a star ⭐',
      note: 'I named a star after you — the brightest one. Make a wish, bestie; you deserve every single one to come true. ✨',
    },
  },

  // Final sign-off under the song.
  signoff: 'Your bestie always 💛',
}

export default config
