import { skillScatter } from "./hero/puzzleGeometry.mjs"

// Framer variants for the skills grid. The cards fly in from the hero's
// scatter pattern and spring into place like puzzle pieces. The centre-out
// delay is orchestrated by the grid (delayChildren per child): a delay on
// the item's own transition would be reused when a hover gesture ends and
// make the un-hover lag by the entrance delay.
export const gridVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: (i, n) => skillScatter(i, n).delay },
  },
}

export const itemVariants = {
  hidden: c => ({ opacity: 0, x: c.x, y: c.y, rotate: c.rotate }),
  visible: () => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      opacity: { duration: 0.25 },
    },
  }),
}

// Start offset for card `index` of `total`; under reduced motion the cards
// only fade, still centre-out.
export const skillCustom = (index, total, reduce) => {
  if (reduce) return { x: 0, y: 0, rotate: 0 }
  const { x, y, rotate } = skillScatter(index, total)
  return { x, y, rotate }
}
