import React, { useEffect, useRef } from "react"
import faceImg from "../../images/face-eyeless.png"

// Coordinates are in the original 150x150 icon space (cropped by viewBox).
// The face artwork has no eyes: the pupils live *behind* it, so the bangs
// naturally overlap them and they can slide around freely.
const VIEWBOX = "25 7 98 124"
// Drawn a hair larger than the holes in the artwork so no white rim shows.
const PUPILS = [
  { cx: 69.5, cy: 70, rx: 5.1, ry: 6.6 },
  { cx: 100, cy: 69, rx: 4.6, ry: 6.6 },
]
const MAX_X = 4 // max horizontal travel (icon units)
const MAX_Y = 3.2 // max vertical travel
const FULL_REACH = 260 // cursor distance (px) at which eyes reach max travel

const EyeFace = ({ className = "" }) => {
  const svgRef = useRef(null)
  const eyesRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduce.matches) return undefined

    let frame = null
    let point = null

    const update = () => {
      frame = null
      const svg = svgRef.current
      const eyes = eyesRef.current
      if (!svg || !eyes || !point) return
      const rect = svg.getBoundingClientRect()
      // Aim from the eyes' position, not the middle of the box
      const cx = rect.left + rect.width * 0.62
      const cy = rect.top + rect.height * 0.55
      const dx = point.x - cx
      const dy = point.y - cy
      const dist = Math.hypot(dx, dy) || 1
      const reach = Math.min(1, dist / FULL_REACH)
      const x = (dx / dist) * reach * MAX_X
      const y = (dy / dist) * reach * MAX_Y
      eyes.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`
    }

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update)
    }
    const onPointer = e => {
      point = { x: e.clientX, y: e.clientY }
      schedule()
    }
    const onTouch = e => {
      const t = e.touches && e.touches[0]
      if (!t) return
      point = { x: t.clientX, y: t.clientY }
      schedule()
    }
    // Page scroll moves the face under a still cursor
    const onScroll = () => point && schedule()

    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("scroll", onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className={`eye-face ${className}`}
      viewBox={VIEWBOX}
      role="img"
      aria-label="Fadhil"
    >
      <g ref={eyesRef} className="eye-face-eyes">
        {PUPILS.map((p, i) => (
          <ellipse key={i} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill="#0d0d0d" />
        ))}
      </g>
      <image href={faceImg} x="25" y="7" width="98" height="124" />
    </svg>
  )
}

export default EyeFace
