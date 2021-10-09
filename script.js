const menubar = document.getElementById("menubar");

menubar.onclick = () => {
  const checkbox = document.getElementById("checkbox");

  const form = document.querySelector("#header > div form");
  const navlinks = document.querySelectorAll("#header > div nav a");

  if (checkbox.checked) {
    navlinks.forEach((l, i) => {
      l.animate({ left: [0, `-${300 + (navlinks.length - i) * 100}%`] }, 500);
    });
    form.animate({ left: [0, "-100%"] }, 500).onfinish = () => {
      checkbox.checked = false;
      document.body.style.overflow = "auto";
    };
  } else {
    checkbox.checked = true;
    document.body.style.overflow = "hidden";
    form.animate({ left: ["-100%", 0] }, 400);
    navlinks.forEach((l, i) => {
      l.animate({ left: ["-100%", 0] }, 200 + i * 100);
    });
  }
};

window.onresize = () => {
  if (window.innerWidth >= 768) {
    checkbox.checked = false;
    document.body.style.overflow = "auto";
  }
};

window.onNavigate = () => {
  checkbox.checked = false;
  document.body.style.overflow = "auto";
};

window.onMount = () => {
  scan();
};

const store = [];
const strongs = document.querySelectorAll(".content strong");
const stars = document.querySelectorAll(".star");

const strongObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    [...entry.target.children]
      .filter((node) => node.nodeName === "svg")
      .forEach((star, i) => {
        const id = [...strongs].indexOf(entry.target) * 10 + i;
        entry.isIntersecting
          ? (store[id] = setInterval(() => {
              const top = Math.random() * 100 - 25;
              const left = Math.random() * 100;
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

const postComment = (e, name, comment) => {
  e.preventDefault();
  console.log(
    JSON.stringify({
      name,
      comment,
    })
  );
};
