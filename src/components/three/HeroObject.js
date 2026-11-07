import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

const SPIN_SPEED = 0.157 // rad/s → one turn ≈ 40 s
const TILT_X = 0.35
const TILT_Y = 0.5
const LERP = 0.06
const NARROW_VIEWPORT = 4.5 // world units; below this (phones) centre + dim
const NARROW_SCALE = 0.7
const NARROW_OPACITY = 0.45
const RADIUS = 1.15
const POS_X = 2.0 // right of centre on desktop so the heading stays clear
const POS_Y = 0.35
const ENTER_DELAY = 0.2 // s, lines up with the Framer Motion text stagger
const ENTER_DURATION = 0.9

// easeOutBack: overshoots slightly then settles
const easeOutBack = x => 1 + 2.70158 * (x - 1) ** 3 + 1.70158 * (x - 1) ** 2
const clamp01 = v => Math.min(1, Math.max(0, v))

/**
 * Monochrome, softly undulating icosahedron with a faint wireframe shell.
 * Idles with a slow spin and leans toward the cursor.
 */
const HeroObject = ({ pointer, scroll }) => {
  const group = useRef()
  const solidMat = useRef()
  const wireMat = useRef()
  // `elapsed` accumulates delta: R3F resets clock.elapsedTime when frameloop
  // flips, so the clock cannot time the entrance.
  const anim = useRef({ spin: 0, tiltX: 0, tiltY: 0, elapsed: 0 })
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(RADIUS, 4), [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const a = anim.current
    const p = pointer.current
    const progress = scroll.current.progress // 0 at top, 1 once hero is gone

    a.elapsed += delta
    const enter = easeOutBack(
      clamp01((a.elapsed - ENTER_DELAY) / ENTER_DURATION)
    )
    const narrow = state.viewport.width < NARROW_VIEWPORT
    g.scale.setScalar(enter * (narrow ? NARROW_SCALE : 1))

    // scrolling away spins it faster, lifts it, and fades it out
    a.spin += delta * SPIN_SPEED * (1 + progress * 2)
    a.tiltX = THREE.MathUtils.lerp(a.tiltX, -p.y * TILT_X, LERP)
    a.tiltY = THREE.MathUtils.lerp(a.tiltY, p.x * TILT_Y, LERP)
    g.rotation.set(a.tiltX, a.spin + a.tiltY, 0)

    // keep the whole body inside the viewport on tablet-ish widths
    const maxX = state.viewport.width / 2 - RADIUS - 0.15
    g.position.x = narrow ? 0 : Math.min(POS_X, maxX)
    g.position.y = POS_Y + progress * 1.2
    const opacityBase = (narrow ? NARROW_OPACITY : 1) * (1 - progress * 0.9)
    if (solidMat.current) solidMat.current.opacity = opacityBase
    if (wireMat.current) wireMat.current.opacity = opacityBase * 0.16

    if (process.env.NODE_ENV !== "production") {
      window.__heroFrames = (window.__heroFrames || 0) + 1
    }
  })

  return (
    <group ref={group} position={[POS_X, POS_Y, 0]}>
      {/* light body so the black heading stays readable when they overlap */}
      <mesh geometry={geometry}>
        <MeshDistortMaterial
          ref={solidMat}
          color="#d9d9d9"
          roughness={0.55}
          metalness={0}
          distort={0.28}
          speed={1.2}
          transparent
        />
      </mesh>
      <mesh geometry={geometry} scale={1.01}>
        <MeshDistortMaterial
          ref={wireMat}
          wireframe
          color="#111111"
          distort={0.28}
          speed={1.2}
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  )
}

export default HeroObject
