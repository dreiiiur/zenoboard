import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiRefreshCw, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const finishes = [
  { id: 'white',        name: 'White',        label: 'Matte finish',    stroke: '#C8C6C2', image: '/patterns/white-finish.webp',       imageH: '/tabletop/white-tabletop.webp' },
  { id: 'gray',         name: 'Gray',         label: 'Concrete finish', stroke: '#7A7A7A', image: '/patterns/gray-finish.webp',        imageH: '/tabletop/gray-tabletop.webp' },
  { id: 'straight-oak', name: 'Straight Oak', label: 'Natural grain',   stroke: '#9A6A40', image: '/patterns/straightoak-finish.webp', imageH: '/tabletop/oak-tabletop.webp' },
  { id: 'walnut',       name: 'Walnut',       label: 'Wave grain',      stroke: '#4A2810', image: '/patterns/walnut-finish.webp',      imageH: '/tabletop/walnut-tabletop.webp' },
  { id: 'wenge',        name: 'Wenge',        label: 'Fine grain',      stroke: '#1E0E06', image: '/patterns/wenge-finish.webp',       imageH: '/tabletop/wenge-tabletop.webp' },
]

function makePatternDef(uid, image) {
  return (
    <pattern id={`fp-${uid}`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image href={image} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" />
    </pattern>
  )
}

function makePatternDefH(uid, image) {
  return (
    <pattern id={`fph-${uid}`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image href={image} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" />
    </pattern>
  )
}

function makeSwatchPatternDef(uid, image) {
  return (
    <pattern id={`sp-${uid}`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image href={image} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" />
    </pattern>
  )
}

finishes.forEach(f => {
  f.patternDefs       = (uid) => makePatternDef(uid, f.image)
  f.patternDefsH      = (uid) => makePatternDefH(uid, f.imageH)
  f.swatchPatternDefs  = (uid) => makeSwatchPatternDef(uid, f.image)
  f.fill              = (uid) => `url(#fp-${uid})`
  f.fillH             = (uid) => `url(#fph-${uid})`
  f.swatchFill        = (uid) => `url(#sp-${uid})`
})

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

function PartDefs({ parts, textures, horizParts }) {
  return (
    <defs>
      <linearGradient id="part-sheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="white" stopOpacity="0.08" />
        <stop offset="40%"  stopColor="white" stopOpacity="0.01" />
        <stop offset="100%" stopColor="black" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="panel-depth" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="white" stopOpacity="0.06" />
        <stop offset="50%"  stopColor="white" stopOpacity="0" />
        <stop offset="100%" stopColor="black" stopOpacity="0.08" />
      </linearGradient>
      {parts.map(part => {
        const finish = textures[part.id]
        if (!finish) return null
        const isHoriz = horizParts && horizParts.has(part.id)
        return (
          <g key={part.id}>
            {finish.patternDefs(`p-${part.id}`)}
            {isHoriz && finish.patternDefsH(`ph-${part.id}`)}
          </g>
        )
      })}
    </defs>
  )
}

function getFill(partId, textures, fallback = '#E8E2D9') {
  if (textures[partId]) return textures[partId].fill(`p-${partId}`)
  return fallback
}

function getFillH(partId, textures, fallback = '#E8E2D9') {
  if (textures[partId]) return textures[partId].fillH(`ph-${partId}`)
  return fallback
}

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

function KitchenCabinetSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />

      {/* Room background */}
      <rect width="400" height="400" fill="#ECEAE6" />
      {/* Floor */}
      <rect x="0" y="370" width="400" height="30" fill="#D4CFC8" />
      <line x1="0" y1="370" x2="400" y2="370" stroke="rgba(0,0,0,0.09)" strokeWidth="1" />

      {/* ── Upper cabinets ── */}
      {/* Shadow */}
      <rect x="17" y="37" width="368" height="126" rx="4" fill="rgba(0,0,0,0.07)" />
      {/* Carcass */}
      <rect x="20" y="34" width="362" height="122" rx="3" fill={g('upper', '#E8E3DC')} />
      <rect x="20" y="34" width="362" height="122" rx="3" fill="url(#panel-depth)" />
      <rect x="20" y="34" width="362" height="122" rx="3" fill="url(#part-sheen)" />
      <rect x="20" y="34" width="362" height="122" rx="3" fill="none" stroke="rgba(0,0,0,0.11)" strokeWidth="0.8" />
      {/* Door seams */}
      <line x1="141" y1="36" x2="141" y2="154" stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" />
      <line x1="261" y1="36" x2="261" y2="154" stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" />
      {/* Door inset shadow lines */}
      {[23, 144, 264].map(x => (
        <rect key={x} x={x} y="37" width="115" height="116" rx="2"
          fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      ))}
      {/* Handles */}
      {[126, 246, 367].map(x => (
        <g key={x}>
          <rect x={x-13} y="93" width="26" height="9" rx="4.5" fill="rgba(0,0,0,0.2)" />
          <rect x={x-13} y="92" width="26" height="9" rx="4.5" fill={g('accent', '#C0B8B0')} />
        </g>
      ))}

      {/* ── Backsplash ── */}
      <rect x="20" y="158" width="362" height="52" fill="#E6E3DE" />
      <rect x="20" y="158" width="362" height="1" fill="rgba(0,0,0,0.07)" />
      <rect x="20" y="209" width="362" height="1" fill="rgba(0,0,0,0.07)" />
      <text x="201" y="189" textAnchor="middle" fill="rgba(0,0,0,0.13)"
        fontSize="8" fontFamily="serif" letterSpacing="5">ZENOBOARD</text>

      {/* ── Countertop ── */}
      <rect x="8" y="210" width="386" height="20" rx="2" fill={g('countertop', '#C4956A')} />
      <rect x="8" y="210" width="386" height="5" rx="2" fill="rgba(255,255,255,0.14)" />
      <rect x="8" y="228" width="386" height="2" fill="rgba(0,0,0,0.12)" />
      <rect x="8" y="210" width="386" height="20" rx="2" fill="url(#part-sheen)" />

      {/* ── Lower cabinets ── */}
      {/* Shadow */}
      <rect x="17" y="234" width="368" height="142" rx="4" fill="rgba(0,0,0,0.07)" />
      {/* Carcass */}
      <rect x="20" y="232" width="362" height="138" rx="3" fill={g('lower', '#D5CFC6')} />
      <rect x="20" y="232" width="362" height="138" rx="3" fill="url(#panel-depth)" />
      <rect x="20" y="232" width="362" height="138" rx="3" fill="url(#part-sheen)" />
      <rect x="20" y="232" width="362" height="138" rx="3" fill="none" stroke="rgba(0,0,0,0.11)" strokeWidth="0.8" />
      {/* Door seams */}
      <line x1="141" y1="234" x2="141" y2="368" stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" />
      <line x1="261" y1="234" x2="261" y2="368" stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" />
      {/* Door inset */}
      {[23, 144, 264].map(x => (
        <rect key={x} x={x} y="235" width="115" height="132" rx="2"
          fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      ))}
      {/* Handles */}
      {[126, 246, 367].map(x => (
        <g key={x}>
          <rect x={x-13} y="295" width="26" height="9" rx="4.5" fill="rgba(0,0,0,0.2)" />
          <rect x={x-13} y="294" width="26" height="9" rx="4.5" fill={g('accent', '#C0B8B0')} />
        </g>
      ))}

      {/* ── Toe kick ── */}
      <rect x="20" y="368" width="362" height="18" rx="2" fill="rgba(0,0,0,0.15)" />
      <ellipse cx="201" cy="372" rx="160" ry="4" fill="rgba(0,0,0,0.07)" />
    </svg>
  )
}

function WardrobeSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 400 440" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />

      {/* Room */}
      <rect width="400" height="440" fill="#ECEAE6" />
      {/* Floor */}
      <rect x="0" y="410" width="400" height="30" fill="#D4CFC8" />
      <line x1="0" y1="410" x2="400" y2="410" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

      {/* Drop shadow */}
      <rect x="34" y="24" width="334" height="392" rx="5" fill="rgba(0,0,0,0.08)" />

      {/* ── Body ── */}
      <rect x="30" y="20" width="340" height="388" rx="4" fill={g('body', '#E8E3DC')} />
      <rect x="30" y="20" width="340" height="388" rx="4" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

      {/* ── Base panel ── */}
      <rect x="30" y="390" width="340" height="18" rx="3" fill={g('base', '#C4956A')} />
      <rect x="30" y="390" width="340" height="5" fill="rgba(255,255,255,0.13)" />
      <rect x="30" y="406" width="340" height="2" fill="rgba(0,0,0,0.12)" />

      {/* ── Center stile ── */}
      <rect x="198" y="20" width="4" height="370" fill="rgba(0,0,0,0.13)" />

      {/* ── Left door ── */}
      <rect x="34" y="24" width="160" height="362" rx="2" fill={g('doors', '#D5CFC6')} />
      <rect x="34" y="24" width="160" height="362" rx="2" fill="url(#panel-depth)" />
      <rect x="34" y="24" width="160" height="362" rx="2" fill="url(#part-sheen)" />
      <rect x="34" y="24" width="160" height="362" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.75" />
      {/* Left door inset frame */}
      <rect x="42" y="32" width="144" height="346" rx="2" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

      {/* ── Right door ── */}
      <rect x="206" y="24" width="160" height="362" rx="2" fill={g('doors', '#D5CFC6')} />
      <rect x="206" y="24" width="160" height="362" rx="2" fill="url(#panel-depth)" />
      <rect x="206" y="24" width="160" height="362" rx="2" fill="url(#part-sheen)" />
      <rect x="206" y="24" width="160" height="362" rx="2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.75" />
      {/* Right door inset frame */}
      <rect x="214" y="32" width="144" height="346" rx="2" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

      {/* Interior peek */}
      <rect x="34"  y="24" width="160" height="22" fill={g('interior', '#F0EDE8')} opacity="0.5" />
      <rect x="206" y="24" width="160" height="22" fill={g('interior', '#F0EDE8')} opacity="0.5" />

      {/* Handles */}
      <rect x="181" y="185" width="11" height="72" rx="5.5" fill="rgba(0,0,0,0.18)" />
      <rect x="180" y="184" width="11" height="72" rx="5.5" fill={g('accent', '#BEB6AE')} />
      <rect x="209" y="185" width="11" height="72" rx="5.5" fill="rgba(0,0,0,0.18)" />
      <rect x="208" y="184" width="11" height="72" rx="5.5" fill={g('accent', '#BEB6AE')} />

      {/* Floor shadow */}
      <ellipse cx="200" cy="413" rx="150" ry="5" fill="rgba(0,0,0,0.09)" />
    </svg>
  )
}

function TVConsoleSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 400 380" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />

      {/* Room */}
      <rect width="400" height="380" fill="#ECEAE6" />
      {/* Floor */}
      <rect x="0" y="348" width="400" height="32" fill="#D4CFC8" />
      <line x1="0" y1="348" x2="400" y2="348" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

      {/* ── TV ── */}
      <rect x="68" y="14" width="264" height="162" rx="7" fill="#181818" />
      <rect x="68" y="14" width="264" height="162" rx="7" fill="none" stroke="#111" strokeWidth="1.5" />
      <rect x="76" y="22" width="248" height="146" rx="3" fill="#0C0C1C" />
      {/* Screen glare */}
      <rect x="76" y="22" width="248" height="8" rx="3" fill="rgba(255,255,255,0.04)" />
      <rect x="308" y="22" width="16" height="146" rx="3" fill="rgba(255,255,255,0.025)" />
      {/* TV neck */}
      <rect x="183" y="176" width="34" height="16" rx="3" fill="#181818" />

      {/* ── Console body shadow ── */}
      <rect x="23" y="198" width="356" height="152" rx="6" fill="rgba(0,0,0,0.08)" />

      {/* ── Console body ── */}
      <rect x="20" y="194" width="360" height="148" rx="5" fill={g('main', '#D5CFC6')} />
      <rect x="20" y="194" width="360" height="148" rx="5" fill="url(#part-sheen)" />
      <rect x="20" y="194" width="360" height="148" rx="5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.75" />
      {/* Top edge highlight */}
      <rect x="20" y="194" width="360" height="6" rx="5" fill="rgba(255,255,255,0.1)" />

      {/* ── Left door ── */}
      <rect x="25" y="200" width="116" height="134" rx="3" fill={g('doors', '#C4956A')} />
      <rect x="25" y="200" width="116" height="134" rx="3" fill="url(#panel-depth)" />
      <rect x="25" y="200" width="116" height="134" rx="3" fill="url(#part-sheen)" />
      <rect x="25" y="200" width="116" height="134" rx="3" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.75" />
      <rect x="31" y="206" width="104" height="122" rx="2" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

      {/* ── Open shelf ── */}
      <rect x="151" y="200" width="98" height="134" rx="2" fill={g('shelf', '#E8E3DC')} opacity="0.6" />
      <rect x="151" y="265" width="98" height="2" fill="rgba(0,0,0,0.1)" />

      {/* ── Right door ── */}
      <rect x="259" y="200" width="116" height="134" rx="3" fill={g('doors', '#C4956A')} />
      <rect x="259" y="200" width="116" height="134" rx="3" fill="url(#panel-depth)" />
      <rect x="259" y="200" width="116" height="134" rx="3" fill="url(#part-sheen)" />
      <rect x="259" y="200" width="116" height="134" rx="3" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.75" />
      <rect x="265" y="206" width="104" height="122" rx="2" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

      {/* Handles */}
      <rect x="132" y="258" width="11" height="22" rx="5.5" fill="rgba(0,0,0,0.18)" />
      <rect x="131" y="257" width="11" height="22" rx="5.5" fill={g('accent', '#BEB6AE')} />
      <rect x="257" y="258" width="11" height="22" rx="5.5" fill="rgba(0,0,0,0.18)" />
      <rect x="256" y="257" width="11" height="22" rx="5.5" fill={g('accent', '#BEB6AE')} />

      {/* ── Legs ── */}
      {[44, 130, 270, 356].map(x => (
        <g key={x}>
          <rect x={x-9} y="340" width="18" height="10" rx="3" fill={g('legs', '#5C3D2E')} />
          <rect x={x-7} y="349" width="14" height="1.5" rx="1" fill="rgba(0,0,0,0.2)" />
        </g>
      ))}

      {/* Floor shadow */}
      <ellipse cx="200" cy="352" rx="162" ry="5" fill="rgba(0,0,0,0.08)" />
    </svg>
  )
}

