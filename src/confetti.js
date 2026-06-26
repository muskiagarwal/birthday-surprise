import confetti from 'canvas-confetti'

const PINKS = ['#FF6FA5', '#F8C8DC', '#FFD86B', '#E14B6A', '#FFFFFF']

// A celebratory burst from both bottom corners, tuned pink.
export function celebrate() {
  const end = Date.now() + 900

  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.9 },
      colors: PINKS,
      scalar: 1.1,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.9 },
      colors: PINKS,
      scalar: 1.1,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()

  // a single big pop in the middle
  confetti({
    particleCount: 120,
    spread: 100,
    startVelocity: 38,
    origin: { x: 0.5, y: 0.6 },
    colors: PINKS,
    scalar: 1.2,
  })
}

// Soft heart-shaped confetti drizzle (used on the reveal screen).
export function heartsBurst() {
  const heart = confetti.shapeFromText
    ? confetti.shapeFromText({ text: '💖', scalar: 2 })
    : undefined

  confetti({
    particleCount: 40,
    spread: 80,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.5 },
    colors: PINKS,
    shapes: heart ? [heart] : undefined,
    scalar: heart ? 2 : 1.2,
  })
}
