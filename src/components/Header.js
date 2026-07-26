import React from "react"
import Fade from "react-reveal/Fade"
import data from "../yourdata"
import scrollTo from "gatsby-plugin-smoothscroll"

const Header = () => {
  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="header-wrapper">
          <Fade bottom>
            <p className="hero-name"> AI engineer, full-stack developer, builder</p>
          </Fade>
          <Fade bottom delay={100}>
            <h1>Building products people love to use</h1>
          </Fade>
          <Fade bottom delay={200}>
            <p className="hero-paragraph">{data.headerParagraph}</p>
          </Fade>
          <Fade bottom delay={300}>
            <div className="hero-cta-group">
              <button className="btn-primary" onClick={() => scrollTo("#work")}>
                View Work
              </button>
              <button className="btn-secondary" onClick={() => scrollTo("#contact")}>
                Get in Touch
              </button>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  )
}

export default Header
