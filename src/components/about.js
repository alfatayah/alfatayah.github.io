import React from "react"
import Fade from "react-reveal/Fade"
import data from "../yourdata"

const imgProfile = "https://user-images.githubusercontent.com/23058601/152922506-f44c4da0-d0ea-4bef-869a-235cb30dcc2f.png"

const About = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-container">
          <Fade bottom>
            <p className="about-label">About Me</p>
            <h2 className="about-heading">Hi, I'm {data.name}</h2>
            <p className="about-text">{data.aboutParaOne}</p>
          </Fade>
        </div>
      </div>
    </section>
  )
}

export default About
