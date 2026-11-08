import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import data from "../yourdata"
import { gridVariants, itemVariants, skillCustom } from "./skillsMotion.mjs"

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
              return (
                <motion.div
                  className="skill-card"
                  key={skill.id}
                  variants={itemVariants}
                  custom={skillCustom(index, data.skills.length, reduce)}
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
