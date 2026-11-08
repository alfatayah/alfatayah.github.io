// Pure geometry for the hero puzzle: which edges are tabs or blanks, the
// jigsaw outline of each piece, where each piece starts before flying in,
// and the order they arrive. No DOM, no randomness: the server-rendered
// HTML and the client must produce byte-identical output.

export const GRID = { cols: 4, rows: 3, cellW: 120, cellH: 110, knob: 14 }

const round = n => Number(n.toFixed(2))

// +1 = tab (bulges out of this piece), -1 = blank (cut into this piece),
// 0 = straight outer edge. Right/bottom are the "owning" sides; left/top
// mirror the neighbour so adjacent pieces always interlock.
export const edgeSign = (
  row,
  col,
  side,
  cols = GRID.cols,
  rows = GRID.rows
) => {
  switch (side) {
    case "right":
      return col + 1 >= cols ? 0 : (row + col) % 2 === 0 ? 1 : -1
    case "bottom":
      return row + 1 >= rows ? 0 : (row + col) % 2 === 0 ? -1 : 1
    case "left":
      return col === 0 ? 0 : -edgeSign(row, col - 1, "right", cols, rows)
    case "top":
      return row === 0 ? 0 : -edgeSign(row - 1, col, "bottom", cols, rows)
    default:
      throw new Error(`unknown side ${side}`)
  }
}

// One edge from A to B, traversed clockwise, with outward normal n. The
// knob is symmetric about the edge midpoint so the neighbour (opposite
// direction, opposite sign) traces the very same curve.
const edge = (ax, ay, bx, by, nx, ny, s, k) => {
  if (s === 0) return `L${round(bx)} ${round(by)}`
  const L = Math.hypot(bx - ax, by - ay)
  const dx = (bx - ax) / L
  const dy = (by - ay) / L
  const P = (u, v) =>
    `${round(ax + dx * u + nx * s * v)} ${round(ay + dy * u + ny * s * v)}`
  const m = L / 2
  const sweep = s > 0 ? 1 : 0
  return [
    `L${P(m - 0.75 * k, 0)}`,
    `C${P(m - 0.3 * k, 0)} ${P(m - 0.7 * k, 0.5 * k)} ${P(
      m - 0.45 * k,
      0.6 * k
    )}`,
    `A${k} ${k} 0 1 ${sweep} ${P(m + 0.45 * k, 0.6 * k)}`,
    `C${P(m + 0.7 * k, 0.5 * k)} ${P(m + 0.3 * k, 0)} ${P(m + 0.75 * k, 0)}`,
    `L${round(bx)} ${round(by)}`,
  ].join(" ")
}

export const piecePath = ({ row, col, cols, rows, cellW, cellH, knob }) => {
  const x0 = col * cellW
  const y0 = row * cellH
  const x1 = x0 + cellW
  const y1 = y0 + cellH
  const sign = side => edgeSign(row, col, side, cols, rows)
  return [
    `M${round(x0)} ${round(y0)}`,
    edge(x0, y0, x1, y0, 0, -1, sign("top"), knob),
    edge(x1, y0, x1, y1, 1, 0, sign("right"), knob),
    edge(x1, y1, x0, y1, 0, 1, sign("bottom"), knob),
    edge(x0, y1, x0, y0, -1, 0, sign("left"), knob),
    "Z",
  ].join(" ")
}

// Start position of a piece relative to its resting place, spread evenly
// around the mockup with a deterministic pseudo-random distance and spin.
export const scatterOffset = (index, total) => {
  const angle = (index / total) * Math.PI * 2 + 0.6
  // 160.5–259.5 so that rounding dx/dy to 2 dp never leaves the 160–260 band
  const dist = 160.5 + (99 * ((index * 7919) % 1000)) / 999
  const rot = -25 + (50 * ((index * 31) % 100)) / 99
  return {
    dx: round(Math.cos(angle) * dist),
    dy: round(Math.sin(angle) * dist),
    rot: round(rot),
  }
}

// Piece indices sorted by distance from the grid centre, so the mockup
// grows outwards from the middle.
export const pieceOrder = (cols, rows) => {
  const cx = (cols - 1) / 2
  const cy = (rows - 1) / 2
  const dist = i => Math.hypot((i % cols) - cx, Math.floor(i / cols) - cy)
  return [...Array(cols * rows).keys()].sort(
    (a, b) => dist(a) - dist(b) || a - b
  )
}

export const enterDelay = rank => round(rank * 0.07)

export const pieces = (grid = GRID) => {
  const { cols, rows } = grid
  const total = cols * rows
  const order = pieceOrder(cols, rows)
  return [...Array(total).keys()].map(index => {
    const row = Math.floor(index / cols)
    const col = index % cols
    return {
      index,
      row,
      col,
      d: piecePath({ row, col, ...grid }),
      // own centre, in viewBox units: the pivot for the entrance rotation
      ox: round((col + 0.5) * grid.cellW),
      oy: round((row + 0.5) * grid.cellH),
      ...scatterOffset(index, total),
      delay: enterDelay(order.indexOf(index)),
    }
  })
}
