---
title: Best Gatsby Plugins
slug: best-gatsby-plugins
date: 2021-04-03T00:00:00+06:00
featuredImg: ../../images/featured/best-gatsby-plugins.png
---

## Best Gatsby Plugins

### Best Gatsby Plugins

#### Best Gatsby Plugins

##### Best Gatsby Plugins

###### Best Gatsby Plugins

Best Gatsby Plugins
<span> Best Gatsby Plugins</span>

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta repudiandae illum magni quod facilis dolor earum suscipit voluptatibus adipisci praesentium, placeat pariatur in amet unde aperiam voluptas cumque dicta autem vel distinctio id odio ratione. Animi suscipit consequatur fugit quos deserunt quisquam laborum, consectetur expedita doloribus, vitae, vel minima nobis.

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta repudiandae illum magni quod facilis dolor earum suscipit voluptatibus adipisci praesentium, placeat pariatur in amet unde aperiam voluptas cumque dicta autem vel distinctio id odio ratione. Animi suscipit consequatur fugit quos deserunt quisquam laborum, consectetur expedita doloribus, vitae, vel minima nobis.

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

```js
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  /* Your site config here */
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    FAST_DEV: true,
    FUNCTIONS: true,
  },

  siteMetadata: {
    title: `Soft Hard System`,
    author: {
      name: `Rafid Muhymin Wafi`,
      summary: `A 17 year old boy who is more a passionate web developer and content creator than a high school student.`,
    },
    description: `Soft Hard System is a blog by Rafid Muhymin Wafi where you'll find blogs and latest news about new technologies, tools, stacks, and coding.`,
    siteUrl: `https://muhymin.gatsbyjs.io`,
    social: {
      twitter: `@wafi_rafid`,
      fb: `https://web.facebook.com/rafidmuhyminwafi`,
    },
  },

  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-image`,

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        icon: `static/favicon.svg`,
      },
    },

    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
              maxWidth: 1024,
              withWebp: true,
              withAvif: true,
            },
          },
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-embed-snippet`,
          `gatsby-remark-prismjs`,
        ],
      },
    },

    `gatsby-plugin-sass`,
    `gatsby-plugin-postcss`,

    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        content: [
          path.join(process.cwd(), "src/**/!(*.d).{ts,js,jsx,tsx,md,mdx}"),
        ],
      },
    },

    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,

    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     name: `Learn About Latest Technologies and Coding in One Place | Soft Hard System`,
    //     short_name: `Soft Hard System`,
    //     description: `Soft Hard System is a blog by Rafid Muhymin Wafi where you'll find blogs and latest news about new technologies, tools, stacks, and coding.`,
    //     lang: "en",
    //     start_url: `/`,
    //     background_color: `#fff`,
    //     theme_color: `#fff`,
    //     display: `standalone`,
    //     crossOrigin: `use-credentials`,
    //     icon: "static/favicon.svg",
    //     cache_busting_mode: "none",
    //   },
    // },

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
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern:
                /^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: "StaleWhileRevalidate",
            },
          ],
        },
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`],
        resolvers: {
          Mdx: {
            title: (node) => node.frontmatter.title,
            path: (node) => node.frontmatter.slug,
          },
        },
      },
    },
    // {
    //   resolve: "gatsby-source-contentful",
    //   options: {
    //     spaceId: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    //     host: process.env.CONTENTFUL_HOST,
    //     // downloadLocal: true,
    //   },
    // },
  ],
};
```

| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> <cite>-- Benjamin Franklin</cite>
