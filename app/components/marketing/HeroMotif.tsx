/**
 * Hero emblem - the logo's mountain + river "S" rendered as an architect's
 * elevation drawing: topographic contours, a summit range, and the single teal
 * river contour (the one accent). Token-colored, correct in both themes,
 * purely decorative.
 */
export function HeroMotif({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ss-emblem-fade" cx="52%" cy="46%" r="60%">
          <stop offset="55%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="ss-emblem-mask">
          <rect width="520" height="520" fill="url(#ss-emblem-fade)" />
        </mask>
      </defs>

      <g mask="url(#ss-emblem-mask)">
        {/* topographic contour rings */}
        <g stroke="var(--border-strong)" strokeWidth="1" opacity="0.55" fill="none">
          <circle cx="300" cy="250" r="228" />
          <circle cx="300" cy="250" r="182" />
          <circle cx="300" cy="250" r="136" />
          <circle cx="300" cy="250" r="92" />
        </g>

        {/* meridian arc - a quiet nod to the globe/diplomacy */}
        <ellipse
          cx="300"
          cy="250"
          rx="92"
          ry="228"
          stroke="var(--border-strong)"
          strokeWidth="1"
          opacity="0.45"
          fill="none"
        />

        {/* summit range */}
        <g
          stroke="var(--midblue-500)"
          strokeWidth="2.25"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.92"
          fill="none"
        >
          <path d="M132 372 L214 214 L272 300 L352 158 L468 372" />
        </g>
        {/* baseline */}
        <path
          d="M120 372 L470 372"
          stroke="var(--border-strong)"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* the river "S" - the single teal accent */}
        <path
          d="M176 408 C 306 372, 248 300, 300 262 C 352 224, 300 172, 404 146"
          stroke="var(--accent)"
          strokeWidth="3.25"
          strokeLinecap="round"
          fill="none"
        />

        {/* summit node */}
        <circle cx="352" cy="158" r="5.5" fill="var(--accent)" />
        <circle
          cx="352"
          cy="158"
          r="11"
          stroke="var(--accent)"
          strokeWidth="1.25"
          opacity="0.5"
          fill="none"
        />
      </g>
    </svg>
  );
}

/**
 * Whisper-quiet blueprint backdrop behind the hero - a survey grid that reads
 * as "digital infrastructure / architecture". Edge-masked, low opacity, both
 * themes. Decorative.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 600"
      fill="none"
    >
      <defs>
        <pattern
          id="ss-grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0 H0 V48"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="ss-grid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="70%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="ss-grid-mask">
          <rect width="1200" height="600" fill="url(#ss-grid-fade)" />
        </mask>
      </defs>
      <rect
        width="1200"
        height="600"
        fill="url(#ss-grid)"
        mask="url(#ss-grid-mask)"
        opacity="0.5"
      />
    </svg>
  );
}
