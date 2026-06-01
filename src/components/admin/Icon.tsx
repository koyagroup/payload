import React from 'react'

/**
 * Koya gold mark — the brand emblem rendered in the Payload admin nav header.
 * Mirrors apps/web/public/logo-mark.svg (transparent). Gradient ids are namespaced
 * (koyaIcon*) so they never collide with the Logo lockup on the same page.
 */
export function Icon() {
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Koya"
    >
      <defs>
        <linearGradient id="koyaIconGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D060" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#A88520" />
          <stop offset="100%" stopColor="#C9A030" />
        </linearGradient>
        <linearGradient id="koyaIconGoldBack" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C9A030" />
          <stop offset="60%" stopColor="#8B6500" />
          <stop offset="100%" stopColor="#6B4F00" />
        </linearGradient>
        <mask id="koyaIconFront">
          <circle cx="38" cy="42" r="22" fill="white" />
          <circle cx="48" cy="42" r="15" fill="black" />
        </mask>
        <mask id="koyaIconBack">
          <circle cx="46" cy="42" r="20" fill="white" />
          <circle cx="55" cy="37" r="14" fill="black" />
        </mask>
      </defs>
      <circle cx="46" cy="42" r="20" fill="url(#koyaIconGoldBack)" mask="url(#koyaIconBack)" />
      <circle cx="38" cy="42" r="22" fill="url(#koyaIconGold)" mask="url(#koyaIconFront)" />
    </svg>
  )
}
