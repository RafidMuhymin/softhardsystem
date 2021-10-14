(() => {
  window.onMount = () => {
    scan();
    twinkle();
  };

  const twinkle = () => {
    const store = [];
    const strongs = document.querySelectorAll(".content strong");

    strongs.forEach((strong) => {
      Array.from({ length: 4 }).forEach(() => {
        const top = Math.random() * 100 - 25;
        const left = Math.random() * 125 - 25;
        const length = Math.random() / 1.3 + 0.25;
        strong.innerHTML += `<svg
              viewbox="0 0 143 137"
              class="star absolute transition-all duration-500"
              style="top: ${top}%; left: ${left}%; width: ${length}rem; height: ${length}rem;"
              >
              <path d="m55 54-6 41-8-40-41-6 41-8 5-41 8 41 41 5Z" fill="#fc0"/>
          </svg>`;
      });
    });

    const strongObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        [...entry.target.children]
          .filter((node) => node.nodeName === "svg")
          .forEach((star, i) => {
            const id = [...strongs].indexOf(entry.target) * 10 + i;
            entry.isIntersecting
              ? (store[id] = setInterval(() => {
                  const top = Math.random() * 100 - 25;
                  const left = Math.random() * 125 - 25;
                  const length = Math.random() / 1.3 + 0.25;
                  const deg = Math.random() * 360;
                  const scale = Math.random() / 2 + 1;
                  const style = `top: ${top}%; left: ${left}%; width: ${length}rem; height: ${length}rem; transform: rotate(${deg}deg) scale(${scale})`;
                  star.setAttribute("style", style);
                }, Math.random() * 200 + 300))
              : clearInterval(store[id]);
          });
      });
    });

    strongs.forEach((strong) => {
      strongObserver.observe(strong);
    });
  };

  twinkle();

  const commentObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        window[`${location.pathname}-comments`] ??= await (
          await fetch(
            `https://wp.softhardsystem.com/wp-json/wp/v2/comments?page=1&parent=0&post=${
              document.querySelector("article").id
            }`
          )
        ).json();

        console.log(window[`${location.pathname}-comments`]);

        const createComment = async ({
          id,
          author_avatar_urls,
          author_name,
          author_url,
          date,
          content,
          _links,
        }) => {
          return `<div id="${id}" class="comment">
          <div>
            <figure>
              <img width="96" height="96" src="${
                author_avatar_urls["96"]
              }" alt="${author_name}" />
            </figure>
            <div>
              <time dateTime="${date}Z">
                  ${(() => {
                    const dateArray = new Date(`${date}Z`)
                      .toDateString()
                      .split(" ");
                    return `${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
                  })()}
              </time>

              <cite>${
                author_url
                  ? `<a href="${author_url}">${author_name}</a>`
                  : author_name
              } wrote ➜</cite>

              ${content.rendered}

              <button class="pushable">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front">Leave a Reply ➜</span>
              </button>
            </div>
          </div>
          ${
            _links.children
              ? (
                  await Promise.all(
                    (
                      await (await fetch(_links.children[0].href)).json()
                    ).map(async (reply) => await createComment(reply))
                  )
                ).join("")
              : ""
          }
        </div>`;
        };

        if (
          window[`${location.pathname}-comments`] &&
          window[`${location.pathname}-comments`].length > 0
        ) {
          document.querySelector(".comments").innerHTML = `${(
            await Promise.all(
              window[`${location.pathname}-comments`].map(
                async (comment) => await createComment(comment)
              )
            )
          ).join("")}`;
        }
      }
    });
  });

  document.querySelectorAll(".comment-form, .comments").forEach((element) => {
    commentObserver.observe(element);
  });

  document.getElementById("commentbox").onsubmit = async (e) => {
    const { target: form } = e;
    e.preventDefault();

    const res = await fetch(
      `https://wp.softhardsystem.com/wp-json/wp/v2/comments?post=${
        document.querySelector("article").id
      }&content=${form.comment.value}&author_name=${
        form.name.value
      }&author_email=${form.email.value}&author_url=${form.siteurl.value}`,
      {
        method: "POST",
      }
    ).catch(({ message }) => {
      console.log(message);
    });

    console.log(await res.json());
  };
})();
