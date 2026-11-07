import { test } from "node:test"
import assert from "node:assert/strict"
import {
  shouldRenderScene,
  normalizePointer,
  scrollProgress,
  detectWebGL,
} from "../src/components/three/sceneSupport.mjs"

// three@0.187 only creates WebGL2 contexts, so the probe must ask for webgl2
// and must release the probe context afterwards.
const fakeCanvas = ({ webgl2, throws } = {}) => {
  const calls = []
  let lost = false
  return {
    calls,
    isLost: () => lost,
    getContext(kind) {
      calls.push(kind)
      if (throws) throw new Error("no gl")
      if (kind !== "webgl2" || !webgl2) return null
      return {
        getExtension: name =>
          name === "WEBGL_lose_context" ? { loseContext: () => (lost = true) } : null,
      }
    },
  }
}

test("detectWebGL asks for webgl2 only and releases the probe context", () => {
  const c = fakeCanvas({ webgl2: true })
  assert.equal(detectWebGL(() => c), true)
  assert.deepEqual(c.calls, ["webgl2"])
  assert.equal(c.isLost(), true)
})

test("detectWebGL is false without webgl2 or when the probe throws", () => {
  assert.equal(detectWebGL(() => fakeCanvas({ webgl2: false })), false)
  assert.equal(detectWebGL(() => fakeCanvas({ throws: true })), false)
})

test("renders when capable and deviceMemory is unknown", () => {
  assert.equal(shouldRenderScene({ reducedMotion: false, webgl: true }), true)
  assert.equal(
    shouldRenderScene({ reducedMotion: false, webgl: true, deviceMemory: undefined }),
    true
  )
})

test("falls back on reduced motion, no webgl, or low memory", () => {
  assert.equal(shouldRenderScene({ reducedMotion: true, webgl: true }), false)
  assert.equal(shouldRenderScene({ reducedMotion: false, webgl: false }), false)
  assert.equal(
    shouldRenderScene({ reducedMotion: false, webgl: true, deviceMemory: 2 }),
    false
  )
  assert.equal(
    shouldRenderScene({ reducedMotion: false, webgl: true, deviceMemory: 4 }),
    true
  )
})

test("falls back on phone-sized viewports, unknown width counts as wide", () => {
  assert.equal(
    shouldRenderScene({ reducedMotion: false, webgl: true, viewportWidth: 412 }),
    false
  )
  assert.equal(
    shouldRenderScene({ reducedMotion: false, webgl: true, viewportWidth: 767 }),
    false
  )
  assert.equal(
    shouldRenderScene({ reducedMotion: false, webgl: true, viewportWidth: 768 }),
    true
  )
  assert.equal(
    shouldRenderScene({ reducedMotion: false, webgl: true, viewportWidth: undefined }),
    true
  )
})

test("normalizePointer maps viewport to -1..1 with y up", () => {
  assert.deepEqual(normalizePointer(0, 0, 800, 600), { x: -1, y: 1 })
  assert.deepEqual(normalizePointer(800, 600, 800, 600), { x: 1, y: -1 })
  assert.deepEqual(normalizePointer(400, 300, 800, 600), { x: 0, y: 0 })
})

test("scrollProgress clamps and tolerates zero height", () => {
  assert.equal(scrollProgress(0, 600), 0)
  assert.equal(scrollProgress(300, 600), 0.5)
  assert.equal(scrollProgress(900, 600), 1)
  assert.equal(scrollProgress(100, 0), 0)
})
