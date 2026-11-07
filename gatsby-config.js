module.exports = {
  siteMetadata: {
    title: `Fadhil Alfatayah — AI Engineer & Full-Stack Developer`,
    description: `Portfolio of Fadhil Alfatayah: AI automation, intelligent workflows, and mobile & web products built with React Native, React, Express, and Laravel.`,
    author: `@alfatayah`,
    siteUrl: `https://alfatayah.github.io`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fadhil Alfatayah`,
        short_name: `Fadhil`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#111111`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-smoothscroll`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
