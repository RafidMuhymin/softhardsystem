const path = require("path");
const LoadablePlugin = require("@loadable/webpack-plugin");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "posts/" } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
          previous {
            frontmatter {
              title
              slug
            }
          }
          next {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `);
  const { edges } = data.allMdx;

  edges.forEach(({ node, previous, next }) => {
    const { slug } = node.frontmatter;
    actions.createPage({
      path: "/" + slug,
      component: path.resolve(
        "./src/components/Templates/PostTemplate/PostTemplate.js"
      ),
      context: { slug, previous, next },
    });
  });

  const postsPerPage = 6;
  const pageCount = Math.ceil(edges.length / postsPerPage);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `blog` : `blog/${i + 1}`,
      component: path.resolve(
        "./src/components/Templates/Blogpage/Blogpage.js"
      ),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        pageCount,
        currentPage: i + 1,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MdxFrontmatter implements Node {
      description: String
      facebook: String
      twitter: String
    }
  `;

  createTypes(typeDefs);
};

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
  });
};
