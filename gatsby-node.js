const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  // Auto generate pages
  // Pages built using templates/page-template.js
  const pageData = [
    {
      name: "portfolio",
      title: "Portfolio",
      content: `
        <p> Pure HTML & CSS & JS implemented Widget</p>
        <a target="_blank" href="https://codepen.io/ethan-cao/pen/RwNJKxy">AnalogClock_SVG</a> <br>
        <a target="_blank" href="https://codepen.io/ethan-cao/pen/zYxaNpK">AutoComplete</a> <br>
        <a target="_blank" href="https://codepen.io/ethan-cao/pen/GRgGrww">ProgressBar 1</a> <br>
        <a target="_blank" href="https://codepen.io/ethan-cao/pen/KKweabp">ProgressBar 2</a> <br>
        <a target="_blank" href="https://codepen.io/ethan-cao/pen/abzKpPw">Tooltip</a> <br>
        <a target="_blank" href="https://github.com/ethan-cao/Email-editor">Email Editor</a> 
        <br>
        <p> Web App </p>
        <a target="_blank" href="https://todo-app-guangxue.herokuapp.com/">React-Redux-TODO</a> --
        <a target="_blank" href="https://github.com/ethan-cao/Todo-React-Redux">Source</a> 
        <br>
        <a target="_blank" href="https://radiant-lowlands-92286.herokuapp.com/">Email-Marketing</a> --
        <a target="_blank" href="https://github.com/ethan-cao/EmailMKT">Source & Instruction</a> 
        <br><br>
        More is coming...
      `
    },
    {
      name: "contact",
      title: "Contact",
      content: "Guangxue.Cao (AT) Outlook.com"
    },
    {
      name: "privacy",
      title: "Privacy",
      content:
        ""
    },
    {
      name: "404",
      title: "404 error"
    },
  ]

  pageData.forEach(page => {
    createPage({
      path: `/${page.name}`,
      component: require.resolve(`./src/templates/page-template.js`),
      context: { page },
    })
  })

  if (result.errors) {
    console.error(result.errors)
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.js`),
    })
  })

  // Create blog list pages
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 1
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
  {}
}
