import { test } from "node:test"
import assert from "node:assert/strict"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const config = require("../gatsby-config.js")
const manifest = config.plugins.find(
  p => p.resolve === "gatsby-plugin-manifest"
).options

test("siteMetadata is Fadhil's, not the starter's", () => {
  assert.equal(
    config.siteMetadata.title,
    "Fadhil Alfatayah — AI Engineer & Full-Stack Developer"
  )
  assert.equal(
    config.siteMetadata.description,
    "Portfolio of Fadhil Alfatayah: AI automation, intelligent workflows, and mobile & web products built with React Native, React, Express, and Laravel."
  )
  assert.equal(config.siteMetadata.author, "@alfatayah")
  assert.equal(config.siteMetadata.siteUrl, "https://alfatayah.github.io")
})

test("manifest matches the site identity", () => {
  assert.equal(manifest.name, "Fadhil Alfatayah")
  assert.equal(manifest.short_name, "Fadhil")
  assert.equal(manifest.theme_color, "#111111")
  assert.equal(manifest.background_color, "#ffffff")
})
