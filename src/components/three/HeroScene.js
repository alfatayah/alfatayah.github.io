import React, { useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import HeroObject from "./HeroObject"
import useSceneInput from "./useSceneInput"

// R3F v8 does not restart the loop when frameloop flips from "never" to
// "always"; one invalidate() kicks it back into continuous rendering.
const ResumeLoop = ({ active }) => {
  const invalidate = useThree(s => s.invalidate)
  useEffect(() => {
    if (active) invalidate()
  }, [active, invalidate])
  return null
}

// The only module (with HeroObject) that imports three / R3F / drei.
// Loaded client-side only via HeroSceneLoader.
const HeroScene = ({ active = true, heroRef, onContextLost }) => {
  const { pointer, scroll } = useSceneInput(heroRef)

  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 40 }}
        frameloop={active ? "always" : "never"}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", e => {
            e.preventDefault()
            if (onContextLost) onContextLost()
          })
        }}
      >
        <ResumeLoop active={active} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <HeroObject pointer={pointer} scroll={scroll} />
      </Canvas>
    </div>
  )
}

export default HeroScene
