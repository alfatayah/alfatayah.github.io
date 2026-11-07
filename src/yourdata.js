// Skills Icons
import reactIcon from "./images/react.svg"
import express from "./images/express.svg"
import mongodb from "./images/mongodb.svg"
import n8nIcon from "./images/n8n.svg"
import openclawIcon from "./images/openclaw.svg"
import aiIcon from "./images/ai-automation.svg"
import pgvectorIcon from "./images/pgvector.svg"
import laravelIcon from "./images/laravel.svg"

// Project covers
import itamCover from "./images/itam-cover.svg"
import camventoryCover from "./images/camventory-cover.svg"

// Social Icon
import githubIcon from "./images/github.svg"
import instagramIcon from "./images/instagram.svg"
import twitterIcon from "./images/twitter.png"
import linkindIcon from "./images/linkdin.svg"

// Project screenshots (local, re-encoded JPEG ≤ 1600px wide)
import nusa from "./images/projects/nusa-kamera.jpg"
import mobile from "./images/projects/baf-mobile.jpg"
import stay from "./images/projects/staycation.jpg"
import nusaPos from "./images/projects/nusa-pos.jpg"
import agro from "./images/projects/global-agro-coco.jpg"
import nusabooking from "./images/projects/booking-system-nusa.jpg"

export default {
  //(Please Do Not Remove The comma(,) after every variable)
  //Change The Website Template

  //   Header Details ---------------------
  name: "Fadhil",
  headerTagline: [
    //Line 1 For Header
    "Lets get in touch",
    //Line 2 For Header
    "Im Software Developer",
    //Line 3 For Header
    "and experience",
  ],
  //   Header Paragraph
  headerParagraph: "Let's connect!",

  //Contact Email
  contactEmail: "fadhil.alfatayah@gmail.com",

  // End Header Details -----------------------

  // Work Section ------------------------
  projects: [
    {
      id: 1,
      title: "Nusa Kamera",
      tags: ["Laravel", "MySQL"],
      para: "Web Apps to provide information, product, booking and estimate order in rental camera ",
      imageSrc: nusa,
      imageWidth: 981,
      imageHeight: 482,
      // url: "",
    },
    {
      id: 2,
      title: "BAF Mobile",
      tags: ["React Native", "REST API"],
      para: "Mobile apps to help customers submit credit product, track the installment credit and estimatation credit product",
      imageSrc: mobile,
      imageWidth: 820,
      imageHeight: 643,
      // url:
      //   "",
    },
    {
      id: 3,
      title: "Staycation",
      tags: ["Laravel", "MySQL"],
      para: "Web Apps to provide admin booking hotel to book hotel, check status room and validation payment for rent",
      imageSrc: stay,
      imageWidth: 687,
      imageHeight: 460,
      // url: "",
    },
    {
      id: 4,
      title: "Nusa POS",
      tags: ["React", "Express", "MongoDB"],
      para: "Website to provide point of sales and payment for rental product",
      imageSrc: nusaPos,
      imageWidth: 1600,
      imageHeight: 807,
      // url: "",
    },
    {
      id: 5,
      title: "Global Agro Coco",
      tags: ["Laravel", "Landing Page"],
      para: "Landing Page Web to provide information about PT Global Agro Coco to sell them products",
      imageSrc: agro,
      imageWidth: 1600,
      imageHeight: 816,
      // url: "",
    },
    {
      id: 6,
      title: "Booking System Nusa",
      tags: ["React", "Express", "MongoDB"],
      para: "Web Apps to provide a booking system for the rental products in Nusa Kamera",
      imageSrc: nusabooking,
      imageWidth: 1600,
      imageHeight: 822,
      // url: "",
    },
    {
      id: 7,
      title: "ITAM",
      tags: ["Laravel", "MySQL"],
      para: "IT Asset Management system to track company assets, assignments, maintenance and lifecycle in one place",
      imageSrc: itamCover,
      imageWidth: 1280,
      imageHeight: 800,
      // url: "",
    },
    {
      id: 8,
      title: "Camventory",
      tags: ["React Native", "Express", "MongoDB"],
      para: "Inventory management app to track camera gear stock, availability, rentals and returns",
      imageSrc: camventoryCover,
      imageWidth: 1280,
      imageHeight: 800,
      // url: "",
    },
  ],

  // End Work Section -----------------------

  // About Secton --------------
  aboutParaOne:
    "Passionate about building quality products and exploring new technologies. Constantly expanding my skillset into AI automation and intelligent workflows",
  aboutParaTwo:
    "I specialize in mobile and web development using modern frameworks such as React Native, React, Express, and Laravel to deliver seamless and scalable user experiences.",
  aboutParaThree:
    "Constantly expanding my skillset into AI automation and intelligent workflows, I enjoy solving real-world problems through clean code and modern tech stacks.",
  aboutImage:
    "https://images.unsplash.com/photo-1519713958759-6254243c4a53?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",

  //   End About Section ---------------------

  // Skills Section ---------------

  //   Import Icons from the top and link it here

  skills: [
    {
      id: 1,
      img: reactIcon,
      para: "React Native",
    },
    {
      id: 2,
      img: laravelIcon,
      para: "Laravel",
    },
    {
      id: 3,
      img: express,
      para: "Express Js",
    },
    {
      id: 4,
      img: mongodb,
      para: "Mongo DB",
    },
    {
      id: 5,
      img: pgvectorIcon,
      para: "pgvector",
    },
    {
      id: 6,
      img: aiIcon,
      para: "AI Agents & LLMs",
    },
    {
      id: 7,
      img: openclawIcon,
      para: "OpenClaw",
    },
    {
      id: 8,
      img: n8nIcon,
      para: "n8n Automation",
    },
  ],

  // End Skills Section --------------------------

  //   Contact Section --------------

  contactSubHeading: "Let's create your next experience together",
  social: [
    // Add Or Remove The Link Accordingly
    { img: githubIcon, url: "https://github.com/alfatayah" },
    {
      img: linkindIcon,
      url: "https://www.linkedin.com/in/fadhillah-alfatayah-1b5976130/",
    },
    // {
    //   img: twitterIcon,
    //   url: "",
    // },
    // {
    //   img: instagramIcon,
    //   url: "",
    // },
  ],

  // End Contact Section ---------------
}
