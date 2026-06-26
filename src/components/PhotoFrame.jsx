import { useState } from 'react'

// <img> with a cute pastel placeholder fallback when the photo is missing.
// Lets the experience look intentional before real photos are dropped in.
export default function PhotoFrame({ src, alt = '', className = '', style }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-blush to-hotpink/60 ${className}`}
        style={style}
      >
        <span className="text-4xl">📸</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      style={style}
      draggable={false}
    />
  )
}