function ShelvingSVG({ textures, parts }) {
  const g = (id, fb) => getFill(id, textures, fb)
  return (
    <svg viewBox="0 0 400 410" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} />

      {/* Wall */}
      <rect width="400" height="410" fill="#ECEAE6" />
      {/* Floor */}
      <rect x="0" y="382" width="400" height="28" fill="#D4CFC8" />
      <line x1="0" y1="382" x2="400" y2="382" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

      {/* Drop shadow */}
      <rect x="34" y="16" width="334" height="372" rx="5" fill="rgba(0,0,0,0.07)" />

      {/* ── Back panel ── */}
      <rect x="30" y="12" width="340" height="368" rx="4" fill={g('back', '#E8E3DC')} />
      <rect x="30" y="12" width="340" height="368" rx="4" fill="url(#part-sheen)" />
      <rect x="30" y="12" width="340" height="368" rx="4" fill="none" stroke="rgba(0,0,0,0.09)" strokeWidth="1" />

      {/* ── Top panel ── */}
      <rect x="30" y="12" width="340" height="20" rx="4" fill={g('top', '#C4956A')} />
      <rect x="30" y="12" width="340" height="5" rx="4" fill="rgba(255,255,255,0.17)" />
      <rect x="30" y="30" width="340" height="2" fill="rgba(0,0,0,0.1)" />
      <rect x="30" y="12" width="340" height="20" rx="4" fill="url(#part-sheen)" />

      {/* ── Bottom panel ── */}
      <rect x="30" y="360" width="340" height="20" rx="4" fill={g('top', '#C4956A')} />
      <rect x="30" y="360" width="340" height="4" fill="rgba(255,255,255,0.12)" />
      <rect x="30" y="360" width="340" height="20" rx="4" fill="url(#part-sheen)" />

      {/* ── Left side panel ── */}
      <rect x="30" y="12" width="22" height="368" rx="3" fill={g('sides', '#D5CFC6')} />
      <rect x="30" y="12" width="22" height="368" rx="3" fill="url(#panel-depth)" />
      <rect x="50" y="12" width="2" height="368" fill="rgba(0,0,0,0.07)" />

      {/* ── Right side panel ── */}
      <rect x="348" y="12" width="22" height="368" rx="3" fill={g('sides', '#D5CFC6')} />
      <rect x="348" y="12" width="22" height="368" rx="3" fill="url(#panel-depth)" />
      <rect x="348" y="12" width="2" height="368" fill="rgba(0,0,0,0.07)" />

      {/* ── Shelf boards ── */}
      {[102, 192, 282].map(y => (
        <g key={y}>
          {/* Shelf underside shadow */}
          <rect x="52" y={y+14} width="296" height="5" rx="1" fill="rgba(0,0,0,0.09)" />
          {/* Shelf */}
          <rect x="52" y={y} width="296" height="15" rx="2" fill={g('shelves', '#C4956A')} />
          <rect x="52" y={y} width="296" height="4" rx="2" fill="rgba(255,255,255,0.14)" />
          <rect x="52" y={y} width="296" height="15" rx="2" fill="url(#part-sheen)" />
        </g>
      ))}

      {/* ── Decorative items ── */}
      <rect x="62"  y="42"  width="18" height="56" rx="2" fill="#C4906A" opacity="0.5" />
      <rect x="84"  y="50"  width="14" height="48" rx="2" fill="#8E9099" opacity="0.45" />
      <rect x="102" y="36"  width="16" height="62" rx="2" fill="#5C3D2E" opacity="0.5" />
      <ellipse cx="272" cy="66" rx="34" ry="22" fill="#E8DDD0" opacity="0.55" />
      <rect x="70"  y="124" width="82" height="60" rx="4" fill="#B8956A" opacity="0.38" />
      <rect x="292" y="120" width="28" height="68" rx="2" fill="#C4956A" opacity="0.42" />

      {/* Floor shadow */}
      <ellipse cx="200" cy="385" rx="152" ry="4" fill="rgba(0,0,0,0.09)" />
    </svg>
  )
}

