import { viteSingleFile } from "vite-plugin-singlefile";

export default {
  buildOptions: {
    site: "https://softhardsystem.com/",
  },
  vite: {
    plugins: [viteSingleFile()],
    build: {
      target: "esnext",
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
      brotliSize: false,
      rollupOptions: {
        inlineDynamicImports: true,
      },
    },
  },
};
