import { test } from "node:test"
import assert from "node:assert/strict"
import {
  shouldRenderScene,
  normalizePointer,
  scrollProgress,
} from "../src/components/three/sceneSupport.mjs"

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
