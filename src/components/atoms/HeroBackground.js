import React, { useEffect, useRef } from "react"
import { animate, stagger } from "animejs"

const HeroBackground = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const gridContainer = containerRef.current
    if (!gridContainer) return

    const numDotsX = 16
    const numDotsY = 8

    gridContainer.innerHTML = ""

    for (let i = 0; i < numDotsX * numDotsY; i++) {
      const dot = document.createElement("div")
      dot.className = "hero-grid-dot"
      gridContainer.appendChild(dot)
    }

    // Anime.js v4 signature staggered wave animation
    animate(".hero-grid-dot", {
      scale: [
        { value: 0.2, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1000 },
      ],
      opacity: [
        { value: 0, duration: 200 },
        { value: 0.25, duration: 800 },
      ],
      delay: stagger(50, { grid: [numDotsX, numDotsY], from: "center" }),
      loop: false,
    })

    // Pointer move interaction
    const handlePointerMove = e => {
      const dots = gridContainer.querySelectorAll(".hero-grid-dot")
      const rect = gridContainer.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      dots.forEach(dot => {
        const dotRect = dot.getBoundingClientRect()
        const dotX = dotRect.left + dotRect.width / 2 - rect.left
        const dotY = dotRect.top + dotRect.height / 2 - rect.top
        const dist = Math.hypot(mouseX - dotX, mouseY - dotY)

        if (dist < 130) {
          animate(dot, {
            scale: 1.8,
            opacity: 0.7,
            duration: 250,
            easing: "easeOutQuad",
          })
        } else {
          animate(dot, {
            scale: 1,
            opacity: 0.25,
            duration: 600,
            easing: "easeOutQuad",
          })
        }
      })
    }

    window.addEventListener("pointermove", handlePointerMove)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return <div className="hero-grid-background" ref={containerRef} />
}

export default HeroBackground
