import React, { useEffect, useState } from "react"
import loadable from "@loadable/component"
import HeroSceneFallback from "./HeroSceneFallback"
import { shouldRenderScene } from "./sceneSupport.mjs"

// The only place the scene chunk is referenced. `ssr: false` keeps three.js
// out of Gatsby's static build; the fallback is what the HTML contains.
const HeroScene = loadable(() => import("./HeroScene"), {
  ssr: false,
  fallback: <HeroSceneFallback />,
})

const HeroSceneLoader = ({ heroRef }) => {
  const [supported, setSupported] = useState(null)

  useEffect(() => {
    let webgl = false
    try {
      webgl = !!document.createElement("canvas").getContext("webgl")
    } catch (e) {
      webgl = false
    }
    setSupported(
      shouldRenderScene({
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches,
        webgl,
        deviceMemory: navigator.deviceMemory,
      })
    )
  }, [])

  if (supported !== true) return <HeroSceneFallback />
  return <HeroScene active heroRef={heroRef} />
}

export default HeroSceneLoader
