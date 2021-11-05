(() => {
  const store = [];
  [...document.querySelectorAll(".content strong")]
    .filter((strong) => strong.firstElementChild?.nodeName !== "EM")
    .forEach((strong) => {
      strong.innerHTML = strong.innerText
        .split(" ")
        .map((word) => `<span>${word}</span>`)
        .join(" ");
    });

  const SVGHolders = document.querySelectorAll(".content strong span");

  SVGHolders.forEach((span) => {
    Array.from({ length: 4 }).forEach(() => {
      const top = Math.random() * 100 - 25;
      const left = Math.random() * 125 - 25;
      const length = Math.random() / 1.3 + 0.25;
      span.innerHTML += `<svg
                viewbox="0 0 143 137"
                class="star"
                style="top: ${top}%; left: ${left}%; width: ${length}rem; height: ${length}rem;"
                >
                <path d="m55 54-6 41-8-40-41-6 41-8 5-41 8 41 41 5Z" fill="#fc0"/>
            </svg>`;
    });
  });

  const SVGHolderObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      [...entry.target.children].forEach((star, i) => {
        const id = [...SVGHolders].indexOf(entry.target) * 10 + i;
        entry.isIntersecting
          ? (store[id] = setInterval(() => {
              const top = Math.random() * 100 - 25;
              const left = Math.random() * 125 - 25;
              const length = Math.random() / 1.3 + 0.25;
              const deg = Math.random() * 360;
              const scale = Math.random() / 1.5 + 1;
              const style = `top: ${top}%; left: ${left}%; width: ${length}rem; height: ${length}rem; transform: rotate(${deg}deg) scale(${scale})`;
              star.setAttribute("style", style);
            }, Math.random() * 300 + 700))
          : clearInterval(store[id]);
      });
    });
  });

  SVGHolders.forEach((span) => {
    SVGHolderObserver.observe(span);
  });

  const commentSection = document.querySelector(".comment-section");
  const commentForm = document.querySelector(".comment-form");
  const commentButton = document.querySelector(".comment-button");
  const parent = document.querySelector("input[name='parent']");
  const { value: postID } = document.querySelector("input[name='post']");
  let maxComment = 10;

  const focus = () => {
    const input = document.querySelector(`input[name="author_name"]`);
    input.scrollIntoView({ block: "center", behavior: "smooth" });
    input.focus({ preventScroll: true });
  };

  const leaveReply = ({ path }) => {
    commentSection.querySelector(".reply-header").innerHTML = `Reply to ${
      (path[3].id ? path[1] : path[2]).querySelector("cite span").textContent
    }`;
    parent.value = path[3].id ? path[3].id : path[4].id;
    commentSection.classList.add("reply-section");
    commentButton.textContent = "Post Reply";
    focus();
  };

  const createComment = async ({
    id,
    author_avatar_urls,
    author_name,
    author_url,
    date,
    content,
    _links,
  }) => {
    return `
      <div id="${id}" class="comment">
        <div>
          <figure>
            <img loading="lazy" width="96" height="96" src="${
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

  commentForm.onsubmit = async (e) => {
    e.preventDefault();
    const { innerHTML: buttonHTML } = commentButton;
    commentButton.innerHTML = `<div></div>`;

    const removeInfo = () => {
      setTimeout(() => {
        document.querySelector(".comment-section p").remove();
      }, 3000);
    };

    const handleError = (message) => {
      removeInfo();
      commentButton.insertAdjacentHTML(
        "afterend",
        `<p class="error">${message}</p>`
      );
    };

    fetch(`https://wp.softhardsystem.com/wp-json/wp/v2/comments`, {
      method: "POST",
      body: new FormData(e.target),
    })
      .then(async (res) => {
        const comment = await res.json();
        console.log(comment);
        const { status, message } = comment;
        const { value } = parent;
        commentButton.innerHTML = buttonHTML;
        if (status) {
          commentButton.textContent = "Post Comment";
          commentButton.insertAdjacentHTML(
            "afterend",
            `<p class="${status}">Your comment has been ${
              status === "hold"
                ? "sent for approval!"
                : status === "trash"
                ? "trashed!"
                : status === "spam"
                ? "marked as spam!"
                : "approved!"
            }</p>`
          );
          if (status === "approved") {
            const newComment = await createComment(comment);
            if (newComment) {
              const element =
                +value > 0
                  ? document.getElementById(value)
                  : document.querySelector(".comments h3");
              element.insertAdjacentHTML(
                `${+value > 0 ? "beforeend" : "afterend"}`,
                newComment
              );
              const replyCount = document.querySelector(".reply-count");
              replyCount.textContent = +replyCount.textContent + 1;
              const commentBox = document.getElementById(comment.id);
              commentBox.querySelector(".pushable").onclick = leaveReply;
              commentBox.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            }
          }
          commentSection.classList.remove("reply-section");
          commentForm.reset();
          removeInfo();
        } else {
          handleError(message);
        }
      })
      .catch(({ message }) => {
        handleError(message);
      });
  };

  const commentObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        commentObserver.disconnect();
        const { replyCount, commentCount, comments } = await (async () => {
          const replyCount = (
            await fetch(
              `https://wp.softhardsystem.com/wp-json/wp/v2/comments?per_page=1&post=${postID}`
            )
          ).headers.get("X-WP-TOTAL");
          const response = await fetch(
            `https://wp.softhardsystem.com/wp-json/wp/v2/comments?parent=0&post=${postID}`
          );
          const commentCount = response.headers.get("X-WP-TOTAL");
          const comments = await response.json();
          return { replyCount, commentCount, comments };
        })();

        console.log({ count: replyCount, comments });

        if (comments) {
          const commentsContainer = document.querySelector(".comments");
          const { innerHTML: commentHTML } = commentsContainer;
          commentsContainer.innerHTML = `<h3 align="center">${
            replyCount > 0
              ? `<span class="reply-count">${replyCount}</span> Replies`
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
              btn.onclick = leaveReply;
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
                      `https://wp.softhardsystem.com/wp-json/wp/v2/comments?parent=0&post=${postID}&page=${
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

  document.querySelector("button.cancel").onclick = (e) => {
    e.preventDefault();
    commentButton.textContent = "Post Comment";
    commentSection.classList.remove("reply-section");
    commentForm.reset();
  };
})();
