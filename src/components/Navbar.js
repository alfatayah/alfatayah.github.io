import React, { useState } from "react"
import scrollTo from "gatsby-plugin-smoothscroll"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar-container">
      <div className="navbar-wrapper">
        <div
          role="button"
          tabIndex={0}
          onClick={() => scrollTo("#home")}
          onKeyDown={() => scrollTo("#home")}
          className="nav-logo"
        >
          Fadhil<span className="dot">.</span>
        </div>

        <div className={`links-wrapper${menuOpen ? " open" : ""}`}>
          <button onClick={() => { scrollTo("#work"); setMenuOpen(false) }}>Work</button>
          <button onClick={() => { scrollTo("#about"); setMenuOpen(false) }}>About</button>
          <button onClick={() => { scrollTo("#contact"); setMenuOpen(false) }} className="nav-cta">
            Contact
          </button>
        </div>

        <button
          className={`hamburger${menuOpen ? " is-active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
