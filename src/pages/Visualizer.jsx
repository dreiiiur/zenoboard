import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiRefreshCw, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// ─── Each finish owns two pattern render functions ────────────────────────────
// • patternDefs(uid)      — furniture-scale patterns (absolute px, tiles look natural on large shapes)
// • swatchPatternDefs(uid) — swatch-scale patterns (same visual, scaled to fill a ~52px tile cleanly)
// • fill(uid)             — the url() fill reference
//
// The root cause of "tiny sliver" bugs: userSpaceOnUse tiles at their literal pixel size.
// A walnut pattern 64×80 drawn into a 52×52 swatch shows only a fraction of one tile.
// swatchPatternDefs use much smaller tile sizes so the texture reads clearly at small scale.

const finishes = [
  {
    id: 'white',
    name: 'White',
    label: 'Matte linen',
    stroke: '#C8C6C2',
    // Furniture scale — fine 8px linen weave
    patternDefs: (uid) => (
      <pattern id={`fp-${uid}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#F0EFED" />
        <line x1="0" y1="0" x2="8" y2="8" stroke="#DDDBD7" strokeWidth="0.5" opacity="0.7" />
        <line x1="0" y1="4" x2="4" y2="8" stroke="#DDDBD7" strokeWidth="0.35" opacity="0.5" />
        <line x1="4" y1="0" x2="8" y2="4" stroke="#DDDBD7" strokeWidth="0.35" opacity="0.5" />
      </pattern>
    ),
    // Swatch scale — same weave, identical (small enough already)
    swatchPatternDefs: (uid) => (
      <pattern id={`sp-${uid}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#F0EFED" />
        <line x1="0" y1="0" x2="8" y2="8" stroke="#DDDBD7" strokeWidth="0.6" opacity="0.7" />
        <line x1="0" y1="4" x2="4" y2="8" stroke="#DDDBD7" strokeWidth="0.4" opacity="0.5" />
        <line x1="4" y1="0" x2="8" y2="4" stroke="#DDDBD7" strokeWidth="0.4" opacity="0.5" />
      </pattern>
    ),
    fill: (uid) => `url(#fp-${uid})`,
    swatchFill: (uid) => `url(#sp-${uid})`,
  },
  {
    id: 'gray',
    name: 'Gray',
    label: 'Concrete',
    stroke: '#7A7A7A',
    patternDefs: (uid) => (
      <pattern id={`fp-${uid}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="#9B9B9B" />
        <rect x="1" y="0" width="1.2" height="1.2" fill="#7A7A7A" opacity="0.55" />
        <rect x="4" y="2" width="1" height="1" fill="#B8B8B8" opacity="0.5" />
        <rect x="0" y="4" width="1.2" height="1.2" fill="#7A7A7A" opacity="0.4" />
        <rect x="3" y="5" width="2" height="0.8" fill="#B8B8B8" opacity="0.4" />
        <rect x="2" y="1" width="0.8" height="2" fill="#888" opacity="0.25" />
      </pattern>
    ),
    swatchPatternDefs: (uid) => (
      <pattern id={`sp-${uid}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#9B9B9B" />
        <rect x="1" y="1" width="2" height="2" fill="#7A7A7A" opacity="0.5" />
        <rect x="6" y="3" width="2" height="2" fill="#B8B8B8" opacity="0.5" />
        <rect x="0" y="6" width="2.5" height="2" fill="#7A7A7A" opacity="0.4" />
        <rect x="5" y="8" width="3" height="1.5" fill="#B8B8B8" opacity="0.4" />
        <rect x="3" y="2" width="1.5" height="3" fill="#888" opacity="0.3" />
        <rect x="8" y="6" width="2" height="3" fill="#7A7A7A" opacity="0.35" />
      </pattern>
    ),
    fill: (uid) => `url(#fp-${uid})`,
    swatchFill: (uid) => `url(#sp-${uid})`,
  },
  {
    id: 'straight-oak',
    name: 'Straight Oak',
    label: 'Natural grain',
    stroke: '#9A6A40',
    patternDefs: (uid) => (
      <>
        <pattern id={`fp-${uid}-g`} x="0" y="0" width="5" height="1" patternUnits="userSpaceOnUse">
          <rect width="5" height="1" fill="#C4956A" />
          <rect x="0" y="0" width="1.4" height="1" fill="#B07850" opacity="0.55" />
          <rect x="2.5" y="0" width="0.7" height="1" fill="#D8A87C" opacity="0.45" />
          <rect x="4" y="0" width="0.4" height="1" fill="#B07850" opacity="0.3" />
        </pattern>
        <pattern id={`fp-${uid}`} x="0" y="0" width="44" height="66" patternUnits="userSpaceOnUse">
          <rect width="44" height="66" fill={`url(#fp-${uid}-g)`} />
          <ellipse cx="20" cy="24" rx="6" ry="3.5" fill="none" stroke="#9A6840" strokeWidth="0.6" opacity="0.45" />
          <ellipse cx="20" cy="24" rx="2.5" ry="1.4" fill="#9A6A40" opacity="0.28" />
          <ellipse cx="38" cy="52" rx="4" ry="2.2" fill="none" stroke="#9A6840" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </>
    ),
    // Swatch: 52×52 — vertical grain stripes scaled to ~6px wide, knot centered in tile
    swatchPatternDefs: (uid) => (
      <pattern id={`sp-${uid}`} x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
        <rect width="52" height="52" fill="#C4956A" />
        <rect x="0"  y="0" width="7"   height="52" fill="#B07850" opacity="0.55" />
        <rect x="11" y="0" width="4"   height="52" fill="#D8A87C" opacity="0.45" />
        <rect x="18" y="0" width="6"   height="52" fill="#B07850" opacity="0.4" />
        <rect x="27" y="0" width="4.5" height="52" fill="#D8A87C" opacity="0.4" />
        <rect x="35" y="0" width="6"   height="52" fill="#B07850" opacity="0.45" />
        <rect x="44" y="0" width="3.5" height="52" fill="#D8A87C" opacity="0.35" />
        <ellipse cx="26" cy="26" rx="10" ry="6" fill="none" stroke="#9A6840" strokeWidth="1.2" opacity="0.45" />
        <ellipse cx="26" cy="26" rx="4"  ry="2.5" fill="#9A6A40" opacity="0.3" />
      </pattern>
    ),
    fill: (uid) => `url(#fp-${uid})`,
    swatchFill: (uid) => `url(#sp-${uid})`,
  },
  {
    id: 'walnut',
    name: 'Walnut',
    label: 'Wave grain',
    stroke: '#4A2810',
    patternDefs: (uid) => (
      <pattern id={`fp-${uid}`} x="0" y="0" width="64" height="80" patternUnits="userSpaceOnUse">
        <rect width="64" height="80" fill="#6B4226" />
        <rect x="0"  y="0" width="1.3" height="80" fill="#3E2010" opacity="0.65" />
        <rect x="4"  y="0" width="0.8" height="80" fill="#85532E" opacity="0.45" />
        <rect x="8"  y="0" width="1.1" height="80" fill="#3E2010" opacity="0.55" />
        <rect x="13" y="0" width="0.7" height="80" fill="#85532E" opacity="0.4" />
        <rect x="17" y="0" width="1.2" height="80" fill="#3E2010" opacity="0.5" />
        <rect x="22" y="0" width="0.9" height="80" fill="#85532E" opacity="0.4" />
        <rect x="27" y="0" width="1.0" height="80" fill="#3E2010" opacity="0.55" />
        <rect x="32" y="0" width="0.7" height="80" fill="#85532E" opacity="0.35" />
        <rect x="36" y="0" width="1.3" height="80" fill="#3E2010" opacity="0.5" />
        <rect x="41" y="0" width="0.8" height="80" fill="#85532E" opacity="0.4" />
        <rect x="46" y="0" width="1.0" height="80" fill="#3E2010" opacity="0.45" />
        <rect x="51" y="0" width="0.7" height="80" fill="#85532E" opacity="0.35" />
        <rect x="56" y="0" width="1.2" height="80" fill="#3E2010" opacity="0.5" />
        <rect x="61" y="0" width="0.6" height="80" fill="#85532E" opacity="0.3" />
        <path d="M0 18 Q16 13 32 18 Q48 23 64 18" fill="none" stroke="#3A1E0A" strokeWidth="0.9" opacity="0.4" />
        <path d="M0 36 Q16 31 32 36 Q48 41 64 36" fill="none" stroke="#3A1E0A" strokeWidth="0.7" opacity="0.35" />
        <path d="M0 54 Q16 50 32 54 Q48 58 64 54" fill="none" stroke="#85532E" strokeWidth="0.6" opacity="0.3" />
        <path d="M0 72 Q16 68 32 72 Q48 76 64 72" fill="none" stroke="#3A1E0A" strokeWidth="0.5" opacity="0.28" />
      </pattern>
    ),
    // Swatch: 52×52 tile with visible grain stripes + wave curves
    swatchPatternDefs: (uid) => (
      <pattern id={`sp-${uid}`} x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
        <rect width="52" height="52" fill="#6B4226" />
        <rect x="0"  y="0" width="5.5" height="52" fill="#3E2010" opacity="0.65" />
        <rect x="8"  y="0" width="3.5" height="52" fill="#85532E" opacity="0.45" />
        <rect x="14" y="0" width="4.5" height="52" fill="#3E2010" opacity="0.55" />
        <rect x="21" y="0" width="3"   height="52" fill="#85532E" opacity="0.4" />
        <rect x="27" y="0" width="5"   height="52" fill="#3E2010" opacity="0.5" />
        <rect x="34" y="0" width="3.5" height="52" fill="#85532E" opacity="0.4" />
        <rect x="40" y="0" width="4.5" height="52" fill="#3E2010" opacity="0.55" />
        <rect x="47" y="0" width="3"   height="52" fill="#85532E" opacity="0.35" />
        <path d="M0 13 Q13 9 26 13 Q39 17 52 13"  fill="none" stroke="#3A1E0A" strokeWidth="1.5" opacity="0.4" />
        <path d="M0 27 Q13 23 26 27 Q39 31 52 27"  fill="none" stroke="#3A1E0A" strokeWidth="1.2" opacity="0.35" />
        <path d="M0 41 Q13 37 26 41 Q39 45 52 41"  fill="none" stroke="#85532E" strokeWidth="1"   opacity="0.3" />
      </pattern>
    ),
    fill: (uid) => `url(#fp-${uid})`,
    swatchFill: (uid) => `url(#sp-${uid})`,
  },
  {
    id: 'wenge',
    name: 'Wenge',
    label: 'Fine grain',
    stroke: '#1E0E06',
    patternDefs: (uid) => (
      <pattern id={`fp-${uid}`} x="0" y="0" width="32" height="60" patternUnits="userSpaceOnUse">
        <rect width="32" height="60" fill="#3B2314" />
        <rect x="0"   y="0" width="0.9" height="60" fill="#1A0C06" opacity="0.75" />
        <rect x="2.5" y="0" width="0.6" height="60" fill="#4F2E18" opacity="0.55" />
        <rect x="5"   y="0" width="0.8" height="60" fill="#1A0C06" opacity="0.65" />
        <rect x="8"   y="0" width="0.5" height="60" fill="#4F2E18" opacity="0.45" />
        <rect x="10.5" y="0" width="0.9" height="60" fill="#1A0C06" opacity="0.7" />
        <rect x="14"  y="0" width="0.6" height="60" fill="#4F2E18" opacity="0.5" />
        <rect x="17"  y="0" width="0.8" height="60" fill="#1A0C06" opacity="0.65" />
        <rect x="20"  y="0" width="0.5" height="60" fill="#4F2E18" opacity="0.4" />
        <rect x="22.5" y="0" width="0.9" height="60" fill="#1A0C06" opacity="0.7" />
        <rect x="26"  y="0" width="0.6" height="60" fill="#4F2E18" opacity="0.5" />
        <rect x="29"  y="0" width="0.8" height="60" fill="#1A0C06" opacity="0.6" />
        <line x1="0" y1="8"  x2="32" y2="8"  stroke="#150900" strokeWidth="0.45" opacity="0.55" />
        <line x1="0" y1="20" x2="32" y2="20" stroke="#150900" strokeWidth="0.35" opacity="0.45" />
        <line x1="0" y1="34" x2="32" y2="34" stroke="#4F2E18" strokeWidth="0.4"  opacity="0.35" />
        <line x1="0" y1="46" x2="32" y2="46" stroke="#150900" strokeWidth="0.35" opacity="0.4" />
        <line x1="0" y1="56" x2="32" y2="56" stroke="#4F2E18" strokeWidth="0.3"  opacity="0.3" />
      </pattern>
    ),
    // Swatch: 52×52 — wenge stripes scaled up to be clearly visible
    swatchPatternDefs: (uid) => (
      <pattern id={`sp-${uid}`} x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
        <rect width="52" height="52" fill="#3B2314" />
        <rect x="0"  y="0" width="4"   height="52" fill="#1A0C06" opacity="0.75" />
        <rect x="7"  y="0" width="2.5" height="52" fill="#4F2E18" opacity="0.55" />
        <rect x="12" y="0" width="3.5" height="52" fill="#1A0C06" opacity="0.65" />
        <rect x="18" y="0" width="2"   height="52" fill="#4F2E18" opacity="0.45" />
        <rect x="23" y="0" width="4"   height="52" fill="#1A0C06" opacity="0.7" />
        <rect x="30" y="0" width="2.5" height="52" fill="#4F2E18" opacity="0.5" />
        <rect x="35" y="0" width="3.5" height="52" fill="#1A0C06" opacity="0.65" />
        <rect x="41" y="0" width="2"   height="52" fill="#4F2E18" opacity="0.4" />
        <rect x="46" y="0" width="4"   height="52" fill="#1A0C06" opacity="0.7" />
        <line x1="0" y1="10" x2="52" y2="10" stroke="#150900" strokeWidth="1.2" opacity="0.55" />
        <line x1="0" y1="24" x2="52" y2="24" stroke="#150900" strokeWidth="0.9" opacity="0.45" />
        <line x1="0" y1="38" x2="52" y2="38" stroke="#4F2E18" strokeWidth="1"   opacity="0.35" />
        <line x1="0" y1="48" x2="52" y2="48" stroke="#150900" strokeWidth="0.8" opacity="0.4" />
      </pattern>
    ),
    fill: (uid) => `url(#fp-${uid})`,
    swatchFill: (uid) => `url(#sp-${uid})`,
  },
]

// ─── FinishSwatch: self-contained SVG swatch ──────────────────────────────────
// Uses swatchPatternDefs — tile sizes designed to look correct at small px sizes.
function FinishSwatch({ finish, size = 52, radius = 10 }) {
  const uid = `sw-${finish.id}-${size}`
  return (
    <svg width={size} height={size} style={{ display: 'block', flexShrink: 0, minWidth: size }}>
      <defs>
        {finish.swatchPatternDefs(uid)}
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="45%" stopColor="white" stopOpacity="0.03" />
          <stop offset="100%" stopColor="black" stopOpacity="0.1" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect width={size} height={size} rx={radius} />
        </clipPath>
      </defs>
      <rect width={size} height={size} rx={radius} fill={finish.swatchFill(uid)} clipPath={`url(#clip-${uid})`} />
      <rect width={size} height={size} rx={radius} fill={`url(#sheen-${uid})`} clipPath={`url(#clip-${uid})`} />
      <rect width={size} height={size} rx={radius} fill="none" stroke={finish.stroke} strokeWidth="0.75" />
    </svg>
  )
}

// ─── FinishDot: circular swatch ───────────────────────────────────────────────
function FinishDot({ finish, size = 20 }) {
  const r = size / 2
  const uid = `dot-${finish.id}-${size}`
  return (
    <svg width={size} height={size} style={{ display: 'block', flexShrink: 0, minWidth: size }}>
      <defs>
        {finish.swatchPatternDefs(uid)}
        <clipPath id={`clip-${uid}`}>
          <circle cx={r} cy={r} r={r} />
        </clipPath>
      </defs>
      <circle cx={r} cy={r} r={r} fill={finish.swatchFill(uid)} clipPath={`url(#clip-${uid})`} />
      <circle cx={r} cy={r} r={r - 0.5} fill="none" stroke={finish.stroke} strokeWidth="0.75" />
    </svg>
  )
}

// ─── PartDefs: inlines all finish patterns needed by a furniture SVG ──────────
function PartDefs({ parts, textures }) {
  return (
    <defs>
      <linearGradient id="part-sheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.13" />
        <stop offset="45%" stopColor="white" stopOpacity="0.02" />
        <stop offset="100%" stopColor="black" stopOpacity="0.07" />
      </linearGradient>
      {parts.map(part => {
        const finish = textures[part.id]
        if (!finish) return null
        return <g key={part.id}>{finish.patternDefs(`p-${part.id}`)}</g>
      })}
    </defs>
  )
}

// ─── getFill helper ───────────────────────────────────────────────────────────
function getFill(partId, textures, fallback = '#E8E2D9') {
  if (textures[partId]) return textures[partId].fill(`p-${partId}`)
  return fallback
}

// ─── Furniture data ───────────────────────────────────────────────────────────
const furniture = [
  {
    id: 'cabinet',
    name: 'Kitchen Cabinet',
    icon: '🍳',
    parts: [
      { id: 'upper', label: 'Upper Cabinets' },
      { id: 'lower', label: 'Lower Cabinets' },
      { id: 'countertop', label: 'Countertop' },
      { id: 'accent', label: 'Frame Accent' },
    ],
  },
  {
    id: 'wardrobe',
    name: 'Wardrobe',
    icon: '🚪',
    parts: [
      { id: 'body', label: 'Cabinet Body' },
      { id: 'doors', label: 'Doors' },
      { id: 'interior', label: 'Interior' },
      { id: 'base', label: 'Base Panel' },
    ],
  },
  {
    id: 'tv',
    name: 'TV Console',
    icon: '📺',
    parts: [
      { id: 'main', label: 'Main Body' },
      { id: 'doors', label: 'Cabinet Doors' },
      { id: 'shelf', label: 'Open Shelf' },
      { id: 'legs', label: 'Legs / Base' },
    ],
  },
  {
    id: 'shelving',
    name: 'Wall Shelving',
    icon: '📚',
    parts: [
      { id: 'back', label: 'Back Panel' },
      { id: 'shelves', label: 'Shelf Boards' },
      { id: 'sides', label: 'Side Panels' },
      { id: 'top', label: 'Top Panel' },
    ],
  },
  {
    id: 'conference',
    name: 'Conference Table',
    icon: '🪑',
    parts: [
      { id: 'top', label: 'Table Top' },
      { id: 'base', label: 'Base / Legs' },
      { id: 'modesty', label: 'Modesty Panel' },
      { id: 'edge', label: 'Edge Banding' },
    ],
  },
]

// ─── Furniture SVGs ───────────────────────────────────────────────────────────

function KitchenCabinetSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 400 380" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />
      <rect width="400" height="380" fill="#F5F2EF" />
      <rect x="20" y="40" width="360" height="120" rx="4" fill={g('upper', '#E8E3DC')} />
      <rect x="20" y="40" width="360" height="120" rx="4" fill="url(#part-sheen)" />
      <rect x="20" y="40" width="360" height="120" rx="4" fill="none" stroke="#00000012" strokeWidth="1" />
      <line x1="140" y1="40" x2="140" y2="160" stroke="#00000018" strokeWidth="1" />
      <line x1="260" y1="40" x2="260" y2="160" stroke="#00000018" strokeWidth="1" />
      {[80, 200, 320].map(x => (
        <rect key={x} x={x - 15} y="97" width="30" height="6" rx="3" fill={g('accent', '#C4956A')} opacity="0.9" />
      ))}
      <rect x="20" y="162" width="360" height="56" fill="#ECEAE6" />
      <text x="200" y="196" textAnchor="middle" fill="#A08060" fontSize="10" fontFamily="serif" letterSpacing="3">ZENOBOARD</text>
      <rect x="10" y="218" width="380" height="20" rx="3" fill={g('countertop', '#C4956A')} />
      <rect x="10" y="218" width="380" height="20" rx="3" fill="url(#part-sheen)" />
      <rect x="10" y="218" width="380" height="20" rx="3" fill="none" stroke="#00000015" strokeWidth="1" />
      <rect x="20" y="238" width="360" height="120" rx="4" fill={g('lower', '#D5CFC6')} />
      <rect x="20" y="238" width="360" height="120" rx="4" fill="url(#part-sheen)" />
      <rect x="20" y="238" width="360" height="120" rx="4" fill="none" stroke="#00000012" strokeWidth="1" />
      <line x1="140" y1="238" x2="140" y2="358" stroke="#00000018" strokeWidth="1" />
      <line x1="260" y1="238" x2="260" y2="358" stroke="#00000018" strokeWidth="1" />
      {[80, 200, 320].map(x => (
        <rect key={x} x={x - 15} y="292" width="30" height="6" rx="3" fill={g('accent', '#C4956A')} opacity="0.9" />
      ))}
      <rect x="0" y="358" width="400" height="22" fill="#DDD8D0" />
      <rect x="20" y="355" width="360" height="6" rx="2" fill="#00000015" />
    </svg>
  )
}

function WardrobeSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 400 380" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />
      <rect width="400" height="380" fill="#F5F2EF" />
      <rect x="30" y="342" width="340" height="22" rx="3" fill={g('base', '#C4956A')} />
      <rect x="40" y="30" width="320" height="312" rx="5" fill={g('body', '#E8E3DC')} />
      <rect x="40" y="30" width="320" height="312" rx="5" fill="none" stroke="#00000012" strokeWidth="1" />
      <line x1="200" y1="30" x2="200" y2="342" stroke="#00000020" strokeWidth="2" />
      <rect x="48" y="38" width="144" height="296" rx="3" fill={g('doors', '#D5CFC6')} />
      <rect x="48" y="38" width="144" height="296" rx="3" fill="url(#part-sheen)" />
      <rect x="48" y="38" width="144" height="296" rx="3" fill="none" stroke="#00000015" strokeWidth="1" />
      <rect x="208" y="38" width="144" height="296" rx="3" fill={g('doors', '#D5CFC6')} />
      <rect x="208" y="38" width="144" height="296" rx="3" fill="url(#part-sheen)" />
      <rect x="208" y="38" width="144" height="296" rx="3" fill="none" stroke="#00000015" strokeWidth="1" />
      <rect x="48" y="38" width="144" height="35" fill={g('interior', '#F0EDE8')} opacity="0.5" />
      <rect x="208" y="38" width="144" height="35" fill={g('interior', '#F0EDE8')} opacity="0.5" />
      <rect x="173" y="178" width="9" height="44" rx="4.5" fill="#999" />
      <rect x="218" y="178" width="9" height="44" rx="4.5" fill="#999" />
      <rect x="0" y="364" width="400" height="16" fill="#DDD8D0" />
    </svg>
  )
}

function TVConsoleSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 400 380" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />
      <rect width="400" height="380" fill="#F5F2EF" />
      <rect x="70" y="20" width="260" height="100" rx="5" fill="#1C1C1C" />
      <rect x="78" y="28" width="244" height="84" rx="3" fill="#141428" />
      <rect x="185" y="120" width="30" height="12" rx="3" fill="#1C1C1C" />
      {[65, 155, 245, 335].map(x => (
        <rect key={x} x={x} y="295" width="10" height="55" rx="5" fill={g('legs', '#5C3D2E')} />
      ))}
      <rect x="30" y="134" width="340" height="14" rx="3" fill={g('main', '#D5CFC6')} />
      <rect x="30" y="148" width="340" height="148" rx="6" fill={g('main', '#D5CFC6')} />
      <rect x="30" y="148" width="340" height="148" rx="6" fill="url(#part-sheen)" />
      <rect x="30" y="148" width="340" height="148" rx="6" fill="none" stroke="#00000012" strokeWidth="1" />
      <rect x="38" y="156" width="110" height="132" rx="3" fill={g('doors', '#C4956A')} />
      <rect x="38" y="156" width="110" height="132" rx="3" fill="url(#part-sheen)" />
      <rect x="38" y="156" width="110" height="132" rx="3" fill="none" stroke="#00000012" strokeWidth="1" />
      <rect x="158" y="156" width="84" height="132" rx="2" fill={g('shelf', '#E8E3DC')} opacity="0.6" />
      <rect x="158" y="218" width="84" height="4" fill="#00000020" />
      <rect x="252" y="156" width="110" height="132" rx="3" fill={g('doors', '#C4956A')} />
      <rect x="252" y="156" width="110" height="132" rx="3" fill="url(#part-sheen)" />
      <rect x="252" y="156" width="110" height="132" rx="3" fill="none" stroke="#00000012" strokeWidth="1" />
      <circle cx="148" cy="222" r="5" fill="#AAA" />
      <circle cx="252" cy="222" r="5" fill="#AAA" />
      <rect x="0" y="350" width="400" height="30" fill="#DDD8D0" />
    </svg>
  )
}

function ShelvingSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 400 380" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />
      <rect width="400" height="380" fill="#F5F2EF" />
      <rect x="30" y="20" width="340" height="340" rx="4" fill={g('back', '#E8E3DC')} />
      <rect x="30" y="20" width="340" height="340" rx="4" fill="none" stroke="#00000012" strokeWidth="1" />
      <rect x="30" y="20" width="22" height="340" rx="4" fill={g('sides', '#D5CFC6')} />
      <rect x="348" y="20" width="22" height="340" rx="4" fill={g('sides', '#D5CFC6')} />
      <rect x="30" y="20" width="340" height="20" rx="4" fill={g('top', '#C4956A')} />
      <rect x="30" y="340" width="340" height="20" rx="4" fill={g('top', '#C4956A')} />
      {[100, 180, 260].map(y => (
        <rect key={y} x="52" y={y} width="296" height="15" rx="2" fill={g('shelves', '#C4956A')} />
      ))}
      <rect x="30" y="20" width="340" height="340" rx="4" fill="url(#part-sheen)" />
      <rect x="68" y="58" width="22" height="42" rx="2" fill="#C4956A" opacity="0.35" />
      <rect x="96" y="66" width="16" height="34" rx="2" fill="#8E9099" opacity="0.35" />
      <rect x="118" y="52" width="20" height="48" rx="2" fill="#5C3D2E" opacity="0.35" />
      <ellipse cx="270" cy="78" rx="36" ry="22" fill="#E8DDD0" opacity="0.4" />
      <rect x="68" y="138" width="90" height="42" rx="5" fill="#B8956A" opacity="0.3" />
      <rect x="260" y="130" width="32" height="50" rx="2" fill="#C4956A" opacity="0.35" />
    </svg>
  )
}

