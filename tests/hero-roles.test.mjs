import { test } from "node:test"
import assert from "node:assert/strict"
import {
  HERO_ROLES,
  ROLE_LEAD,
  rolesSentence,
} from "../src/components/hero/heroRoles.mjs"

test("exactly four roles, each short enough for one line", () => {
  // header.scss cuts the hero-role-cycle keyframes for four phrases
  assert.equal(HERO_ROLES.length, 4)
  for (const r of HERO_ROLES) assert.ok(r.length <= 24, r)
  assert.equal(ROLE_LEAD, "I build")
})

test("rolesSentence joins with commas and a final 'and'", () => {
  assert.equal(
    rolesSentence(),
    "I build AI automations, React Native apps, Laravel backends and n8n workflows."
  )
  assert.equal(
    rolesSentence(["apps", "APIs"], "I ship"),
    "I ship apps and APIs."
  )
  assert.equal(rolesSentence(["apps"]), "I build apps.")
})
