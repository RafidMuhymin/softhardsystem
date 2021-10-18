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

  const commentSection = document.querySelector(".comment-section");
  const { innerHTML: commentSectionHTML } = commentSection;
  const { id } = document.querySelector("article");
  let maxComment = 10;

  const commentObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        commentObserver.disconnect();
        const { replyCount, commentCount, comments } = await (async () => {
          const replyCount = (
            await fetch(
              `https://wp.softhardsystem.com/wp-json/wp/v2/comments?per_page=1&post=${id}`
            )
          ).headers.get("X-WP-TOTAL");
          const response = await fetch(
            `https://wp.softhardsystem.com/wp-json/wp/v2/comments?parent=0&post=${id}`
          );
          const commentCount = response.headers.get("X-WP-TOTAL");
          const comments = await response.json();
          return { replyCount, commentCount, comments };
        })();

        console.log({ count: replyCount, comments });

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
            <div class="comment-details">
              <time dateTime="${date}Z">
                  ${(() => {
                    const dateArray = new Date(`${date}Z`)
                      .toDateString()
                      .split(" ");
                    return `${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
                  })()}
              </time>

              <cite>
                <span>${
                  author_url
                    ? `<a href="${author_url}">${author_name}</a>`
                    : author_name
                }</span>
              wrote ➜</cite>

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

        const focus = () => {
          const input = document.querySelector(`input[name="name"]`);
          input.scrollIntoView({ block: "center", behavior: "smooth" });
          input.focus({ preventScroll: true });
        };

        if (comments) {
          const commentsContainer = document.querySelector(".comments");
          const { innerHTML: commentHTML } = commentsContainer;
          commentsContainer.innerHTML = `<h3 align="center">${
            replyCount > 0
              ? `${replyCount} Replies`
              : "No one has commented yet"
          } on <span class="pacific">${
            document.querySelector("h1").textContent
          }${replyCount > 0 ? "" : "!"}</span>${
            replyCount > 0
              ? ""
              : " Don't miss the chance to be the first one to share a thought!"
          }</h3>${
            replyCount > 0
              ? ""
              : `<button class='pushable focus'>
                  <span class="shadow"></span>
                  <span class="edge"></span>
                  <span class="front">Focus on Comment Box ➜</span>
                </button>`
          }${(
            await Promise.all(
              comments.map(async (comment) => await createComment(comment))
            )
          ).join("")}${
            replyCount > 10
              ? `<button class='li-btn pushable load'>
                  <span class="shadow"></span>
                  <span class="edge"></span>
                  <span class="front">Load More Comments ➜</span>
                </button>`
              : ""
          }`;

          commentsContainer.innerHTML !== commentHTML &&
            document.querySelectorAll("button.pushable").forEach((btn) => {
              btn.onclick = ({ path }) => {
                const authorName = (
                  path[3].id ? path[1] : path[2]
                ).querySelector("cite span").textContent;
                let replySection = commentSection.cloneNode(true);
                replySection.id = "reply-section";
                replySection.querySelector(
                  "h2"
                ).outerHTML = `<h2 align="center">Reply to ${authorName}</h2>`;
                const button = replySection.querySelector("button");
                button.insertAdjacentHTML(
                  "afterend",
                  `<button class="cancel">Cancel Reply</button>`
                );
                button.textContent = "Post Reply";
                commentSection.replaceWith(replySection);
                replySection = document.querySelector("#reply-section");
                const cancelButton =
                  replySection.querySelector("button.cancel");
                focus();
                replySection.onsubmit = (e) => {
                  e.preventDefault();
                  const { innerHTML: buttonHTML } = e.submitter;
                  e.submitter.innerHTML = `<div></div>`;
                  postComment(
                    e.target,
                    buttonHTML,
                    path[3].id ? path[3].id : path[4].id
                  );
                };
                cancelButton.onclick = () => {
                  replySection.replaceWith(commentSection);
                };
              };
            });

          if (!(replyCount > 0)) {
            document.querySelector("button.focus").onclick = focus;
          }
          if (commentCount > 10) {
            const button = document.querySelector("button.load");
            button.onclick = async () => {
              const { innerHTML: buttonHTML } = button;
              button.querySelector(".front").innerHTML = "<div></div>";
              await Promise.all(
                (
                  await (
                    await fetch(
                      `https://wp.softhardsystem.com/wp-json/wp/v2/comments?parent=0&post=${id}&page=${
                        maxComment / 10 + 1
                      }`
                    )
                  ).json()
                ).map(async (comment) => await createComment(comment))
              ).then((html) => {
                html = html.join("");
                maxComment += 10;
                maxComment < commentCount
                  ? (button.insertAdjacentHTML("beforebegin", html),
                    (button.innerHTML = buttonHTML))
                  : (button.outerHTML = html);
              });
            };
          }
        }
      }
    });
  });

  document
    .querySelectorAll(".comment-section, .comments")
    .forEach((element) => {
      commentObserver.observe(element);
    });

  document.querySelector(".comment-form").onsubmit = (e) => {
    e.preventDefault();
    const { innerHTML: buttonHTML } = e.submitter;
    e.submitter.innerHTML = `<div></div>`;
    postComment(e.target, buttonHTML);
  };

  const postComment = async (form, buttonHTML, parent) => {
    fetch(
      `https://wp.softhardsystem.com/wp-json/wp/v2/comments?post=${
        document.querySelector("article").id
      }&author_name=${form.name.value}&author_email=${
        form.email.value
      }&author_url=${form.siteurl.value}${
        parent ? `&parent=${parent}` : ""
      }&content=${encodeURI(form.comment.value)}`,
      {
        method: "POST",
      }
    )
      .then(async (res) => {
        const comment = await res.json();
        console.log(comment);
        const { status, message } = comment;
        if (status) {
          document.querySelector(".comment-section").innerHTML =
            commentSectionHTML;
          document
            .querySelector(".comment-section button")
            .insertAdjacentHTML(
              "afterend",
              `<p class="${status}">Your comment has been ${
                status === "hold"
                  ? "sent for approval!"
                  : status === "trash"
                  ? "trashed!"
                  : status === "spam"
                  ? "marked as spam!"
                  : "approved! Reload to see the changes!"
              }</p>`
            );
          setTimeout(() => {
            document
              .querySelector(".comment-section button")
              .nextElementSibling.remove();
          }, 3000);
        } else {
          const button = document.querySelector(".comment-form button");
          document.querySelector(".comment-form").reset();
          button.innerHTML = buttonHTML;
          button.insertAdjacentHTML(
            "afterend",
            `<p class="error">${message}</p>`
          );
          setTimeout(() => {
            document
              .querySelector(".comment-section button")
              .nextElementSibling.remove();
          }, 3000);
        }
      })
      .catch(({ message }) => {
        console.log(message);
        const button = document.querySelector(".comment-form button");
        document.querySelector(".comment-form").reset();
        button.innerHTML = buttonHTML;
        button.insertAdjacentHTML(
          "afterend",
          `<p class="error">${message}</p>`
        );
        setTimeout(() => {
          document
            .querySelector(".comment-section button")
            .nextElementSibling.remove();
        }, 3000);
      });
  };
})();
