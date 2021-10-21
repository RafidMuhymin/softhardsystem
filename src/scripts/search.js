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

    document.querySelector(".search").innerHTML = `
        <div class="search-box">
          <h1>Search The Soft Hard System Blog</h1>
          <form
            class="relative mx-auto min-w-[50%]"
            onsubmit="event.preventDefault();navigate('search?query=' + query.value)"
          >
            <input
              type="text"
              placeholder="Search …"
              name="query"
              class="form-control w-full"
            />
            <input
              type="submit"
              value="🔎"
              class="bg-transparent absolute right-1 top-2/4 -translate-y-2/4 opacity-70 transition-opacity duration-300 hover:opacity-100 hover:cursor-pointer"
            />
          </form>
        </div>

        <main class="search-results">
          <h2>${data.length > 0 ? data.length : "No"} Result${
      data.length !== 1 ? "s" : ""
    } Found for The Query "${query}"</h2>
          ${data
            .map((post) => {
              const { slug, title, uagb_excerpt } = post;
              const { source_url, alt_text } =
                post._embedded["wp:featuredmedia"][0];
              const imageURL = source_url.slice(source_url.lastIndexOf("/"));
              return `
                <div class="result">
                  <a href="/${slug}">
                      <img loading="lazy" src="images${imageURL}" alt="${alt_text}" />
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
                </div>`;
            })
            .join("")}
        </main>`;

    if (data.length === 0) {
      const elementStyle = document.querySelector(".invisible-content").style;
      elementStyle.display = "block";
      elementStyle.contentVisibility = "visible";
    }
  } else {
    console.log(params);
  }
})();
