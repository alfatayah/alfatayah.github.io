import React from "react"
import Fade from "react-reveal/Fade"
import data from "../yourdata"
const imgProfile = "https://user-images.githubusercontent.com/23058601/152922506-f44c4da0-d0ea-4bef-869a-235cb30dcc2f.png"
const About = () => {
  return (
    <div className="secion" id="about">
      <div className="container">
        <div className="about-section">
          <div className="content">
            <Fade bottom>
              <h1>About Me</h1>
              <p style={{fontSize: 17}}>{data.aboutParaOne}</p>
            </Fade>
          </div>
          <div className="image-wrapper">
            <Fade bottom cascade>
              <img src={imgProfile} alt="about" />
            </Fade>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default About
