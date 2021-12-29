import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

const { token } = await (
  await fetch(import.meta.env.PUBLIC_JWT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: import.meta.env.PUBLIC_WP_USERNAME,
      password: import.meta.env.PUBLIC_WP_PASS,
    }),
  })
).json();

const data = await (
  await fetch(import.meta.env.PUBLIC_WPAPI_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
).json();

const legalDocs = data.filter(
  ({ slug }) => slug === "terms" || slug === "privacy-policy"
);

const WPPosts = data.filter(
  ({ slug }) => slug !== "terms" && slug !== "privacy-policy"
);

const posts = [];

for (const post of WPPosts) {
  const dom = new JSDOM(post.content.rendered);
  const { document } = dom.window;

  const getFilename = async (href, hostname) => {
    if (hostname !== "localhost" && hostname !== "softhardsystem.com") {
      const filename = path.parse(href).base;

      if (!fs.existsSync(`public/images/${filename}`)) {
        const image = await (await fetch(href)).blob();
        const buffer = Buffer.from(await image.arrayBuffer());
        fs.writeFileSync(`public/images/${filename}`, buffer);
      }
      return `/images/${filename}`;
    }
  };

  const { href, hostname } = new URL(
    post._embedded["wp:featuredmedia"][0].source_url
  );
  const featuredImageFilename = await getFilename(href, hostname);
  post._embedded["wp:featuredmedia"][0].source_url = featuredImageFilename;

  for (const image of [...document.images]) {
    const { href, hostname } = new URL(image.src);
    const src = await getFilename(href, hostname);
    image.src = src ? src : image.src;

    const srcset = [];

    for (const src of image.srcset.split(" ")) {
      try {
        const { href, hostname } = new URL(src);
        const filename = await getFilename(href, hostname);
        srcset.push(filename ? filename : src);
      } catch (err) {
        srcset.push(src);
      }
    }

    image.srcset = srcset.join(" ");
  }

  post.content.rendered = document.body.innerHTML;
  posts.push(post);
}

const store = { legalDocs, posts };

export default async function (returnLegalDocs) {
  const { legalDocs, posts } = store;
  return returnLegalDocs ? legalDocs : posts;
}
