import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import SearchResult from "./SearchResult";

export default function RecentBlogposts() {
  const { allMdx } = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fileAbsolutePath: { regex: "posts/" } }
        limit: 4
      ) {
        nodes {
          id
          excerpt
          frontmatter {
            title
            slug
            featuredImg {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `);
  return (
    <>
      {allMdx.nodes.map((blogpost) => {
        const { id, excerpt } = blogpost;
        const { title, slug, featuredImg } = blogpost.frontmatter;
        const { gatsbyImageData } = featuredImg.childImageSharp;
        return (
          <SearchResult
            key={id}
            title={title}
            slug={slug}
            image={gatsbyImageData}
            excerpt={excerpt}
          ></SearchResult>
        );
      })}
    </>
  );
}
