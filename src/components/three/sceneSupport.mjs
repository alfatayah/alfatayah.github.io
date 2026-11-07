// Pure helpers for the hero 3D scene. No imports, so they run under
// `node --test` and inside the browser bundle alike.

/**
 * Decide whether the WebGL scene should be mounted at all.
 * Unknown deviceMemory (Firefox, Safari) counts as capable.
 */
export function shouldRenderScene({ reducedMotion, webgl, deviceMemory }) {
  if (reducedMotion) return false
  if (!webgl) return false
  if (typeof deviceMemory === "number" && deviceMemory < 4) return false
  return true
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
