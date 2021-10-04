import Layout from "./Layout.astro";
import { createRequire } from "node:module";
const moduleRequire = createRequire(import.meta.url);
const { JSDOM } = moduleRequire("jsdom");

const { title, post } = Astro.props;

const { document } = new JSDOM(
  `<h2>Table Of Contents</h2>` + post.content.rendered
).window;

let toc = "";
let level = 0;
let headingNumber = 0;

const content = document.body.innerHTML.replace(
  /<h([\d])>([^<]+)<\/h([\d])>/gi,
  function (str, openLevel, titleText, closeLevel) {
    if (openLevel != closeLevel) {
      return str;
    }

    if (openLevel > level) {
      toc += new Array(openLevel - level + 1).join("<ul>");
    } else if (openLevel < level) {
      toc += new Array(level - openLevel + 1).join("</ul>");
    }

    level = parseInt(openLevel);
    headingNumber++;
    toc += `<li><a href="#toc-${headingNumber}">${titleText}</a></li>`;
    return `<h${openLevel} id="toc-${headingNumber}">${titleText}</h${closeLevel}>`;
  }
);

if (level) {
  toc += new Array(level + 1).join("</ul>");
  toc = new JSDOM(toc).window.document.body.firstChild.innerHTML;
}
