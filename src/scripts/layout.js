document.getElementById("menubar").onclick = () => {
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

window.matchMedia("(min-width : 768px)").addEventListener("change", (e) => {
  e.matches &&
    ((checkbox.checked = false), (document.body.style.overflow = "auto"));
});

window.onNavigate = () => {
  checkbox.checked = false;
  document.body.style.overflow = "auto";
};

window.onMount = () => {
  scan();
};