function ConferenceTableSVG({ textures, parts }) {
  const g  = (id, fb) => getFill(id, textures, fb)
  const gH = (id, fb) => getFillH(id, textures, fb)
  const HORIZ = new Set(['top'])
  return (
    <svg viewBox="0 0 480 300" className="w-full h-full drop-shadow-2xl">
      <PartDefs parts={parts} textures={textures} horizParts={HORIZ} />
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
      <rect width="480" height="300" fill="url(#ct-wall)" />
      <rect x="0" y="200" width="480" height="100" fill="url(#ct-floor)" />
      <line x1="0" y1="200" x2="480" y2="200" stroke="#BDB6AB" strokeWidth="1" />
      {[0, 80, 160, 240, 320, 400].map(x => (
        <line key={x} x1={x} y1="200" x2={x + 60} y2="300" stroke="#C8C1B6" strokeWidth="0.5" opacity="0.5" />
      ))}
      <ellipse cx="240" cy="212" rx="188" ry="10" fill="#00000014" />
      <rect x="62" y="168" width="32" height="78" rx="7" fill={g('base', '#7A5030')} />
      <rect x="62" y="168" width="32" height="78" rx="7" fill="url(#ct-leg-sheen)" />
      <rect x="62" y="168" width="32" height="78" rx="7" fill="none" stroke="#00000020" strokeWidth="1" />
      <rect x="48" y="240" width="60" height="9" rx="4.5" fill={g('base', '#5A3A1E')} />
      <rect x="48" y="240" width="60" height="9" rx="4.5" fill="url(#ct-leg-sheen)" />
      <rect x="386" y="168" width="32" height="78" rx="7" fill={g('base', '#7A5030')} />
      <rect x="386" y="168" width="32" height="78" rx="7" fill="url(#ct-leg-sheen)" />
      <rect x="386" y="168" width="32" height="78" rx="7" fill="none" stroke="#00000020" strokeWidth="1" />
      <rect x="372" y="240" width="60" height="9" rx="4.5" fill={g('base', '#5A3A1E')} />
      <rect x="372" y="240" width="60" height="9" rx="4.5" fill="url(#ct-leg-sheen)" />
      <rect x="94" y="196" width="292" height="14" rx="7" fill={g('base', '#6A4020')} />
      <rect x="94" y="196" width="292" height="14" rx="7" fill="url(#ct-leg-sheen)" />
      <rect x="94" y="196" width="292" height="14" rx="7" fill="none" stroke="#00000015" strokeWidth="0.75" />
      <rect x="98" y="155" width="284" height="16" rx="3" fill={g('modesty', '#8B6340')} />
      <rect x="98" y="155" width="284" height="16" rx="3" fill="url(#part-sheen)" />
      <rect x="98" y="155" width="284" height="16" rx="3" fill="none" stroke="#00000015" strokeWidth="0.75" />
      <rect x="18" y="82" width="11" height="76" rx="3" fill={g('edge', '#A07040')} />
      <rect x="18" y="82" width="11" height="76" rx="3" fill="url(#part-sheen)" />
      <rect x="451" y="82" width="11" height="76" rx="3" fill={g('edge', '#A07040')} />
      <rect x="451" y="82" width="11" height="76" rx="3" fill="url(#part-sheen)" />
      <rect x="18" y="152" width="444" height="8" rx="3" fill={g('edge', '#A07040')} />
      <rect x="18" y="152" width="444" height="8" rx="3" fill="url(#part-sheen)" />
      <rect x="18" y="78" width="444" height="76" rx="9" fill={gH('top', '#C4956A')} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1="28" y1={91 + i * 11} x2="452" y2={91 + i * 11} stroke="rgba(0,0,0,0.035)" strokeWidth="1.2" />
      ))}
      <rect x="18" y="78" width="444" height="76" rx="9" fill="url(#ct-tsheen)" />
      <rect x="18" y="78" width="444" height="76" rx="9" fill="none" stroke="#00000018" strokeWidth="1.5" />
      <rect x="52"  y="89" width="58" height="38" rx="4" fill="rgba(255,255,255,0.30)" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
      <rect x="57"  y="93" width="48" height="30" rx="2" fill="rgba(70,90,170,0.13)" />
      <rect x="166" y="94" width="40" height="28" rx="2" fill="rgba(255,255,255,0.38)" stroke="rgba(0,0,0,0.07)" strokeWidth="0.75" />
      <line x1="172" y1="102" x2="200" y2="102" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <line x1="172" y1="108" x2="200" y2="108" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <line x1="172" y1="114" x2="192" y2="114" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <rect x="209" y="99" width="36" height="4" rx="2" fill="rgba(50,30,10,0.38)" />
      <rect x="228" y="88" width="18" height="24" rx="5" fill="rgba(195,225,255,0.22)" stroke="rgba(170,205,240,0.45)" strokeWidth="0.8" />
      <ellipse cx="237" cy="88" rx="9" ry="4" fill="rgba(195,225,255,0.3)" stroke="rgba(170,205,240,0.4)" strokeWidth="0.7" />
      <ellipse cx="240" cy="90" rx="7" ry="3" fill="rgba(0,0,0,0.1)" />
      <rect x="276" y="94" width="40" height="28" rx="2" fill="rgba(255,255,255,0.38)" stroke="rgba(0,0,0,0.07)" strokeWidth="0.75" />
      <line x1="282" y1="102" x2="310" y2="102" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <line x1="282" y1="108" x2="310" y2="108" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <line x1="282" y1="114" x2="300" y2="114" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <rect x="370" y="89" width="58" height="38" rx="4" fill="rgba(255,255,255,0.30)" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
      <rect x="375" y="93" width="48" height="30" rx="2" fill="rgba(70,90,170,0.13)" />
    </svg>
  )
}


