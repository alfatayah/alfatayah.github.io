import React from "react"
import { motion } from "framer-motion"
import data from "../yourdata"
import scrollTo from "gatsby-plugin-smoothscroll"
import HeroBackground from "./atoms/HeroBackground"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
}

const Header = () => {
  return (
    <section className="hero-section" id="home">
      <HeroBackground />
      <div className="container">
        <motion.div
          className="header-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero-name" variants={itemVariants}>
            AI engineer, full-stack developer, builder
          </motion.p>
          <motion.h1 variants={itemVariants}>
            Building products people love to use
          </motion.h1>
          <motion.p className="hero-paragraph" variants={itemVariants}>
            {data.headerParagraph}
          </motion.p>
          <motion.div className="hero-cta-group" variants={itemVariants}>
            <motion.button
              className="btn-primary"
              onClick={() => scrollTo("#work")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              View Work
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={() => scrollTo("#contact")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Header
