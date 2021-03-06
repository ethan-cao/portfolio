import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/SEO"
import "../scss/main.scss"
import styles from "../scss/blog.module.scss"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    // console.log("all : ", posts)

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/blog/" : "/blog/" + (currentPage - 1).toString()
    const nextPage = "blog/" + (currentPage + 1).toString()

    return (
      <Layout>
        <Seo title="All blog posts" description="Recent posts" />

        <div className="blog-list">
          <h1>Posts</h1>
          {posts.map( ({node}) => {
            const title = node.frontmatter.title || node.frontmatter.path
            return (
              <article className={styles.item}>
                <div className={styles.title}>
                  <h2>
                    <Link to={node.frontmatter.path}>{title}</Link>
                  </h2>
                </div>
                <div className={styles.content}>
                  <p>{node.excerpt}</p>
                  <div className={styles.meta}>
                    <h4>{node.frontmatter.date}</h4>
                  </div>
                </div>
              </article>
            )
          })}

          {/* {!isFirst && (
            <Link className="btn" to={prevPage} rel="prev">
              Previous Page
            </Link>
          )}
          {!isLast && (
            <Link className="btn" to={nextPage} rel="next">
              Next Page
            </Link>
          )} */}
        </div>
      </Layout>
    )
  }
}
export const blogListQuery = graphql`
  query blogListQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YY")
            path
          }
          excerpt
        }
      }
    }
  }
`
