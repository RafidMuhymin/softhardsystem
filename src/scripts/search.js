(async () => {
  const params = {};
  [...new URLSearchParams(location.search).entries()].forEach(
    ([name, value]) => {
      (name = "query" || "page") && (params[name] = value);
    }
  );
  const { query, page } = params;
  if (query) {
    const data = await (
      await fetch(
        `https://wp.softhardsystem.com/wp-json/wp/v2/posts?_embed&exclude=51,61&${
          page ? `page=${page}&` : ""
        }search=${query}`
      )
    ).json();

    console.log(data);

    if (data.length > 0) {
      const searchResults = document.createElement("div");
      searchResults.classList.add("search-results");
      searchResults.innerHTML = data
        .map((post) => {
          const { slug, title, uagb_excerpt } = post;
          const { source_url, alt_text } =
            post._embedded["wp:featuredmedia"][0];
          const imageURL = source_url.slice(source_url.lastIndexOf("/"));
          return `<section class="result">
            <a href="/${slug}">
                <img src="images${imageURL}" alt="${alt_text}" />
            </a>
            <div>
                <h2>
                    <a href="/${slug}">${title.rendered}</a>
                </h2>
                <p>${uagb_excerpt.slice(0, -8)}</p>
                <a href="/${slug}" class="pushable">
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front">Leave a Reply ➜</span>
                </a>
            </div>
        </section>`;
        })
        .join("");
      document.querySelector(".search").appendChild(searchResults);
    } else {
    }
  } else {
    console.log(params);
  }
})();
