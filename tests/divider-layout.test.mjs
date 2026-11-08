import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dividerPath } from "../src/components/hero/puzzleGeometry.mjs"

// The flanking lines must sit on the knob's baseline, not on the centre of
// the 40 px row: the SVG is 40 px tall, its horizontal segments are at the
// path's baseline, so the lines are pushed to the bottom of the row and
// lifted by (height − baseline − half the 1 px line).
const scss = readFileSync(
  new URL("../src/styles/divider.scss", import.meta.url),
  "utf8"
)
const block = name => scss.slice(scss.indexOf(name)).split("\n}")[0]

test("divider lines are aligned to the knob baseline, not the row centre", () => {
  const baseline = Number(dividerPath().match(/^M0 (\d+(?:\.\d+)?) /)[1])
  assert.equal(baseline, 34)
  const wrapper = block(".puzzle-divider {")
  assert.ok(/align-items:\s*flex-end/.test(wrapper), wrapper)
  assert.ok(!/align-items:\s*center/.test(wrapper), wrapper)
  const line = block(".puzzle-divider-line {")
  const lift = 40 - baseline - 0.5
  assert.ok(
    line.includes(`margin-bottom: ${lift}px`),
    `expected margin-bottom: ${lift}px in
${line}`
  )
})
