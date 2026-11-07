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
  const [lost, setLost] = useState(false)
  // Render loop runs only while the hero is on screen and the tab is visible.
  // Starts false so a page opened at /#work does not spin an unseen scene.
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = heroRef?.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(true)
      return undefined
    }
    let inView = false
    let pageVisible = document.visibilityState === "visible"
    const update = () => {
      const next = inView && pageVisible
      setActive(next)
      if (process.env.NODE_ENV !== "production") window.__heroActive = next
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        update()
      },
      { threshold: 0 }
    )
    io.observe(el)
    const onVisibility = () => {
      pageVisible = document.visibilityState === "visible"
      update()
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [heroRef])

  useEffect(() => {
    // Decide (and fetch the three.js chunk) only once the browser is idle, so
    // the hero copy and LCP are never behind ~190 KB of WebGL code.
    const decide = () => {
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
          viewportWidth: window.innerWidth,
        })
      )
    }
    const idle = window.requestIdleCallback
    const handle = idle
      ? idle(decide, { timeout: 2000 })
      : window.setTimeout(decide, 300)
    return () => {
      if (idle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
  }, [])

  if (supported !== true || lost) return <HeroSceneFallback />
  return (
    <HeroScene
      active={active}
      heroRef={heroRef}
      onContextLost={() => setLost(true)}
    />
  )
}

export default HeroSceneLoader
