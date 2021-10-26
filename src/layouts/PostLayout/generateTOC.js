export default function (document) {
  let TOC = "";
  let level = 0;
  let headingNumber = 0;

  const htmlArray = [];

  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading, i) => {
    htmlArray[i] = heading.innerHTML;
    heading.innerHTML = heading.textContent;
  });

  document.body.innerHTML = document.body.innerHTML.replace(
    /<h([\d])>([^<]+)<\/h([\d])>/gi,
    (str, openLevel, titleText, closeLevel) => {
      if (openLevel != closeLevel) {
        return str;
      }

      if (openLevel > level) {
        TOC += new Array(openLevel - level + 1).join("<ul>");
      } else if (openLevel < level) {
        TOC += new Array(level - openLevel + 1).join("</ul>");
      }

      level = parseInt(openLevel);
      headingNumber++;
      TOC += `<li><a href="#toc-${headingNumber}">${titleText}</a></li>`;
      return `<h${openLevel} id="toc-${headingNumber}">${titleText}</h${closeLevel}>`;
    }
  );

  if (level) {
    TOC += new Array(level + 1).join("</ul>");
  }

  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading, i) => {
    heading.innerHTML = htmlArray[i];
  });

  const toc = document.createElement("div");
  toc.innerHTML = TOC;

  while (
    [...toc.firstChild.children].length === 1 &&
    toc.firstChild.firstChild.nodeName === "UL"
  ) {
    toc.innerHTML = toc.firstChild.innerHTML;
  }

  toc.querySelectorAll("ul ul").forEach((ul) => {
    ul.outerHTML = `<li>${ul.outerHTML}</li>`;
  });

  return toc.innerHTML;
}
