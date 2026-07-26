import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Card from "./atoms/Card"
import data from "../yourdata"

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  // Disable body scroll when modal is open and handle Escape key
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "Escape") setSelectedProject(null)
    }
    if (selectedProject) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedProject])

  return (
    <section className="section work-section" id="work">
      <div className="container">
        <motion.div
          className="work-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="work-label">Selected Projects</span>
          <h2 className="section-heading work-title">Work</h2>
          <p className="work-subtext">
            A curated showcase of recent digital products, web platforms, and mobile applications.
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {data.projects.map(project => (
            <motion.div key={project.id} variants={cardItemVariants}>
              <Card
                heading={project.title}
                paragraph={project.para}
                imgUrl={project.imageSrc}
                projectLink={project.url}
                onSelect={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal-content"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="project-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <motion.div
                className="project-modal-image-wrap"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <img
                  src={selectedProject.imageSrc}
                  alt={selectedProject.title}
                  className="project-modal-image"
                />
              </motion.div>

              <motion.div
                className="project-modal-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <span className="work-label">Project Preview</span>
                <h3 className="project-modal-title">{selectedProject.title}</h3>
                <p className="project-modal-desc">{selectedProject.para}</p>
                {selectedProject.url && selectedProject.url !== "" && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-btn"
                  >
                    Visit Website <span className="arrow">↗</span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Work
