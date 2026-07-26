import React from "react"
import { motion } from "framer-motion"
import Card from "./atoms/Card"
import data from "../yourdata"

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const Work = () => {
  return (
    <section className="section work-section" id="work">
      <div className="container">
        <motion.div
          className="work-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="work-label">Selected Projects</span>
          <h2 className="section-heading work-title">Work</h2>
          <p className="work-subtext">
            A curated showcase of recent digital products, web platforms, and mobile applications.
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {data.projects.map(project => (
            <motion.div key={project.id} variants={cardItemVariants}>
              <Card
                heading={project.title}
                paragraph={project.para}
                imgUrl={project.imageSrc}
                projectLink={project.url}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Work
