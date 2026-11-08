import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { dividerPath } from "../hero/puzzleGeometry.mjs"

// A thin rule with one puzzle knob in the middle. When scrolled into view
// the two halves grow outward from the knob and the knob draws itself;
// under reduced motion everything renders in its final state.
const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const knobVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const D = dividerPath()

const PuzzleDivider = () => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="puzzle-divider"
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.span
        className="puzzle-divider-line is-left"
        variants={lineVariants}
      />
      <svg
        className="puzzle-divider-knob"
        viewBox="0 0 56 40"
        width="56"
        height="40"
      >
        <motion.path d={D} variants={knobVariants} />
      </svg>
      <motion.span
        className="puzzle-divider-line is-right"
        variants={lineVariants}
      />
    </motion.div>
  )
}

export default PuzzleDivider
