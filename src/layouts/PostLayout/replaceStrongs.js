export default function (document) {
  document.querySelectorAll("strong").forEach((strong) => {
    Array.from({ length: 4 })
      .map(() => {
        const top = Math.random() * 100 - 25;
        const left = Math.random() * 100;
        const length = Math.random() / 1.3 + 0.25;

        return `<svg
            viewbox="0 0 143 137"
            class="star absolute transition-all duration-500"
            style="top: ${top}%; left: ${left}%; width: ${length}rem; height: ${length}rem;"
            >
            <path d="m55 54-6 41-8-40-41-6 41-8 5-41 8 41 41 5Z" fill="#fc0"/>
        </svg>`;
      })
      .map((star) => {
        strong.innerHTML += star;
      });
  });
}