// ─── Conference Table — no chairs, wider aspect, richer scene ─────────────────
function ConferenceTableSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 480 300" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />
      <defs>
        <linearGradient id="ct-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDE8E2" />
          <stop offset="100%" stopColor="#E0DAD2" />
        </linearGradient>
        <linearGradient id="ct-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9D2C8" />
          <stop offset="100%" stopColor="#CEC7BC" />
        </linearGradient>
        <linearGradient id="ct-tsheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="35%" stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="black" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="ct-leg-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="black" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Room */}
      <rect width="480" height="300" fill="url(#ct-wall)" />
      {/* Floor */}
      <rect x="0" y="200" width="480" height="100" fill="url(#ct-floor)" />
      {/* Wall/floor seam */}
      <line x1="0" y1="200" x2="480" y2="200" stroke="#BDB6AB" strokeWidth="1" />
      {/* Subtle floor planks */}
      {[0, 80, 160, 240, 320, 400].map(x => (
        <line key={x} x1={x} y1="200" x2={x + 60} y2="300" stroke="#C8C1B6" strokeWidth="0.5" opacity="0.5" />
      ))}

      {/* Table shadow on floor */}
      <ellipse cx="240" cy="212" rx="188" ry="10" fill="#00000014" />

      {/* ── Left leg assembly ── */}
      <rect x="62" y="168" width="32" height="78" rx="7" fill={g('base', '#7A5030')} />
      <rect x="62" y="168" width="32" height="78" rx="7" fill="url(#ct-leg-sheen)" />
      <rect x="62" y="168" width="32" height="78" rx="7" fill="none" stroke="#00000020" strokeWidth="1" />
      {/* Left foot bar */}
      <rect x="48" y="240" width="60" height="9" rx="4.5" fill={g('base', '#5A3A1E')} />
      <rect x="48" y="240" width="60" height="9" rx="4.5" fill="url(#ct-leg-sheen)" />

      {/* ── Right leg assembly ── */}
      <rect x="386" y="168" width="32" height="78" rx="7" fill={g('base', '#7A5030')} />
      <rect x="386" y="168" width="32" height="78" rx="7" fill="url(#ct-leg-sheen)" />
      <rect x="386" y="168" width="32" height="78" rx="7" fill="none" stroke="#00000020" strokeWidth="1" />
      {/* Right foot bar */}
      <rect x="372" y="240" width="60" height="9" rx="4.5" fill={g('base', '#5A3A1E')} />
      <rect x="372" y="240" width="60" height="9" rx="4.5" fill="url(#ct-leg-sheen)" />

      {/* Cross stretcher */}
      <rect x="94" y="196" width="292" height="14" rx="7" fill={g('base', '#6A4020')} />
      <rect x="94" y="196" width="292" height="14" rx="7" fill="url(#ct-leg-sheen)" />
      <rect x="94" y="196" width="292" height="14" rx="7" fill="none" stroke="#00000015" strokeWidth="0.75" />

      {/* ── Modesty panel ── */}
      <rect x="98" y="155" width="284" height="16" rx="3" fill={g('modesty', '#8B6340')} />
      <rect x="98" y="155" width="284" height="16" rx="3" fill="url(#part-sheen)" />
      <rect x="98" y="155" width="284" height="16" rx="3" fill="none" stroke="#00000015" strokeWidth="0.75" />

      {/* ── Edge banding — left & right sides ── */}
      <rect x="18" y="82" width="11" height="76" rx="3" fill={g('edge', '#A07040')} />
      <rect x="18" y="82" width="11" height="76" rx="3" fill="url(#part-sheen)" />
      <rect x="451" y="82" width="11" height="76" rx="3" fill={g('edge', '#A07040')} />
      <rect x="451" y="82" width="11" height="76" rx="3" fill="url(#part-sheen)" />

      {/* ── Edge banding — bottom ── */}
      <rect x="18" y="152" width="444" height="8" rx="3" fill={g('edge', '#A07040')} />
      <rect x="18" y="152" width="444" height="8" rx="3" fill="url(#part-sheen)" />

      {/* ── Table top — main surface ── */}
      <rect x="18" y="78" width="444" height="76" rx="9" fill={g('top', '#C4956A')} />
      {/* Natural grain accent lines */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i}
          x1="28" y1={91 + i * 11}
          x2="452" y2={91 + i * 11}
          stroke="rgba(0,0,0,0.035)" strokeWidth="1.2" />
      ))}
      {/* Sheen */}
      <rect x="18" y="78" width="444" height="76" rx="9" fill="url(#ct-tsheen)" />
      <rect x="18" y="78" width="444" height="76" rx="9" fill="none" stroke="#00000018" strokeWidth="1.5" />

      {/* ── Surface objects ── */}
      {/* Laptop left */}
      <rect x="52"  y="89" width="58" height="38" rx="4" fill="rgba(255,255,255,0.30)" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
      <rect x="57"  y="93" width="48" height="30" rx="2" fill="rgba(70,90,170,0.13)" />

      {/* Notepad center-left */}
      <rect x="166" y="94" width="40" height="28" rx="2" fill="rgba(255,255,255,0.38)" stroke="rgba(0,0,0,0.07)" strokeWidth="0.75" />
      <line x1="172" y1="102" x2="200" y2="102" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <line x1="172" y1="108" x2="200" y2="108" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <line x1="172" y1="114" x2="192" y2="114" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      {/* Pen */}
      <rect x="209" y="99" width="36" height="4" rx="2" fill="rgba(50,30,10,0.38)" />

      {/* Water glass center */}
      <rect x="228" y="88" width="18" height="24" rx="5" fill="rgba(195,225,255,0.22)" stroke="rgba(170,205,240,0.45)" strokeWidth="0.8" />
      <ellipse cx="237" cy="88" rx="9" ry="4" fill="rgba(195,225,255,0.3)" stroke="rgba(170,205,240,0.4)" strokeWidth="0.7" />

      {/* Cable / port */}
      <ellipse cx="240" cy="90" rx="7" ry="3" fill="rgba(0,0,0,0.1)" />

      {/* Notepad center-right */}
      <rect x="276" y="94" width="40" height="28" rx="2" fill="rgba(255,255,255,0.38)" stroke="rgba(0,0,0,0.07)" strokeWidth="0.75" />
      <line x1="282" y1="102" x2="310" y2="102" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <line x1="282" y1="108" x2="310" y2="108" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <line x1="282" y1="114" x2="300" y2="114" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />

      {/* Laptop right */}
      <rect x="370" y="89" width="58" height="38" rx="4" fill="rgba(255,255,255,0.30)" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
      <rect x="375" y="93" width="48" height="30" rx="2" fill="rgba(70,90,170,0.13)" />
    </svg>
  )
}

