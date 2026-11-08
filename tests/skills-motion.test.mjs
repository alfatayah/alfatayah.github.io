import { test } from "node:test"
import assert from "node:assert/strict"
import {
  gridVariants,
  itemVariants,
  skillCustom,
} from "../src/components/skillsMotion.mjs"
import { skillScatter } from "../src/components/hero/puzzleGeometry.mjs"

// The centre-out delay lives in the grid's orchestration (delayChildren),
// never in the item's own transition: Framer reuses an item variant's
// transition when a hover gesture ends, so a delay there makes the un-hover
// lag by the entrance delay.
test("entrance delay is orchestrated by the grid, per child", () => {
  const { delayChildren } = gridVariants.visible.transition
  assert.equal(typeof delayChildren, "function")
  for (let i = 0; i < 8; i++)
    assert.equal(delayChildren(i, 8), skillScatter(i, 8).delay)
  assert.equal(delayChildren(8, 9), skillScatter(8, 9).delay)
})

test("item variants carry no delay of their own", () => {
  const c = skillCustom(7, 8, false)
  const visible = itemVariants.visible(c)
  assert.equal(visible.transition.delay, undefined)
  assert.equal(visible.transition.opacity.delay, undefined)
  assert.deepEqual(
    {
      opacity: visible.opacity,
      x: visible.x,
      y: visible.y,
      rotate: visible.rotate,
    },
    { opacity: 1, x: 0, y: 0, rotate: 0 }
  )
  const hidden = itemVariants.hidden(c)
  assert.equal(hidden.opacity, 0)
  assert.equal(hidden.x, c.x)
  assert.equal(hidden.y, c.y)
  assert.equal(hidden.rotate, c.rotate)
})

test("skillCustom scatters normally and only fades under reduced motion", () => {
  const { x, y, rotate } = skillScatter(3, 8)
  assert.deepEqual(skillCustom(3, 8, false), { x, y, rotate })
  assert.deepEqual(skillCustom(3, 8, true), { x: 0, y: 0, rotate: 0 })
})
