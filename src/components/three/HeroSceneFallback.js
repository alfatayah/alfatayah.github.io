import React from "react"
import heroFallback from "../../images/hero-fallback.svg"

// Static stand-in for the WebGL scene: used in the SSR HTML, while the scene
// chunk loads, and permanently when the device should not run WebGL.
const HeroSceneFallback = () => (
  <div className="hero-scene hero-scene--fallback" aria-hidden="true">
    <img src={heroFallback} alt="" width="800" height="800" />
  </div>
)

export default HeroSceneFallback
