import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
// Components
import Header from "../components/Header"
import Work from "../components/Work"
import About from "../components/about"
import Skills from "../components/skills"
import Footer from "../components/Footer"
import PuzzleDivider from "../components/atoms/PuzzleDivider"

const IndexPage = () => (
  <Layout>
    <SEO />
    <Header></Header>
    <PuzzleDivider />
    <About></About>
    <PuzzleDivider />
    <Work></Work>
    <Skills></Skills>
    <Footer></Footer>
  </Layout>
)

export default IndexPage
