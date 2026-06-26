import { useState } from 'react'

// Resolve a config photo path against the app's base URL so it works whether
// the site is served from a domain root OR a project subpath (e.g. GitHub
// Pages at /birthday-surprise/). A leading "/" alone would wrongly point at
// the domain root, so we strip it and prefix import.meta.env.BASE_URL.
function resolveSrc(src) {
  if (!src) return src
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src
  return import.meta.env.BASE_URL + src.replace(/^\//, '')
}

// <img> with a cute pastel placeholder fallback when the photo is missing.
// Lets the experience look intentional before real photos are dropped in.
export default function PhotoFrame({ src, alt = '', className = '', style }) {
  const [failed, setFailed] = useState(false)
  const resolved = resolveSrc(src)

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
      src={resolved}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      style={style}
      draggable={false}
    />
  )
}
