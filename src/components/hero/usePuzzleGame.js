import { useCallback, useEffect, useRef, useState } from "react"
import { isHome, shuffleLayout } from "./puzzleGeometry.mjs"

// Drag-and-drop state for the hero puzzle. Modes:
//   intro   – page just loaded, CSS entrance animation owns the pieces
//   playing – pieces shuffled; unlocked ones can be dragged, drop near home snaps
//   solved  – every piece locked after play
// Offsets are in viewBox units relative to each piece's home. Pointer
// move/up listen on window for the duration of a drag so the dragged piece
// can be re-ordered to the top of the SVG without losing the pointer.
const HOME = { x: 0, y: 0 }

const usePuzzleGame = (svgRef, total, viewBoxWidth) => {
  const [state, setState] = useState({
    mode: "intro",
    offsets: null,
    locked: null,
    active: null,
  })
  const seedRef = useRef(0)
  const dragRef = useRef(null)

  const shuffle = useCallback(() => {
    seedRef.current += 1
    setState({
      mode: "playing",
      offsets: shuffleLayout(seedRef.current),
      locked: Array(total).fill(false),
      active: null,
    })
  }, [total])

  const solve = useCallback(() => {
    dragRef.current = null
    setState({
      mode: "solved",
      offsets: Array(total).fill(HOME),
      locked: Array(total).fill(true),
      active: null,
    })
  }, [total])

  // Mirror of state for event handlers, so pointerdown can decide
  // synchronously (preventDefault must run during dispatch).
  const stateRef = useRef(state)
  stateRef.current = state

  const onPointerDown = useCallback(
    index => e => {
      const svg = svgRef.current
      const cur = stateRef.current
      if (!svg || cur.mode !== "playing" || cur.locked[index]) return
      e.preventDefault()
      const rect = svg.getBoundingClientRect()
      dragRef.current = {
        index,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        origin: cur.offsets[index],
        scale: viewBoxWidth / rect.width,
      }
      setState(prev => ({ ...prev, active: index }))
    },
    [svgRef, viewBoxWidth]
  )

  useEffect(() => {
    if (state.active === null) return undefined

    const onMove = e => {
      const d = dragRef.current
      if (!d || e.pointerId !== d.pointerId) return
      const x = d.origin.x + (e.clientX - d.startX) * d.scale
      const y = d.origin.y + (e.clientY - d.startY) * d.scale
      setState(prev => ({
        ...prev,
        offsets: prev.offsets.map((o, i) => (i === d.index ? { x, y } : o)),
      }))
    }

    const onUp = e => {
      const d = dragRef.current
      if (!d || e.pointerId !== d.pointerId) return
      dragRef.current = null
      setState(prev => {
        const snapped = isHome(prev.offsets[d.index])
        const offsets = snapped
          ? prev.offsets.map((o, i) => (i === d.index ? HOME : o))
          : prev.offsets
        const locked = snapped
          ? prev.locked.map((l, i) => (i === d.index ? true : l))
          : prev.locked
        const done = locked.every(Boolean)
        return {
          mode: done ? "solved" : "playing",
          offsets,
          locked,
          active: null,
        }
      })
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  }, [state.active])

  const placed = state.locked ? state.locked.filter(Boolean).length : total

  return { ...state, placed, shuffle, solve, onPointerDown }
}

export default usePuzzleGame
