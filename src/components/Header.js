import React, { useRef } from "react"
import { motion } from "framer-motion"
import data from "../yourdata"
import scrollTo from "gatsby-plugin-smoothscroll"
import HeroSceneLoader from "./three/HeroSceneLoader"
import EyeFace from "./atoms/EyeFace"
import PuzzleProduct from "./hero/PuzzleProduct"

// The hero copy enters with a CSS keyframe stagger (see header.scss) rather
// than a JS-driven animation: with Framer's initial={{ opacity: 0 }} the
// heading stayed invisible until React hydrated, which made it the page's
// LCP element at ~3.5 s. CSS starts at first paint and honours
// prefers-reduced-motion.
const Header = () => {
  const heroRef = useRef(null)
  return (
    <section className="hero-section" id="home" ref={heroRef}>
      <HeroSceneLoader heroRef={heroRef} />
      <PuzzleProduct />
      <div className="container">
        <div className="header-wrapper">
          <div className="hero-avatar hero-enter">
            <EyeFace />
          </div>
          <p className="hero-name hero-enter">
            AI engineer, full-stack developer, builder
          </p>
          <h1 className="hero-enter">Building products people love to use</h1>
          <p className="hero-paragraph hero-enter">{data.headerParagraph}</p>
          <div className="hero-cta-group hero-enter">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
