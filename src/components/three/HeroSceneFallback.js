import React from "react"

// Static stand-in for the WebGL scene, inlined as SVG (~1.5 KB, no request,
// nothing to decode) so it can never be the page's LCP image. It is in the
// SSR HTML, sits under the canvas until the first frame, and stays for good
// on devices that do not run the scene.
const R = 300
const C = 400
const lines = []
for (let i = 1; i < 6; i++) {
  const ry = (R * i) / 6
  lines.push(<ellipse key={`lat${i}`} cx={C} cy={C} rx={R} ry={ry} />)
  lines.push(<ellipse key={`lon${i}`} cx={C} cy={C} rx={ry} ry={R} />)
}

const HeroSceneFallback = ({ hidden = false }) => (
  <div
    className={`hero-scene hero-scene--fallback${hidden ? " is-hidden" : ""}`}
    aria-hidden="true"
  >
    <svg
      className="hero-fallback-art"
      viewBox="0 0 800 800"
      width="800"
      height="800"
      focusable="false"
    >
      <defs>
        <radialGradient id="hero-fallback-body" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#f2f2f2" />
          <stop offset="0.6" stopColor="#d9d9d9" />
          <stop offset="1" stopColor="#9a9a9a" />
        </radialGradient>
        <clipPath id="hero-fallback-clip">
          <circle cx={C} cy={C} r={R} />
        </clipPath>
      </defs>
      <circle cx={C} cy={C} r={R} fill="url(#hero-fallback-body)" />
      <g
        clipPath="url(#hero-fallback-clip)"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      >
        {lines}
        <line x1={C - R} y1={C} x2={C + R} y2={C} />
        <line x1={C} y1={C - R} x2={C} y2={C + R} />
      </g>
    </svg>
  </div>
)

export default HeroSceneFallback