const svgMap = {
  cabinet: KitchenCabinetSVG,
  wardrobe: WardrobeSVG,
  tv: TVConsoleSVG,
  shelving: ShelvingSVG,
  conference: ConferenceTableSVG,
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Visualizer() {
  const [selectedFurniture, setSelectedFurniture] = useState(furniture[0])
  const [selectedPart, setSelectedPart] = useState(furniture[0].parts[0].id)
  const [textures, setTextures] = useState({})
  const [savedDesigns, setSavedDesigns] = useState([])
  const [justSaved, setJustSaved] = useState(false)

  const FurnitureSVG = svgMap[selectedFurniture.id]

  const handleFurnitureChange = (f) => {
    setSelectedFurniture(f)
    setSelectedPart(f.parts[0].id)
    setTextures({})
  }

  const applyFinish = (finish) => {
    setTextures(prev => ({ ...prev, [selectedPart]: finish }))
  }

  const applyToAll = (finish) => {
    const all = {}
    selectedFurniture.parts.forEach(p => { all[p.id] = finish })
    setTextures(all)
  }

  const reset = () => setTextures({})

  const saveDesign = () => {
    setSavedDesigns(prev => [...prev, {
      name: `${selectedFurniture.name} #${prev.length + 1}`,
      textures: { ...textures },
      furnitureId: selectedFurniture.id,
    }])
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F8F6F3]">

      {/* Header */}
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-12 border-b border-stone-200 bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-12 py-4 sm:py-6 lg:py-8">

        {/* Furniture tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4 sm:mb-6">
          {furniture.map(f => (
            <button
              key={f.id}
              onClick={() => handleFurnitureChange(f)}
              className={`shrink-0 flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                selectedFurniture.id === f.id
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-primary/30'
              }`}
            >
              <span className="text-sm">{f.icon}</span>
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* ── Desktop: side-by-side | Mobile: stacked (preview always on top) ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-4 sm:gap-6 lg:gap-8">

          {/* ── PREVIEW (always visible, always on top on mobile) ── */}
          <div className="flex flex-col gap-4 order-1">

            {/* Furniture canvas */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-stone-100" style={{ minHeight: 300 }}>
              <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-stone-100 rounded-2xl sm:rounded-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-stone-200/40 rounded-b-2xl sm:rounded-b-3xl pointer-events-none" />

              {/* Reset */}
              <button
                onClick={reset}
                className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-primary shadow-md hover:shadow-lg transition-all border border-stone-200 hover:border-primary/30 active:scale-95"
              >
                <FiRefreshCw className="text-xs" />
                <span>Reset</span>
              </button>

              {/* Active finish badge */}
              {textures[selectedPart] && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1.5 shadow-md border border-stone-100">
                  <FinishDot finish={textures[selectedPart]} size={16} />
                  <span className="text-xs font-semibold text-stone-700">{textures[selectedPart].name}</span>
                </div>
              )}

              {/* SVG */}
              <div className="relative z-10 flex items-center justify-center p-4 sm:p-8" style={{ minHeight: 300 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFurniture.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-[300px] sm:max-w-sm lg:max-w-md"
                  >
                    <FurnitureSVG textures={textures} parts={selectedFurniture.parts} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Part picker */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-stone-100 shadow-sm">
              <p className="text-[10px] sm:text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Select Part to Customize</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedFurniture.parts.map(part => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPart(part.id)}
                    className={`relative flex flex-col items-start gap-1 p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 border ${
                      selectedPart === part.id
                        ? 'bg-primary/5 border-primary'
                        : 'bg-stone-50 border-stone-100 hover:border-stone-300'
                    }`}
                  >
                    {textures[part.id] && (
                      <span className="absolute top-2 right-2">
                        <FinishDot finish={textures[part.id]} size={18} />
                      </span>
                    )}
                    <span className={`font-bold text-[11px] sm:text-xs leading-tight pr-5 ${selectedPart === part.id ? 'text-primary' : 'text-stone-700'}`}>
                      {part.label}
                    </span>
                    <span className="text-stone-400 text-[10px]">
                      {textures[part.id] ? textures[part.id].name : 'Not set'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Design summary — desktop only */}
            <div className="hidden lg:block bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
              <p className="font-bold text-stone-800 text-sm mb-3">Your Design</p>
              <div className="flex flex-col gap-2.5">
                {selectedFurniture.parts.map(part => (
                  <div key={part.id} className="flex items-center justify-between">
                    <span className="text-xs text-stone-500">{part.label}</span>
                    {textures[part.id] ? (
                      <div className="flex items-center gap-2">
                        <FinishSwatch finish={textures[part.id]} size={28} radius={6} />
                        <span className="text-xs font-semibold text-stone-700">{textures[part.id].name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-stone-300 italic">Not set</span>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={saveDesign}
                disabled={Object.keys(textures).length === 0}
                className="mt-4 w-full py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-800 text-white hover:bg-stone-900"
              >
                {justSaved ? '✓ Design Saved!' : 'Save This Design'}
              </button>
            </div>
          </div>

          {/* ── CONTROLS (below preview on mobile, right column on desktop) ── */}
          <div className="flex flex-col gap-3 sm:gap-4 order-2">

            {/* Finish selector */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-100 shadow-sm">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <p className="font-bold text-stone-800 text-sm">Zenoboard Finishes</p>
                <span className="text-[10px] sm:text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full truncate max-w-[130px]">
                  {selectedFurniture.parts.find(p => p.id === selectedPart)?.label}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 mb-3 sm:mb-4">
                {finishes.map(finish => {
                  const isActive = textures[selectedPart]?.id === finish.id
                  return (
                    <motion.button
                      key={finish.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => applyFinish(finish)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all duration-200 text-left ${
                        isActive
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-stone-100 hover:border-stone-300 bg-stone-50'
                      }`}
                    >
                      <FinishSwatch finish={finish} size={52} radius={10} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm ${isActive ? 'text-primary' : 'text-stone-800'}`}>
                          {finish.name}
                        </p>
                        <p className="text-stone-400 text-xs mt-0.5">{finish.label}</p>
                      </div>
                      {isActive && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <FiCheck className="text-white text-xs" />
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <button
                onClick={() => textures[selectedPart] && applyToAll(textures[selectedPart])}
                disabled={!textures[selectedPart]}
                className="w-full py-2.5 text-xs font-semibold text-primary border border-primary/20 bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Apply "{textures[selectedPart]?.name || '—'}" to all parts
              </button>
            </div>

            {/* Design summary — mobile only */}
            <div className="lg:hidden bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
              <p className="font-bold text-stone-800 text-sm mb-3">Your Design</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {selectedFurniture.parts.map(part => (
                  <div key={part.id} className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl">
                    {textures[part.id]
                      ? <FinishSwatch finish={textures[part.id]} size={28} radius={6} />
                      : <div className="w-7 h-7 rounded-lg bg-stone-200 shrink-0" />
                    }
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-stone-700 truncate">{part.label}</p>
                      <p className="text-[10px] text-stone-400 truncate">{textures[part.id]?.name || 'Not set'}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={saveDesign}
                disabled={Object.keys(textures).length === 0}
                className="w-full py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-800 text-white hover:bg-stone-900"
              >
                {justSaved ? '✓ Design Saved!' : 'Save This Design'}
              </button>
            </div>

            {/* Saved designs */}
            {savedDesigns.length > 0 && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-100 shadow-sm">
                <p className="font-bold text-stone-800 text-sm mb-3">Saved Designs</p>
                <div className="flex flex-col gap-2">
                  {savedDesigns.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                      <span className="text-xs font-medium text-stone-700 truncate mr-2">{d.name}</span>
                      <div className="flex gap-1 shrink-0">
                        {Object.values(d.textures).slice(0, 4).map((t, j) => (
                          <FinishDot key={j} finish={t} size={20} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-primary rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-white">
              <p className="font-bold text-sm sm:text-base mb-1">Love your design?</p>
              <p className="text-white/70 text-xs mb-3 sm:mb-4 leading-relaxed">
                Get a quote using your selected Zenoboard finishes. Our team will reach out within 24 hours.
              </p>
              <Link
                to="/contact"
                className="block w-full text-center py-2.5 sm:py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-stone-100 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
