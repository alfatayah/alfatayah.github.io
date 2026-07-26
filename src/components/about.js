import React from "react"
import { motion } from "framer-motion"
import data from "../yourdata"

const About = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          className="about-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <p className="about-label">About Me</p>
          <h2 className="about-heading">Hi, I'm {data.name}</h2>
          <p className="about-text">{data.aboutParaOne}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default About
