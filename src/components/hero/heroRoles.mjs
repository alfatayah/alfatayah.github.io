// Copy for the hero's rotating role line. Lives in a pure module (not
// yourdata.js, which imports image assets) so node --test can pin the
// count: header.scss cuts the hero-role-cycle keyframes for exactly four.
export const ROLE_LEAD = "I build"

export const HERO_ROLES = [
  "AI automations",
  "React Native apps",
  "Laravel backends",
  "n8n workflows",
]

// One stable sentence for screen readers while the visible phrases cycle.
export const rolesSentence = (roles = HERO_ROLES, lead = ROLE_LEAD) => {
  if (roles.length === 1) return `${lead} ${roles[0]}.`
  const head = roles.slice(0, -1).join(", ")
  return `${lead} ${head} and ${roles[roles.length - 1]}.`
}
