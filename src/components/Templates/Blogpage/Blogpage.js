import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../Layout/Layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { BgImage } from "gbimage-bridge";
import "./Blogpage.scss";

export default function Blog({ data, pageContext }) {
  const blogposts = data.allMdx.nodes;
  const recentBlogposts = blogposts.slice(0, 2);
  const siteAuthor = data.site.siteMetadata.author.name;
  const blogpageBanner = data.file.childImageSharp.gatsbyImageData;
  const { pageCount, currentPage } = pageContext;
  return (
    <Layout>
      <BgImage
        image={blogpageBanner}
        style={{ backgroundAttachment: "fixed" }}
        className="position-relative py-5"
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark overlay"></div>
        <div className="text-center text-white py-5 my-5 position-relative z-1">
          <h1>Blog</h1>
          <div className="h6">Fresh from the Press</div>
        </div>
      </BgImage>

      <div className="d-flex flex-column flex-md-row justify-content-between gap-5 m-md-0 m-5 recent-blogpost-container">
        {recentBlogposts.map(({ frontmatter, excerpt, id }) => {
          const { title, slug } = frontmatter;
          const featuredImg =
            frontmatter.featuredImg.childImageSharp.gatsbyImageData;
          const author = frontmatter.author?.id || siteAuthor;
          const publishedDate = new Date(frontmatter.date).toUTCString();

          return (
            <BgImage
              image={featuredImg}
              className="position-relative d-flex flex-column text-white bg-black p-4"
              key={id}
            >
              <Link to={"/" + slug}>
                <h2>{title}</h2>
              </Link>
              <h3>{author}</h3>
              <span>{publishedDate}</span>
              <p>{excerpt}</p>
            </BgImage>
          );
        })}
      </div>

      <div className="d-grid gap-4 px-4 mb-5 blogpost-container">
        {blogposts.map(({ frontmatter, excerpt, id }) => {
          const { title, slug } = frontmatter;
          const featuredImg =
            frontmatter.featuredImg.childImageSharp.gatsbyImageData;
          const author = frontmatter.author?.id || siteAuthor;
          const publishedDate = new Date(frontmatter.date).toUTCString();

          return (
            <div className="d-flex flex-column" key={id}>
              <Link to={"/" + slug}>
                <GatsbyImage image={featuredImg} alt={title} />
              </Link>
              <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                <Link className="title" to={"/" + slug}>
                  <h2>{title}</h2>
                </Link>
                <h3>{author}</h3>
                <span className="d-block my-2">{publishedDate}</span>
                <p>{excerpt}</p>
                <Link
                  to={"/" + slug}
                  className="read-more bg-secondary p-2 rounded-3 align-self-center"
                >
                  Read More …
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div id="pagination-navlinks" className="mx-auto text-center mb-3">
        <Link to="/blog">…</Link>
        {currentPage > 1 && (
          <Link
            to={`/blog${currentPage > 2 ? "/" + currentPage - 1 : null}`}
          >{`<`}</Link>
        )}

        <span className="current">{currentPage}</span>

        {currentPage < pageCount && (
          <Link to={`/blog/${currentPage + 1}`}>{`>`}</Link>
        )}
        <Link to={`/blog/${pageCount}`}>…</Link>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query blogposts($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "posts/" } }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        frontmatter {
          title
          slug
          date
          author {
            id
          }
          featuredImg {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
        excerpt
      }
    }

    site {
      siteMetadata {
        author {
          name
        }
      }
    }

    file(relativePath: { eq: "images/blogpage-banner-background.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;
