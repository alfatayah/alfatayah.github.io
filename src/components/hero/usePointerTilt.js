import { useEffect } from "react"

// Tilts the element towards the pointer (max ±maxDeg) via perspective
// rotateX/rotateY. Same pattern as EyeFace: window pointermove, touch
// ignored, one rAF per frame, off under prefers-reduced-motion. Writes
// only this element's transform; the float animation lives on a child.
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

const usePointerTilt = (ref, { maxDeg = 4, reach = 420 } = {}) => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduce.matches) return undefined

    let frame = null
    let point = null

    const update = () => {
      frame = null
      const el = ref.current
      if (!el || !point) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = clamp((point.x - cx) / reach, -1, 1)
      const ny = clamp((point.y - cy) / reach, -1, 1)
      const rx = (-ny * maxDeg).toFixed(2)
      const ry = (nx * maxDeg).toFixed(2)
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
    }

    const onMove = e => {
      if (e.pointerType === "touch") return
      point = { x: e.clientX, y: e.clientY }
      if (frame === null) frame = window.requestAnimationFrame(update)
    }

    const onLeave = e => {
      if (e.relatedTarget !== null) return
      point = null
      if (frame !== null) {
        window.cancelAnimationFrame(frame)
        frame = null
      }
      if (ref.current) ref.current.style.transform = ""
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerout", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerout", onLeave)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [ref, maxDeg, reach])
}

export default usePointerTilt
