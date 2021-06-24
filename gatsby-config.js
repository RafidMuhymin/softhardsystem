const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    LMDB_STORE: true,
  },

  siteMetadata: {
    title: `Soft Hard System`,
    author: {
      name: `Rafid Muhymin Wafi`,
      summary: `A 17 year old boy who is more a passionate web developer and content creator than a high school student.`,
      profilePicture: `src/images/profilePicture/rafid-muhymin.jpg`,
    },
    description: `Soft Hard System is a blog by Rafid Muhymin Wafi where you'll find blogs and latest news about new technologies, tools, stacks, and coding.`,
    siteUrl: `https://muhymin.gatsbyjs.io`,
    social: {
      twitter: `wafi_rafid`,
      fb: `rafidmuhyminwafi`,
    },
  },

  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-svg-url-loader`,
    
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          placeholder: `blurred`,
        },
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },

    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2460,
              withWebp: true,
              withAvif: true,
              showCaptions: true,
              tracedSVG: true,
              }
          },
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-embed-snippet`,
            options: {
              directory: `${__dirname}/src/data/snippets`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },

    `gatsby-plugin-sass`,

    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-csso`)({
            restructure: true,
            forceMediaMerge: true,
            comments: "exclamation",
          }),
        ],
      },
    },

    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        ignore: ["src/styles/prismjs-a11y.css"],
        content: [
          path.join(process.cwd(), "src/**/!(*.d).{ts,js,jsx,tsx,md,mdx}"),
        ],
      },
    },

    {
      resolve: `gatsby-plugin-csp`,
      options: {
        mergeDefaultDirectives: true,
        directives: {
          "script-src":
            "'self' https://platform-api.sharethis.com https://l.sharethis.com https://count-server.sharethis.com",
          "style-src": "'self' 'unsafe-inline'",
          "img-src": "'self' data: https://platform-cdn.sharethis.com",
        },
      },
    },

    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://muhymin.gatsbyjs.io`,
        stripQueryString: true,
      },
    },

    `gatsby-plugin-catch-links`,
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-gatsby-cloud`,

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Learn About Latest Technologies and Coding in One Place | Soft Hard System`,
        short_name: `Soft Hard System`,
        description: `Soft Hard System is a blog by Rafid Muhymin Wafi where you'll find blogs and latest news about new technologies, tools, stacks, and coding.`,
        lang: "en",
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        crossOrigin: `use-credentials`,
        icon: "static/favicon.svg",
        include_favicon: false,
        cache_busting_mode: "name",
      },
    },

    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|[^:]static\/)/,
              handler: "CacheFirst",
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: "CacheFirst",
            },
            {
              urlPattern:
                /^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: "CacheFirst",
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: "CacheFirst",
            },
          ],
        },
      },
    },

    // {
    //   resolve: "gatsby-source-contentful",
    //   options: {
    //     spaceId: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    //     host: process.env.CONTENTFUL_HOST,
    //     downloadLocal: true,
    //   },
    // },

    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#0d6efd`,
        showSpinner: false,
      },
    },

    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    "/" +
                    edge.node.frontmatter.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    "/" +
                    edge.node.frontmatter.slug,
                  custom_elements: [{ "content:encoded": edge.node.body }],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      body
                      frontmatter {
                        title
                        date
                        slug
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "The Muhymin Blog || RSS Feed",
          },
        ],
      },
    },
  ],
  mapping: {
    "Mdx.frontmatter.author": `AuthorsJson`,
  },
};