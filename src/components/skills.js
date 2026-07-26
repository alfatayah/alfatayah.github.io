import React from "react"
import { motion } from "framer-motion"
import data from "../yourdata"

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const Skills = () => {
  return (
    <section className="section" id="skill" style={{ borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", background: "#fafafa" }}>
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
            {data.skills.map(skill => (
              <motion.div
                className="skill-card"
                key={skill.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="icon-wrapper">
                  <img src={skill.img} alt={skill.para} />
                </div>
                <span className="skill-name">{skill.para}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
