// Renders static/og-image.png (1200x630) for Open Graph / Twitter cards.
// Run: node scripts/make-og-image.mjs
import sharp from "sharp"
import { fileURLToPath } from "node:url"
import path from "node:path"

const out = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../static/og-image.png"
)

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <g font-family="Inter, Segoe UI, Arial, sans-serif">
    <text x="100" y="300" font-size="72" font-weight="700" fill="#111111" letter-spacing="-2">Fadhil Alfatayah<tspan fill="#111111">.</tspan></text>
    <text x="100" y="370" font-size="32" font-weight="500" fill="#555555">AI Engineer · Full-Stack Developer · Builder</text>
  </g>
  <rect x="100" y="420" width="1000" height="1" fill="#e5e5e5"/>
  <text x="100" y="470" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="22" fill="#888888">alfatayah.github.io</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
const meta = await sharp(out).metadata()
console.log(`${out} ${meta.width}x${meta.height}`)
