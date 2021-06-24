import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import SubscriptionForm from "../../../Forms/SubscriptionForm/SubscriptionForm";
import Search from "../../../Shared/Search/Search";
import AuthorBio from "../AuthorBio/AuthorBio";
import "./Sidebar.scss";

export default function Sidebar({
  author,
  authorBio,
  authorFb,
  authorTwitter,
  authorProfilePicture,
}) {
  const { allMdx } = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fileAbsolutePath: { regex: "posts/" } }
        limit: 4
      ) {
        nodes {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `);

  return (
    <aside id="sidebar" className="mx-5 mx-md-0 my-3 px-5 px-md-3 py-3">
      <Search />
      <div className="h3 my-2">Recent Posts</div>
      {allMdx.nodes.map((node) => {
        return (
          <Link className="d-block my-2" to={"/" + node.frontmatter.slug}>
            {node.frontmatter.title}
          </Link>
        );
      })}
      <hr />
      <AuthorBio
        author={author}
        authorBio={authorBio}
        authorFb={authorFb}
        authorTwitter={authorTwitter}
        authorProfilePicture={authorProfilePicture}
      />
      <hr />
      <SubscriptionForm isSidebar={true} />
    </aside>
  );
}
