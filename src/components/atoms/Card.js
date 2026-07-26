import React from "react"

const Card = ({ heading, paragraph, imgUrl, projectLink }) => {
  const cardContent = (
    <div className="project-card">
      <div className="card-image-container">
        <img className="card-image" src={imgUrl} alt={heading} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{heading}</h3>
        <p className="card-description">{paragraph}</p>
        <div className="card-footer">
          <span className="card-link">
            Explore Project <span className="arrow">↗</span>
          </span>
        </div>
      </div>
    </div>
  )

  if (projectLink && projectLink !== "") {
    return (
      <a
        href={projectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="card-wrapper-link"
      >
        {cardContent}
      </a>
    )
  }

  return <div className="card-wrapper-link">{cardContent}</div>
}

export default Card
