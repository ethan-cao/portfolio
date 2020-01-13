import React from "react"
import Layout from "../components/layout"
import Seo from "../components/SEO"

export default ({ pageContext: { page } }) => (
  <Layout>
    <Seo title={page.name} description={page.title} />
    <div className="page-standard">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{__html: page.content}}></div>
    </div>
  </Layout>
)
