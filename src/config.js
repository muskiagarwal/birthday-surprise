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
    "You are an amazing friend. Thank you for always being there — I really do miss our college days. Come see me soon! And let's skip the whole \"I miss you\" thing; just know how grateful I am for you. I don't say it enough, but I'm so grateful for our friendship. And thank you for introducing me to the best song ever 💛",

  // Photos used in the polaroid + scrapbook screens.
  // Drop your images in /public/photos and reference them with a leading slash.
  // Currently just the plushie (2.jpg). Add the dancing photo as 1.jpg later and
  // set this to ['/photos/1.jpg', '/photos/2.jpg'] to show both.
  photos: ['/photos/2.jpg'],

  // YouTube video ID (the part after "watch?v=") for the final song screen.
  // e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  'dQw4w9WgXcQ'
  // "Yellow Paper Daisy" — When Chai Met Toast (official video)
  youtubeId: 'RshlH3T27U4',

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
