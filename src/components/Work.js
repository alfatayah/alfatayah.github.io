import React from "react"
import Card from "./atoms/Card"
import Fade from "react-reveal/Fade"
import data from "../yourdata"

const Work = () => {
  return (
    <section className="section work-section" id="work">
      <div className="container">
        <Fade bottom>
          <div className="work-header">
            <span className="work-label">Selected Projects</span>
            <h2 className="section-heading work-title">Work</h2>
            <p className="work-subtext">
              A curated showcase of recent digital products, web platforms, and mobile applications.
            </p>
          </div>
        </Fade>
        <Fade bottom delay={150}>
          <div className="projects-grid">
            {data.projects.map(project => (
              <Card
                key={project.id}
                heading={project.title}
                paragraph={project.para}
                imgUrl={project.imageSrc}
                projectLink={project.url}
              />
            ))}
          </div>
        </Fade>
      </div>
    </section>
  )
}

export default Work
