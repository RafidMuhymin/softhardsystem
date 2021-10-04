import fs from "fs";
import path from "path";
import { createRequire } from "module";
const moduleRequire = createRequire(import.meta.url);
const { JSDOM } = moduleRequire("jsdom");

export default async function (returnLegalDocs) {
  const data = await (async () => {
    global.data = global.data
      ? global.data
      : await (async () => {
          const { token } = await (
            await fetch(__SNOWPACK_ENV__.SNOWPACK_PUBLIC_JWT_API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_WP_USERNAME,
                password: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_WP_PASS,
              }),
            })
          ).json();

          return await (
            await fetch(__SNOWPACK_ENV__.SNOWPACK_PUBLIC_WPAPI_URL, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          ).json();
        })();
    return global.data;
  })();

  if (returnLegalDocs) {
    global.legalDocs = global.legalDocs
      ? global.legalDocs
      : data.filter(
          ({ slug }) => slug === "terms" || slug === "privacy-policy"
        );
    return global.legalDocs;
  } else {
    global.posts = global.posts
      ? global.posts
      : await (async () => {
          const posts = data.filter(
            ({ slug }) => slug !== "terms" && slug !== "privacy-policy"
          );

          posts.forEach(async (post) => {
            const dom = new JSDOM(post.content.rendered);
            const { document } = dom.window;

            const getFilename = async (href, hostname) => {
              if (
                hostname !== "localhost" &&
                hostname !== "softhardystem.com"
              ) {
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
            post._embedded["wp:featuredmedia"][0].source_url =
              featuredImageFilename;

            let itemsProcessed = 0;

            const forEachFunction = async (image, callback) => {
              const { href, hostname } = new URL(image.src);
              const src = await getFilename(href, hostname);
              image.src = src ? src : image.src;

              image.srcset = (
                await Promise.all(
                  image.srcset.split(" ").map(async (src) => {
                    try {
                      const { href, hostname } = new URL(src);
                      const filename = await getFilename(href, hostname);
                      return filename ? filename : src;
                    } catch (err) {
                      return src;
                    }
                  })
                )
              ).join(" ");
              callback();
            };

            [...document.images].forEach(async (image, index, array) => {
              forEachFunction(image, () => {
                itemsProcessed++;
                if ((itemsProcessed = array.length)) {
                  post.content.rendered = document.body.innerHTML;
                }
              });
            });
          });
          return posts;
        })();
    return global.posts;
  }
}
