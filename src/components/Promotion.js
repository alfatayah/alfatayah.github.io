import React from "react"
import { motion } from "framer-motion"
import data from "../yourdata"

const Promotion = () => {
  return (
    <div className="section">
      <div className="container">
        <motion.div
          className="promotion-container"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1>{data.promotionHeading}</h1>
          <p>{data.promotionPara}</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Promotion
