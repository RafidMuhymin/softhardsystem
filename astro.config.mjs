export default {
  projectRoot: ".",
  src: "./src",
  pages: "./src/pages",
  dist: "./dist",
  public: "./public",
  buildOptions: {
    site: "https://softhardsystem.com/",
    sitemap: true,
  },
  devOptions: {
    port: 8000,
    tailwindConfig: "./tailwind.config.js",
  },

  renderers: [
    "@astrojs/renderer-svelte",
    "@astrojs/renderer-vue",
    "@astrojs/renderer-react",
    "@astrojs/renderer-preact",
  ],
};
