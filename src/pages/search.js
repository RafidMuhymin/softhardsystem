/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Templates/Layout/Layout";
import { graphql } from "gatsby";
import Search from "../components/Shared/Search/Search";
import "../styles/search.scss";
import SearchResult from "../components/PageComponents/Search/SearchResult";
import LazyLoad from "../components/Shared/LazyLoad/LazyLoad";
import loadable from "@loadable/component";
import elasticlunr from "elasticlunr";

const RecentBlogposts = loadable(() =>
  import("../components/PageComponents/Search/RecentBlogposts")
);

export default function search({ data, location }) {
  const query = location.search.slice(1);
  const [results, setResults] = useState([]);

  const buildIndex = useCallback(() => {
    const store = {};
    const index = elasticlunr(function () {
      this.setRef("id");
      this.addField("title");
      this.addField("slug");
      this.addField("image");
      this.saveDocument(false);

      data.allMdx.nodes.forEach((node) => {
        const id = node.id;
        const doc = {
          id,
          excerpt: node.excerpt,
          title: node.frontmatter.title,
          slug: node.frontmatter.slug,
          image: node.frontmatter.featuredImg.childImageSharp.gatsbyImageData,
        };
        this.addDoc(doc);
        store[id] = doc;
      });
    });
    return { index, store };
  }, [data.allMdx.nodes]);

  useEffect(() => {
    const { index, store } = buildIndex();
    const results = index
      .search(`${query}`, { expand: true })
      .map(({ ref }) => store[ref]);
    setResults(results);
  }, [query, buildIndex]);
  return (
    <Layout>
      <main id="search-results" className="py-3 px-4">
        {results.length > 0 ? (
          <>
            <h1 className="text-center">
              Total {results.length} Results Found for The Query "{query}"
            </h1>
            {results.map(({ id, title, slug, image, excerpt }) => {
              return (
                <SearchResult
                  key={id}
                  title={title}
                  slug={slug}
                  image={image}
                  excerpt={excerpt}
                ></SearchResult>
              );
            })}
          </>
        ) : (
          <>
            <h1 className="text-center">
              No results found for The Query "{query}"
            </h1>
            <p>
              Oops... It seems there seems to be no article for your search.
              Please make sure you have typed correctly and search again!
            </p>
            <div className="w-75 m-auto">
              <Search />
            </div>
            <h1 className="mt-3 text-center">Recent Blogposts</h1>
            <LazyLoad>
              <RecentBlogposts />
            </LazyLoad>
          </>
        )}
      </main>
    </Layout>
  );
}

export const query = graphql`
  {
    allMdx {
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
`;
