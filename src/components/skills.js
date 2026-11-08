import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import data from "../yourdata"
import { skillScatter } from "./hero/puzzleGeometry.mjs"

// The cards fly in from the hero's scatter pattern (centre-out, each with its
// own delay) and spring into the grid like puzzle pieces; under reduced
// motion they only fade, still centre-out.
const gridVariants = { hidden: {}, visible: {} }

const itemVariants = {
  hidden: c => ({ opacity: 0, x: c.x, y: c.y, rotate: c.rotate }),
  visible: c => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      delay: c.delay,
      opacity: { duration: 0.25, delay: c.delay },
    },
  }),
}

const Skills = () => {
  const reduce = useReducedMotion()
  return (
    <section className="section skills-section" id="skill">
      <div className="container">
        <div className="skills-container">
          <motion.div
            className="skills-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-heading">Skills</h2>
          </motion.div>

          <motion.div
            className="skills-grid"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {data.skills.map((skill, index) => {
              const scatter = skillScatter(index, data.skills.length)
              return (
                <motion.div
                  className="skill-card"
                  key={skill.id}
                  variants={itemVariants}
                  custom={
                    reduce ? { ...scatter, x: 0, y: 0, rotate: 0 } : scatter
                  }
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="icon-wrapper">
                    <img src={skill.img} alt={skill.para} />
                  </div>
                  <span className="skill-name">{skill.para}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
