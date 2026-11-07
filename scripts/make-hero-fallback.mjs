// Renders src/images/hero-fallback.png: a shaded sphere with faint
// wireframe-like lines, standing in for the WebGL hero object.
// Run: node scripts/make-hero-fallback.mjs
import sharp from "sharp"
import { fileURLToPath } from "node:url"
import path from "node:path"

const out = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/images/hero-fallback.png"
)

const R = 300
const C = 400
// latitude / longitude ellipses approximate the icosahedron wireframe
const lines = []
for (let i = 1; i < 6; i++) {
  const ry = (R * i) / 6
  lines.push(`<ellipse cx="${C}" cy="${C}" rx="${R}" ry="${ry}"/>`)
  lines.push(`<ellipse cx="${C}" cy="${C}" rx="${ry}" ry="${R}"/>`)
}
lines.push(`<line x1="${C - R}" y1="${C}" x2="${C + R}" y2="${C}"/>`)
lines.push(`<line x1="${C}" y1="${C - R}" x2="${C}" y2="${C + R}"/>`)

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <radialGradient id="body" cx="35%" cy="30%" r="75%">
      <stop offset="0" stop-color="#f2f2f2"/>
      <stop offset="0.6" stop-color="#d9d9d9"/>
      <stop offset="1" stop-color="#9a9a9a"/>
    </radialGradient>
    <clipPath id="clip"><circle cx="${C}" cy="${C}" r="${R}"/></clipPath>
  </defs>
  <circle cx="${C}" cy="${C}" r="${R}" fill="url(#body)"/>
  <g clip-path="url(#clip)" fill="none" stroke="#111111" stroke-opacity="0.16" stroke-width="1.5">
    ${lines.join("\n    ")}
  </g>
</svg>`

// palette PNG: the image is monochrome, so 64 greys are plenty and the file
// stays well under 60 KB
await sharp(Buffer.from(svg))
  .png({ palette: true, colours: 64, compressionLevel: 9 })
  .toFile(out)
const meta = await sharp(out).metadata()
const { size } = await import("node:fs").then(fs => fs.statSync(out))
console.log(`${out} ${meta.width}x${meta.height} ${size} bytes`)
