/**
 * GOLIS Logo SVG components
 * Based on the brand logo: 3D G-mark + metallic GOLIS wordmark with blue accent dot on I
 *
 * Usage:
 *   <GolisLogo />           — horizontal: G-mark + GOLIS wordmark (navbar)
 *   <GolisLogo stacked />   — stacked: G-mark above GOLIS wordmark (hero / footer large)
 *   <GolisIcon />           — G-mark icon only (favicon, small contexts)
 *   <GolisWordmark />       — GOLIS text only (footer compact)
 */

import styles from './Logo.module.css';

interface LogoProps {
  stacked?: boolean;
  /** Size multiplier — 1 = default navbar size */
  scale?: number;
  className?: string;
}

/** The 3D G-mark — a stylised arc/C shape with metallic-to-blue gradient and inner bar */
export function GolisIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  const id = `golis-g-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GOLIS icon"
      className={className}
    >
      <defs>
        {/* Outer arc gradient: silver-white top → vivid blue bottom */}
        <linearGradient id={`${id}-outer`} x1="20" y1="5" x2="65" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#d0e8ff" />
          <stop offset="30%"  stopColor="#a8c8f0" />
          <stop offset="65%"  stopColor="#1e6fd4" />
          <stop offset="100%" stopColor="#0a47b8" />
        </linearGradient>
        {/* Inner face gradient: blue-teal to deep blue */}
        <linearGradient id={`${id}-inner`} x1="35" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0a2d7a" />
        </linearGradient>
        {/* Shine on top edge */}
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.9)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
        {/* Glow filter */}
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer C/G arc — thick stroke path */}
      <path
        d="M78 22 C62 8, 30 8, 16 30 C4 50, 10 76, 30 87 C50 98, 76 90, 84 72 L84 52 L55 52 L55 62 L72 62 C66 74, 50 80, 36 74 C20 66, 16 46, 24 32 C32 18, 52 14, 66 22 Z"
        fill={`url(#${id}-outer)`}
        filter={`url(#${id}-glow)`}
      />

      {/* Inner face of the G — slightly darker, creates 3D depth */}
      <path
        d="M72 26 C60 14, 36 14, 24 32 C14 48, 18 70, 34 80 C48 88, 68 84, 78 70 L78 54 L57 54 L57 62 L70 62 C64 72, 50 76, 38 70 C26 64, 22 48, 28 36 C36 22, 56 18, 70 26 Z"
        fill={`url(#${id}-inner)`}
      />

      {/* Top shine edge */}
      <path
        d="M78 22 C70 16, 60 12, 50 11 L48 20 C58 21, 66 25, 72 32 Z"
        fill={`url(#${id}-shine)`}
        opacity="0.85"
      />
    </svg>
  );
}

/** GOLIS wordmark: metallic white letters with blue accent dot on I */
export function GolisWordmark({ height = 28, light = false }: { height?: number; light?: boolean }) {
  const id = `golis-wm-${Math.random().toString(36).slice(2, 7)}`;
  const letterFill = light ? '#0d1220' : `url(#${id}-metal)`;

  return (
    <svg
      width={height * 4.2}
      height={height}
      viewBox="0 0 168 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Metallic silver-white gradient matching logo */}
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="45%"  stopColor="#d8e4f0" />
          <stop offset="100%" stopColor="#a8b8cc" />
        </linearGradient>
      </defs>

      {/* G */}
      <path
        d="M3 20C3 11.163 10.163 4 19 4C23.8 4 28.2 6.1 31.3 9.6L26.4 14.5C24.4 12.1 21.9 10.6 19 10.6C13.7 10.6 9.4 14.9 9.4 20C9.4 25.1 13.7 29.4 19 29.4C22.1 29.4 24.8 27.9 26.6 25.6H21V19H35V20C35 28.8 27.8 36 19 36C10.2 36 3 28.8 3 20Z"
        fill={letterFill}
      />

      {/* O */}
      <path
        d="M42 20C42 11.163 49.163 4 58 4C66.837 4 74 11.163 74 20C74 28.837 66.837 36 58 36C49.163 36 42 28.837 42 20ZM48.4 20C48.4 25.3 52.7 29.6 58 29.6C63.3 29.6 67.6 25.3 67.6 20C67.6 14.7 63.3 10.4 58 10.4C52.7 10.4 48.4 14.7 48.4 20Z"
        fill={letterFill}
      />

      {/* L */}
      <path d="M82 5H88.4V29.4H101V36H82V5Z" fill={letterFill} />

      {/* I — letter body */}
      <path d="M109 5H115.4V36H109V5Z" fill={letterFill} />
      {/* I — blue accent dot (replaces or sits above the i-dot visually) */}
      <rect x="109" y="0" width="6.4" height="6" rx="1.5" fill="#2563eb" />
      {/* Blue shimmer inside dot */}
      <rect x="110.2" y="0.8" width="2.4" height="2" rx="0.8" fill="#93c5fd" opacity="0.7" />

      {/* S */}
      <path
        d="M124 27C124 32.5 128.5 36 134 36H143C149 36 153.5 31.5 153.5 26C153.5 21.5 151 18.2 146.5 16.8L136.5 13.8C135 13.3 134.2 12.3 134.2 11C134.2 9.6 135.4 8.4 136.7 8.4H145C146.4 8.4 147.6 9.6 147.6 11V12.5H153.8V11C153.8 5.5 149.3 2 143 2H135C129 2 124.5 6.5 124.5 11.5C124.5 16 127 19.3 131.5 20.7L141.5 23.7C143 24.2 143.8 25.2 143.8 26.5C143.8 27.9 142.6 29.1 141.3 29.1H132C130.6 29.1 129.4 27.9 129.4 26.5V25H124V27Z"
        fill={letterFill}
      />
    </svg>
  );
}

/** Full horizontal logo: G icon + GOLIS wordmark side by side */
export function GolisLogo({ scale = 1, className = '', light = false }: LogoProps & { light?: boolean }) {
  return (
    <span className={`${styles.logoWrap} ${className}`} style={{ gap: `${10 * scale}px` }}>
      <GolisIcon size={36 * scale} />
      <GolisWordmark height={22 * scale} light={light} />
    </span>
  );
}

/** Stacked logo: G icon above GOLIS wordmark — for hero and footer */
export function GolisLogoStacked({ scale = 1, className = '' }: LogoProps) {
  return (
    <span className={`${styles.logoStacked} ${className}`}>
      <GolisIcon size={72 * scale} />
      <GolisWordmark height={28 * scale} />
    </span>
  );
}
