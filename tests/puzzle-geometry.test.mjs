import { test } from "node:test"
import assert from "node:assert/strict"
import {
  GRID,
  edgeSign,
  piecePath,
  scatterOffset,
  pieceOrder,
  enterDelay,
  pieces,
  shuffleLayout,
  isHome,
  SNAP_RADIUS,
} from "../src/components/hero/puzzleGeometry.mjs"

test("outer edges are straight, inner edges are tabs or blanks", () => {
  assert.equal(edgeSign(0, 0, "top"), 0)
  assert.equal(edgeSign(0, 0, "left"), 0)
  assert.equal(edgeSign(2, 3, "bottom"), 0)
  assert.equal(edgeSign(2, 3, "right"), 0)
  assert.ok([1, -1].includes(edgeSign(0, 0, "right")))
  assert.ok([1, -1].includes(edgeSign(0, 0, "bottom")))
})

test("neighbouring pieces interlock", () => {
  for (let r = 0; r < GRID.rows; r++)
    for (let c = 0; c < GRID.cols; c++) {
      if (c + 1 < GRID.cols)
        assert.equal(edgeSign(r, c, "right"), -edgeSign(r, c + 1, "left"))
      if (r + 1 < GRID.rows)
        assert.equal(edgeSign(r, c, "bottom"), -edgeSign(r + 1, c, "top"))
    }
})

test("piecePath is a closed absolute path starting at the cell origin", () => {
  const d = piecePath({ row: 1, col: 2, ...GRID })
  assert.ok(d.startsWith("M240 110"), d.slice(0, 20))
  assert.ok(d.trim().endsWith("Z"))
  // 4 inner edges → 4 arcs; corner piece (0,0) has 2 inner edges → 2 arcs
  assert.equal((d.match(/A/g) || []).length, 4)
  assert.equal(
    (piecePath({ row: 0, col: 0, ...GRID }).match(/A/g) || []).length,
    2
  )
})

test("piecePath stays inside the cell plus one knob", () => {
  const d = piecePath({ row: 0, col: 3, ...GRID })
  const nums = d
    .replace(/A\S* \S* \S* \S* \S* /g, "A ")
    .match(/-?\d+(\.\d+)?/g)
    .map(Number)
  const xs = nums.filter((_, i) => i % 2 === 0)
  const ys = nums.filter((_, i) => i % 2 === 1)
  assert.ok(Math.max(...xs) <= 480 && Math.min(...xs) >= 360 - GRID.knob)
  assert.ok(Math.min(...ys) >= 0 && Math.max(...ys) <= 110 + GRID.knob)
})

test("scatterOffset is deterministic and within range", () => {
  assert.deepEqual(scatterOffset(3, 12), scatterOffset(3, 12))
  for (let i = 0; i < 12; i++) {
    const { dx, dy, rot } = scatterOffset(i, 12)
    const dist = Math.hypot(dx, dy)
    assert.ok(dist >= 160 && dist <= 260, `dist ${dist}`)
    assert.ok(rot >= -25 && rot <= 25)
  }
})

test("pieceOrder starts from the centre and covers every piece once", () => {
  const order = pieceOrder(4, 3)
  assert.equal(order.length, 12)
  assert.deepEqual(
    [...order].sort((a, b) => a - b),
    [...Array(12).keys()]
  )
  assert.ok([5, 6].includes(order[0])) // row 1, col 1 or 2
  assert.ok([0, 3, 8, 11].includes(order[11])) // a corner last
})

test("enterDelay and pieces() wire everything together", () => {
  assert.equal(enterDelay(0), 0)
  assert.equal(enterDelay(3), 0.21)
  const all = pieces()
  assert.equal(all.length, 12)
  assert.equal(all[0].index, 0)
  assert.ok(all[5].delay < all[0].delay) // centre piece enters before corner
  assert.ok(all.every(p => p.d.startsWith("M") && typeof p.dx === "number"))
})

test("pieces() carry their own centre for the rotation pivot", () => {
  const all = pieces()
  // index 5 = row 1, col 1 → centre of that cell in viewBox units
  assert.equal(all[5].ox, 180)
  assert.equal(all[5].oy, 165)
  assert.equal(all[0].ox, 60)
  assert.equal(all[0].oy, 55)
})

test("shuffleLayout moves every piece off its home cell and keeps it in the viewBox", () => {
  const layout = shuffleLayout(1)
  assert.equal(layout.length, 12)
  layout.forEach(({ x, y }, i) => {
    assert.ok(Math.hypot(x, y) > 40, `piece ${i} still near home`)
    const col = i % GRID.cols
    const row = Math.floor(i / GRID.cols)
    const ax = col * GRID.cellW + x
    const ay = row * GRID.cellH + y
    assert.ok(ax >= 0 && ax <= 480 - GRID.cellW, `piece ${i} x ${ax}`)
    assert.ok(ay >= 0 && ay <= 330 - GRID.cellH, `piece ${i} y ${ay}`)
  })
})

test("shuffleLayout is deterministic per seed and differs between seeds", () => {
  assert.deepEqual(shuffleLayout(3), shuffleLayout(3))
  assert.notDeepEqual(shuffleLayout(3), shuffleLayout(4))
})

test("isHome snaps only within the radius", () => {
  assert.equal(SNAP_RADIUS, 18)
  assert.equal(isHome({ x: 10, y: -12 }), true) // 15.6 away
  assert.equal(isHome({ x: 18, y: 0 }), true)
  assert.equal(isHome({ x: 13, y: 13 }), false) // 18.4 away
  assert.equal(isHome({ x: 0, y: 0 }), true)
})
