import React from "react"
import { motion } from "framer-motion"

const Card = ({ heading, paragraph, imgUrl, projectLink }) => {
  const cardContent = (
    <motion.div
      className="project-card"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="card-image-container">
        <motion.img
          className="card-image"
          src={imgUrl}
          alt={heading}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
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
    </motion.div>
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
