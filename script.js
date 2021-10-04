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

const stars = document.querySelectorAll(".star");

stars.forEach((star) => {
  setInterval(() => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const length = Math.random() / 2 + 0.25;
    const deg = Math.random() * 360;
    const scale = Math.random() / 2 + 1;

    const style = `top: ${top}%; left: ${left}%; width: ${length}rem; height: ${length}rem; transform: rotate(${deg}deg) scale(${scale})`;

    star.setAttribute("style", style);
  }, Math.random() * 500 + 500);
});
