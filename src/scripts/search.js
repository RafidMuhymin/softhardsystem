(async () => {
  const params = {};
  [...new URLSearchParams(location.search).entries()].forEach(
    ([name, value]) => {
      (name = "query" || "page") && (params[name] = value);
    }
  );
  const { query = "", page = 1 } = params;

  const data = await (
    await fetch(
      `https://wp.softhardsystem.com/wp-json/wp/v2/posts?_embed&exclude=51,61&page=${page}&search=${query}`
    )
  ).json();

  const { length } = data;
  const resultCount = document.querySelector(".result-count");
  const unhide = (selector) => {
    const style = document.querySelector(selector).style;
    style.display = "flex";
    style.contentVisibility = "visible";
  };

  document.querySelector(".searching").style.display = "none";
  unhide(".search-box");
  unhide(".search-results");
  resultCount.textContent = `${length > 0 ? length : "No"} Result${
    length !== 1 ? "s" : ""
  } Found for
    The Query '${query}'`;
  resultCount.insertAdjacentHTML(
    "afterend",
    data
      .map((post) => {
        const { slug, title, uagb_excerpt } = post;
        const { source_url, alt_text } = post._embedded["wp:featuredmedia"][0];
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
      .join("")
  );
  length < 1 && unhide(".populars");
})();
