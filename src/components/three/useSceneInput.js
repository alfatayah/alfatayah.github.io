import { useEffect, useRef } from "react"
import { normalizePointer, scrollProgress } from "./sceneSupport.mjs"

/**
 * Cursor position (-1..1, y up) and hero scroll progress (0..1), kept in refs
 * so the render loop can read them every frame without re-rendering React.
 * Touch pointers are ignored: a finger scrolling the page should not tilt
 * the object.
 */
export default function useSceneInput(heroRef) {
  const pointer = useRef({ x: 0, y: 0 })
  const scroll = useRef({ progress: 0 })

  useEffect(() => {
    let frame = null
    let nextPointer = null

    const flush = () => {
      frame = null
      if (nextPointer) {
        pointer.current.x = nextPointer.x
        pointer.current.y = nextPointer.y
        nextPointer = null
      }
      const heroHeight = heroRef?.current ? heroRef.current.offsetHeight : 0
      scroll.current.progress = scrollProgress(window.scrollY, heroHeight)
    }
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(flush)
    }
    const onPointer = e => {
      if (e.pointerType === "touch") return
      nextPointer = normalizePointer(
        e.clientX,
        e.clientY,
        window.innerWidth,
        window.innerHeight
      )
      schedule()
    }
    const onScroll = () => schedule()

    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    flush()
    if (process.env.NODE_ENV !== "production") {
      window.__heroInput = { pointer, scroll }
    }
    return () => {
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("scroll", onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [heroRef])

  return { pointer, scroll }
}
