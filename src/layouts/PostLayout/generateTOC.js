export default function (document) {
  let TOC = "";
  let level = 0;
  let headingNumber = 0;

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

  return TOC;
}
