import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/SEO"
import Img from "gatsby-image"
import "../scss/main.scss"

export default function Template({ data }) {
  const { markdownRemark } = data // Object destructuring
  const { frontmatter, html } = markdownRemark // Object destructuring og markdownRemark
  let featuredImg = markdownRemark.frontmatter.featuredImage;
  let featuredImgFluid = featuredImg ? featuredImg.childImageSharp.fluid : null;

  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        {featuredImgFluid ?  (<Img fluid={featuredImgFluid} />) : ("")}
        <div  
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`