const svgMap = {
  cabinet:    KitchenCabinetSVG,
  wardrobe:   WardrobeSVG,
  tv:         TVConsoleSVG,
  shelving:   ShelvingSVG,
  conference: ConferenceTableSVG,
}

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

  const applyFinish  = (finish) => setTextures(prev => ({ ...prev, [selectedPart]: finish }))
  const applyToAll   = (finish) => {
    const all = {}
    selectedFurniture.parts.forEach(p => { all[p.id] = finish })
    setTextures(all)
  }
  const reset        = () => setTextures({})
  const saveDesign   = () => {
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
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-12 border-b border-stone-200 bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-1.5 text-stone-500 hover:text-primary transition-colors text-sm font-medium">
              <FiArrowLeft className="text-xs" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-5 bg-stone-200 hidden sm:block" />
            <div>
              <p className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-widest font-semibold leading-tight">Zenoboard Philippines</p>
              <h1 className="text-base sm:text-xl font-bold text-stone-800 leading-tight">Furniture Visualizer</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-12 py-4 sm:py-6 lg:py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4 sm:mb-6">
          {furniture.map(f => (
            <button key={f.id} onClick={() => handleFurnitureChange(f)}
              className={`shrink-0 flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                selectedFurniture.id === f.id
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-primary/30'
              }`}>
              <span className="text-sm">{f.icon}</span>
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-4 sm:gap-6 lg:gap-8">
          <div className="flex flex-col gap-4 order-1">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-stone-100" style={{ minHeight: 300 }}>
              <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-stone-100 rounded-2xl sm:rounded-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-stone-200/40 rounded-b-2xl sm:rounded-b-3xl pointer-events-none" />
              <button onClick={reset} className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-primary shadow-md hover:shadow-lg transition-all border border-stone-200 hover:border-primary/30 active:scale-95">
                <FiRefreshCw className="text-xs" /><span>Reset</span>
              </button>
              {textures[selectedPart] && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1.5 shadow-md border border-stone-100">
                  <FinishDot finish={textures[selectedPart]} size={16} />
                  <span className="text-xs font-semibold text-stone-700">{textures[selectedPart].name}</span>
                </div>
              )}
              <div className="relative z-10 flex items-center justify-center p-4 sm:p-8" style={{ minHeight: 300 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={selectedFurniture.id}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}
                    className="w-full max-w-[300px] sm:max-w-sm lg:max-w-md">
                    <FurnitureSVG textures={textures} parts={selectedFurniture.parts} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-stone-100 shadow-sm">
              <p className="text-[10px] sm:text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Select Part to Customize</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedFurniture.parts.map(part => (
                  <button key={part.id} onClick={() => setSelectedPart(part.id)}
                    className={`relative flex flex-col items-start gap-1 p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 border ${
                      selectedPart === part.id ? 'bg-primary/5 border-primary' : 'bg-stone-50 border-stone-100 hover:border-stone-300'
                    }`}>
                    {textures[part.id] && (
                      <span className="absolute top-2 right-2"><FinishDot finish={textures[part.id]} size={18} /></span>
                    )}
                    <span className={`font-bold text-[11px] sm:text-xs leading-tight pr-5 ${selectedPart === part.id ? 'text-primary' : 'text-stone-700'}`}>{part.label}</span>
                    <span className="text-stone-400 text-[10px]">{textures[part.id] ? textures[part.id].name : 'Not set'}</span>
                  </button>
                ))}
              </div>
            </div>

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
                    ) : <span className="text-xs text-stone-300 italic">Not set</span>}
                  </div>
                ))}
              </div>
              <button onClick={saveDesign} disabled={Object.keys(textures).length === 0}
                className="mt-4 w-full py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-800 text-white hover:bg-stone-900">
                {justSaved ? '✓ Design Saved!' : 'Save This Design'}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 order-2">
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
                    <motion.button key={finish.id} whileTap={{ scale: 0.97 }} onClick={() => applyFinish(finish)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all duration-200 text-left ${
                        isActive ? 'border-primary bg-primary/5 shadow-md' : 'border-stone-100 hover:border-stone-300 bg-stone-50'
                      }`}>
                      <FinishSwatch finish={finish} size={52} radius={10} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm ${isActive ? 'text-primary' : 'text-stone-800'}`}>{finish.name}</p>
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
              <button onClick={() => textures[selectedPart] && applyToAll(textures[selectedPart])} disabled={!textures[selectedPart]}
                className="w-full py-2.5 text-xs font-semibold text-primary border border-primary/20 bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
                Apply "{textures[selectedPart]?.name || '—'}" to all parts
              </button>
            </div>

            <div className="lg:hidden bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
              <p className="font-bold text-stone-800 text-sm mb-3">Your Design</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {selectedFurniture.parts.map(part => (
                  <div key={part.id} className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl">
                    {textures[part.id] ? <FinishSwatch finish={textures[part.id]} size={28} radius={6} /> : <div className="w-7 h-7 rounded-lg bg-stone-200 shrink-0" />}
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-stone-700 truncate">{part.label}</p>
                      <p className="text-[10px] text-stone-400 truncate">{textures[part.id]?.name || 'Not set'}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={saveDesign} disabled={Object.keys(textures).length === 0}
                className="w-full py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-800 text-white hover:bg-stone-900">
                {justSaved ? '✓ Design Saved!' : 'Save This Design'}
              </button>
            </div>

            {savedDesigns.length > 0 && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-100 shadow-sm">
                <p className="font-bold text-stone-800 text-sm mb-3">Saved Designs</p>
                <div className="flex flex-col gap-2">
                  {savedDesigns.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                      <span className="text-xs font-medium text-stone-700 truncate mr-2">{d.name}</span>
                      <div className="flex gap-1 shrink-0">
                        {Object.values(d.textures).slice(0, 4).map((t, j) => <FinishDot key={j} finish={t} size={20} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-primary rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-white">
              <p className="font-bold text-sm sm:text-base mb-1">Love your design?</p>
              <p className="text-white/70 text-xs mb-3 sm:mb-4 leading-relaxed">
                Get a quote using your selected Zenoboard finishes. Our team will reach out within 24 hours.
              </p>
              <Link to="/contact" className="block w-full text-center py-2.5 sm:py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-stone-100 transition-colors">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}