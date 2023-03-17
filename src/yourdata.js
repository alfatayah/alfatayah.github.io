// Skills Icons
import htmlIcon from "./images/html.svg"
import cssIcon from "./images/css.svg"
import reactIcon from "./images/react.svg"
import jsIcon from "./images/javascript.svg"
import express from "./images/express.svg"
import mongodb from "./images/mongodb.svg"

// Social Icon
import githubIcon from "./images/github.svg"
import instagramIcon from "./images/instagram.svg"
import twitterIcon from "./images/twitter.png"
import linkindIcon from "./images/linkdin.svg"

//portofolio
// import nusa from "./images/nusakamera.jpg"
// import stay from "./images/stay.jpg"
// import mobile from "./images/mobile.jpg"
// import agro from "./images/global.jpg"

// image source
const mobile = "https://user-images.githubusercontent.com/23058601/108582730-97c49280-7367-11eb-9473-50c3c6e11fba.jpg"
const nusa = "https://user-images.githubusercontent.com/23058601/108582930-becf9400-7368-11eb-8d1e-7280d86d7437.jpg";
const stay = "https://user-images.githubusercontent.com/23058601/108582920-afe8e180-7368-11eb-96c9-9293b0e58b96.jpg";
const agro = "https://user-images.githubusercontent.com/23058601/108583283-03f4c580-736b-11eb-8dc2-b03faf1859f1.jpg";
const nusaPos = "https://user-images.githubusercontent.com/23058601/152916544-187f4dfe-fafa-4f32-9b51-663959dfb2fc.png";
const nusabooking = 'https://user-images.githubusercontent.com/23058601/225804230-25c49fa2-8421-41bb-8c0d-f561e629b68b.png'

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
  headerParagraph:
    "Im working with newest front-end framework like React Native and React. Love to lern React and Express. Cant wait to be a touch with you!",

  //Contact Email
  contactEmail: "fadhil.alfatayah@gmail.com",

  // End Header Details -----------------------

  // Work Section ------------------------
  projects: [
    {
      id: 1, //DO NOT CHANGE THIS (Please)😅
      title: "Nusa Kamera", //Project Title - Add Your Project Title Here
      para:
        "Web Apps to provide information, product, booking and estimate order in rental camera ", // Add Your Service Type Here
      //Project Image - Add Your Project Image Here
      imageSrc: nusa,
      //Project URL - Add Your Project Url Here
      // url: "",
    },
    {
      id: 2, //DO NOT CHANGE THIS (Please)😅
      title: "BAF Mobile", //Project Title - Add Your Project Title Here
      para:
        "Mobile apps to help customers submit credit product, track the installment credit and estimatation credit product", // Add Your Service Type Here
      //Project Image - Add Your Project Image Here
      imageSrc: mobile,
      //Project URL - Add Your Project Url Here
      // url:
      //   "",
    
    },
    {
      id: 3, //DO NOT CHANGE THIS (Please)😅
      title: "Staycation", //Project Title - Add Your Project Title Here
      para:
        "Web Apps to provide admin booking hotel to book hotel, check status room and validation payment for rent", // Add Your Service Type Here
      //Project Image - Add Your Project Image Here
      imageSrc: stay,
      //Project URL - Add Your Project Url Here
      // url: "",
    },
    {
      id: 4, //DO NOT CHANGE THIS (Please)😅
      title: "Nusa POS", //Project Title - Add Your Project Title Here
      para:
        "Website to provide point of sales and payment for rental product", // Add Your Service Type Here
      //Project Image - Add Your Project Image Heres
      imageSrc: nusaPos,
      //Project URL - Add Your Project Url Here
      // url: "",
     
    },
    {
      id: 5, //DO NOT CHANGE THIS (Please)😅
      title: "Global Agro Coco", //Project Title - Add Your Project Title Here
      para:
        "Landing Page Web to provide information about PT Global Agro Coco to sell them products",
      //Project Image - Add Your Project Image Heres
      imageSrc: agro,
      //Project URL - Add Your Project Url Here
      // url: "",
    }, 
    {
      id: 6, //DO NOT CHANGE THIS (Please)😅
      title: "Booking System Nusa", //Project Title - Add Your Project Title Here
      para:
        "Web Apps to provide a booking system for the rental products in Nusa Kamera",
      //Project Image - Add Your Project Image Heres
      imageSrc: nusabooking,
      //Project URL - Add Your Project Url Here
      // url: "",
    }, 
  ],

  // End Work Section -----------------------

  // About Secton --------------
  aboutParaOne:
    "Hi guys, nice to meet you! , Im software developer interested in Mobile Apps. Im currently work at PT Bussan Auto Finance. Im focused to build product with react native. Happy to lern the new thing about tech",
  aboutParaTwo:
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  aboutParaThree:
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  aboutImage:
    "https://images.unsplash.com/photo-1519713958759-6254243c4a53?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",

  //   End About Section ---------------------

  // Skills Section ---------------

  //   Import Icons from the top and link it here

  skills: [
    {
      id: 1,
      img: htmlIcon,
      para: "HTML",
    },
    {
      id: 2,
      img: cssIcon,
      para: "CSS",
    },
    {
      id: 3,
      img: jsIcon,
      para: "Javascript",
    },
    {
      id: 4,
      img: reactIcon,
      para: "React Native",
    },
    {
      id: 5,
      img: express,
      para: "Express Js",
    },
    {
      id: 6,
      img: mongodb,
      para: "Mongo DB",
    },
  ],

  // End Skills Section --------------------------

  //   Promotion Section --------------------------

  promotionHeading: "Heading",
  promotionPara:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  // End Promotion Section -----------------

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
