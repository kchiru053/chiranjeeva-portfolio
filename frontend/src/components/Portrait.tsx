import { useId } from 'react';
import { profile } from '../data/portfolio';

type Props = { className?: string; sizes?: string; alt?: string; loading?: 'lazy' | 'eager' };

/**
 * Shows the photo from `profile.portrait` when one is set, otherwise a monogram
 * (the initials in the series' title font). Classes are passed straight through,
 * so it can replace an <img> anywhere in the layout.
 */
export default function Portrait({ className, sizes, alt, loading }: Props) {
  const p = profile.portrait;
  const uid = useId().replace(/:/g, '');
  if (p) {
    return <img src={p.src} srcSet={p.srcSet} sizes={sizes} alt={alt ?? p.alt} loading={loading} className={className} />;
  }
  const decorative = alt === '';
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt ?? `Monogram of ${profile.displayName}`}
      aria-hidden={decorative || undefined}
    >
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff3d5a" />
          <stop offset="0.65" stopColor="#c20f2a" />
          <stop offset="1" stopColor="#4a0914" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="290" r="180" fill="none" stroke="rgba(255,61,90,0.28)" strokeWidth="1.5" />
      <circle cx="200" cy="290" r="140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text
        x="200"
        y="420"
        textAnchor="middle"
        fontFamily="'Bebas Neue', Impact, 'Oswald', sans-serif"
        fontSize="330"
        textLength="270"
        lengthAdjust="spacingAndGlyphs"
        fill={`url(#${uid}-fill)`}
      >
        {profile.initials}
      </text>
    </svg>
  );
}
