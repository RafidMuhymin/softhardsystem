<Layout title="Soft">
  <div class="max-w-2xl p-6 mx-auto">
    <h1 class="flex flex-col justify-center">
      Soft
      <small class="text-right">{soft.length} Articles</small>
    </h1>
    <div class="flex flex-col gap-8 p-6">
      {soft.map((post) => {
        console.log(post);
        const { title, slug, modified, uagb_excerpt } = post;
        const { source_url, alt_text } = post._embedded["wp:featuredmedia"][0];

        const dateString =
          "`${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`";

        const dateArray = new Date(`${modified}Z`).toDateString().split(" ");
        const date = `${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
        return (
          <section>
            <a href={`/${slug}`}>
              <img src={source_url} alt={alt_text} />
            </a>

            <h2>
              <a href={`/${slug}`}>{title.rendered}</a>
            </h2>

            <p>{uagb_excerpt.slice(0, -8)}</p>

            <div class="flex flex-wrap justify-between items-center gap-2 py-4">
              <span class="inline-block">
                Last Updated : &nbsp;
                <time dateTime={`${modified}Z`}>
                  {`<script>
                    (() => {
                      const dateArray = new Date("${modified}Z").toDateString().split(" ");
                      document.write(${dateString});
                    })();
                  </script>`}
                  <noscript>{date}</noscript>
                </time>
              </span>

              <span class="inline-block">
                Categorized as :{" "}
                {post._embedded["wp:term"][0].map((cat, i) => (
                  <a href={`/category/${cat.slug}`}>
                    {cat.name}
                    {i === post._embedded["wp:term"][0].length - 1 ? "" : ", "}
                  </a>
                ))}
              </span>

              <span class="inline-block">
                Tagged :{" "}
                {post._embedded["wp:term"][1].map((tag, i) => (
                  <a href={`/tag/${tag.slug}`}>
                    {tag.name}
                    {i === post._embedded["wp:term"][1].length - 1 ? "" : ", "}
                  </a>
                ))}
              </span>
            </div>
            <Pushable slug={slug} />
          </section>
        );
      })}
    </div>
  </div>
</Layout>;
