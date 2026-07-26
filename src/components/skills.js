import React from "react"
import Fade from "react-reveal/Fade"
import data from "../yourdata"

const Skills = () => {
  return (
    <section className="section" id="skill" style={{ borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", background: "#fafafa" }}>
      <div className="container">
        <div className="skills-container">
          <Fade bottom>
            <div className="skills-header">
              <h2 className="section-heading">Skills</h2>
            </div>
          </Fade>
          <Fade bottom cascade>
            <div className="skills-grid">
              {data.skills.map(skill => (
                <div className="skill-card" key={skill.id}>
                  <div className="icon-wrapper">
                    <img src={skill.img} alt={skill.para} />
                  </div>
                  <span className="skill-name">{skill.para}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  )
}

export default Skills
