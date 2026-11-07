// Pure helpers for the hero 3D scene. No imports, so they run under
// `node --test` and inside the browser bundle alike.

// Measured: with the scene on a 412px viewport Lighthouse mobile scored 79-92
// (TBT 160-230 ms, LCP 2.9-4.1 s); with the fallback 95-96 (TBT 10 ms).
export const MIN_SCENE_VIEWPORT = 768 // px; phones get the static fallback

/**
 * Decide whether the WebGL scene should be mounted at all.
 * Unknown deviceMemory (Firefox, Safari) and unknown viewport width count as
 * capable. Phone-sized viewports always get the fallback: parsing three.js
 * on a throttled mobile CPU costs ~1.8 s of main-thread time.
 */
export function shouldRenderScene({
  reducedMotion,
  webgl,
  deviceMemory,
  viewportWidth,
}) {
  if (reducedMotion) return false
  if (!webgl) return false
  if (typeof deviceMemory === "number" && deviceMemory < 4) return false
  if (typeof viewportWidth === "number" && viewportWidth < MIN_SCENE_VIEWPORT)
    return false
  return true
}

/**
 * three.js (r163+) only creates WebGL2 contexts, so probe for webgl2 — a
 * WebGL1-only browser would otherwise pass the probe and crash the scene.
 * The probe context is released so it does not count toward the browser's
 * context limit. `createCanvas` is injected so this runs under node --test.
 */
export function detectWebGL(createCanvas) {
  try {
    const gl = createCanvas().getContext("webgl2")
    if (!gl) return false
    const ext = gl.getExtension && gl.getExtension("WEBGL_lose_context")
    if (ext && ext.loseContext) ext.loseContext()
    return true
  } catch (e) {
    return false
  }
}

/** Map a viewport position to -1..1 on both axes, with +y pointing up. */
export function normalizePointer(clientX, clientY, width, height) {
  const x = (clientX / width) * 2 - 1
  const y = 1 - (clientY / height) * 2 // written this way so the centre is +0, not -0
  return { x, y }
}

/** How far the hero has been scrolled out of view, clamped to 0..1. */
export function scrollProgress(scrollY, heroHeight) {
  if (!(heroHeight > 0)) return 0
  return Math.min(1, Math.max(0, scrollY / heroHeight))
}
