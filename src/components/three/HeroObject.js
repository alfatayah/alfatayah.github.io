import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

const SPIN_SPEED = 0.157 // rad/s → one turn ≈ 40 s
const TILT_X = 0.35
const TILT_Y = 0.5
const LERP = 0.06
const NARROW_VIEWPORT = 4.5 // world units; below this (phones) centre + dim
const RADIUS = 1.15
const POS_X = 2.0 // right of centre on desktop so the heading stays clear
const POS_Y = 0.35

/**
 * Monochrome, softly undulating icosahedron with a faint wireframe shell.
 * Idles with a slow spin and leans toward the cursor.
 */
const HeroObject = ({ pointer, scroll }) => {
  const group = useRef()
  const solidMat = useRef()
  const wireMat = useRef()
  const anim = useRef({ spin: 0, tiltX: 0, tiltY: 0 })
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(RADIUS, 4), [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const a = anim.current
    const p = pointer.current

    a.spin += delta * SPIN_SPEED
    a.tiltX = THREE.MathUtils.lerp(a.tiltX, -p.y * TILT_X, LERP)
    a.tiltY = THREE.MathUtils.lerp(a.tiltY, p.x * TILT_Y, LERP)
    g.rotation.set(a.tiltX, a.spin + a.tiltY, 0)

    const narrow = state.viewport.width < NARROW_VIEWPORT
    g.position.x = narrow ? 0 : POS_X
    const opacityBase = narrow ? 0.5 : 1
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
