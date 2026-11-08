import React from "react"
import { pieces } from "./puzzleGeometry.mjs"

// Twelve jigsaw pieces that fly in and assemble into a monochrome app
// window. The artwork is drawn once (in <defs>) and each piece shows its
// own clipped copy, so the pieces can move independently. Entrance and
// idle float are CSS keyframes (see hero-product.scss): they start at
// first paint, need no hydration, and honour prefers-reduced-motion.
const PIECES = pieces()

const BAR_HEIGHTS = [36, 58, 46, 78, 64, 92, 54]

const Artwork = () => (
  <g id="hero-product-art">
    <clipPath id="hero-window-clip">
      <rect x="0.5" y="0.5" width="479" height="329" rx="14" />
    </clipPath>
    <rect
      x="0.5"
      y="0.5"
      width="479"
      height="329"
      rx="14"
      fill="#ffffff"
      stroke="#e5e5e5"
    />
    <g clipPath="url(#hero-window-clip)">
      <rect x="0.5" y="28" width="96" height="301" fill="#fafafa" />
    </g>
    <line x1="0" y1="28" x2="480" y2="28" stroke="#e5e5e5" />
    <line x1="96" y1="28" x2="96" y2="330" stroke="#e5e5e5" />
    {[18, 32, 46].map(cx => (
      <circle key={cx} cx={cx} cy="14" r="4" fill="#d9d9d9" />
    ))}
    {[0, 1, 2, 3, 4].map(i => (
      <rect
        key={i}
        x="14"
        y={48 + i * 26}
        width="68"
        height="8"
        rx="4"
        fill={i === 1 ? "#111111" : "#e5e5e5"}
      />
    ))}
    <rect x="120" y="52" width="150" height="12" rx="6" fill="#111111" />
    <rect x="120" y="72" width="220" height="8" rx="4" fill="#e5e5e5" />
    <rect x="380" y="48" width="82" height="28" rx="6" fill="#111111" />
    <rect x="398" y="59" width="46" height="6" rx="3" fill="#ffffff" />
    {[0, 1, 2].map(i => {
      const x = 120 + i * 118
      return (
        <g key={i}>
          <rect
            x={x}
            y="96"
            width="106"
            height="58"
            rx="8"
            fill="#ffffff"
            stroke="#e5e5e5"
          />
          <rect
            x={x + 12}
            y="108"
            width="40"
            height="6"
            rx="3"
            fill="#e5e5e5"
          />
          <rect
            x={x + 12}
            y="126"
            width="58"
            height="12"
            rx="6"
            fill="#111111"
          />
        </g>
      )
    })}
    <rect
      x="120"
      y="170"
      width="342"
      height="120"
      rx="8"
      fill="#ffffff"
      stroke="#e5e5e5"
    />
    {BAR_HEIGHTS.map((h, i) => (
      <rect
        key={i}
        x={140 + i * 46}
        y={272 - h}
        width="26"
        height={h}
        rx="3"
        fill={i === 5 ? "#111111" : "#d9d9d9"}
      />
    ))}
  </g>
)

const PuzzleProduct = () => (
  <div className="hero-product" aria-hidden="true">
    <div className="hero-product-float">
      <svg className="hero-product-svg" viewBox="0 0 480 330" focusable="false">
        <defs>
          <Artwork />
          {PIECES.map(p => (
            <clipPath key={p.index} id={`hero-piece-${p.index}`}>
              <path d={p.d} />
            </clipPath>
          ))}
        </defs>
        {PIECES.map(p => (
          <g
            key={p.index}
            className="hero-piece"
            style={{
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot": `${p.rot}deg`,
              "--delay": `${p.delay}s`,
            }}
          >
            <g clipPath={`url(#hero-piece-${p.index})`}>
              <use href="#hero-product-art" />
            </g>
            <path className="hero-piece-seam" d={p.d} />
          </g>
        ))}
      </svg>
    </div>
  </div>
)

export default PuzzleProduct
