import React, { useEffect, useState } from "react"
import loadable from "@loadable/component"
import HeroSceneFallback from "./HeroSceneFallback"
import { shouldRenderScene, detectWebGL } from "./sceneSupport.mjs"

// The only place the scene chunk is referenced. `ssr: false` keeps three.js
// out of Gatsby's static build. No loadable fallback: the static fallback
// below stays mounted underneath the canvas until the first frame renders.
const HeroScene = loadable(() => import("./HeroScene"), { ssr: false })

// Anything thrown while loading or rendering the scene (chunk fetch failure,
// WebGL context creation error) must cost the visitor the scene, never the
// page: React 18 unmounts the whole root on an uncaught render error.
class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    if (this.props.onError) this.props.onError(error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

const HeroSceneLoader = ({ heroRef }) => {
  const [supported, setSupported] = useState(null)
  const [lost, setLost] = useState(false)
  const [ready, setReady] = useState(false) // scene has drawn its first frame
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
      setSupported(
        shouldRenderScene({
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches,
          webgl: detectWebGL(() => document.createElement("canvas")),
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

  const showScene = supported === true && !lost

  return (
    <>
      <HeroSceneFallback hidden={showScene && ready} />
      {showScene && (
        <SceneErrorBoundary onError={() => setLost(true)}>
          <HeroScene
            active={active}
            visible={ready}
            heroRef={heroRef}
            onContextLost={() => setLost(true)}
            onReady={() => setReady(true)}
          />
        </SceneErrorBoundary>
      )}
    </>
  )
}

export default HeroSceneLoader
