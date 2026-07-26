import React from "react"
import Fade from "react-reveal/Fade"
import data from "../yourdata"

const Footer = () => {
  return (
    <section className="section footer-section" id="contact">
      <div className="container">
        <div className="footer-container">
          <Fade bottom cascade>
            <h2 className="footer-heading">Get in Touch</h2>
            <p className="footer-subheading">{data.contactSubHeading}</p>
          </Fade>
          <a className="email-cta-btn" href={`mailto:${data.contactEmail}`}>
            {data.contactEmail}
          </a>
          <div className="social-icons-wrapper">
            {data.social.map((socialLink, i) => (
              <a
                key={i}
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
              >
                <img src={socialLink.img} alt="social" />
              </a>
            ))}
          </div>
          <p className="copyright-text">
            © {new Date().getFullYear()} Fadhil Alfatayah
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer
