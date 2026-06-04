import React from 'react'

/**
 * Koya brand lockup — gold mark + wordmark — shown on the Payload admin login screen.
 * Gradient ids namespaced (koyaLogo*) to avoid collisions with the nav Icon.
 */
export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <svg
        width="56"
        height="56"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Koya"
      >
        <defs>
          <linearGradient id="koyaLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0D060" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#A88520" />
            <stop offset="100%" stopColor="#C9A030" />
          </linearGradient>
          <linearGradient id="koyaLogoGoldBack" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C9A030" />
            <stop offset="60%" stopColor="#8B6500" />
            <stop offset="100%" stopColor="#6B4F00" />
          </linearGradient>
          <mask id="koyaLogoFront">
            <circle cx="38" cy="42" r="22" fill="white" />
            <circle cx="48" cy="42" r="15" fill="black" />
          </mask>
          <mask id="koyaLogoBack">
            <circle cx="46" cy="42" r="20" fill="white" />
            <circle cx="55" cy="37" r="14" fill="black" />
          </mask>
        </defs>
        <circle cx="46" cy="42" r="20" fill="url(#koyaLogoGoldBack)" mask="url(#koyaLogoBack)" />
        <circle cx="38" cy="42" r="22" fill="url(#koyaLogoGold)" mask="url(#koyaLogoFront)" />
      </svg>
      <span
        style={{
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--theme-text, #f5f0e8)',
        }}
      >
        Koya
      </span>
    </div>
  )
}
