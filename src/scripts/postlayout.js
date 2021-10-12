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

commentbox.onsubmit = async (e) => {
  const { target: form } = e;
  e.preventDefault();

  const res = await fetch(
    `https://wp.softhardsystem.com/wp-json/wp/v2/comments?post=6&author_email=${form.email.value}&author_name=${form.name.value}&content=${form.comment.value}`,
    {
      method: "POST",
    }
  ).catch(({ message }) => {
    console.log(message);
  });

  const { data } = await res.json();

  console.log(data);
};
