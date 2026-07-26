import React from "react"
import { motion } from "framer-motion"
import data from "../yourdata"

const Footer = () => {
  return (
    <section className="section footer-section" id="contact">
      <div className="container">
        <motion.div
          className="footer-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="footer-heading">Get in Touch</h2>
          <p className="footer-subheading">{data.contactSubHeading}</p>

          <motion.a
            className="email-cta-btn"
            href={`mailto:${data.contactEmail}`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {data.contactEmail}
          </motion.a>

          <div className="social-icons-wrapper">
            {data.social.map((socialLink, i) => (
              <motion.a
                key={i}
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <img src={socialLink.img} alt="social" />
              </motion.a>
            ))}
          </div>

          <p className="copyright-text">
            © {new Date().getFullYear()} Fadhil Alfatayah
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Footer
