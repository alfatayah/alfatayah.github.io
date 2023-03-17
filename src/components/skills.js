import React from "react"
import Fade from "react-reveal/Fade"
import data from "../yourdata"

const Skills = () => {
  return (
    <div className="section" id="skill">
      <div className="container">
        <div className="skills-container">
          <h1>Skills</h1>
          <Fade bottom cascade>
            <div className="skills-grid">
              {data.skills.map(skill => (
                <div className="skill" key={skill.id}>
                  <img src={skill.img} alt="css"></img>
                  <p>{skill.para}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default Skills
