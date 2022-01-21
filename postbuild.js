const start = new Date();

const fs = require("fs");
const path = require("path");
const csso = require("csso");
const subsetFont = require("subset-font");
const { JSDOM } = require("jsdom");

const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles ||= [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      const filepath = path.join(dirPath, "/", file);
      path.parse(filepath).ext === ".html" && arrayOfFiles.push(filepath);
    }
  });

  return arrayOfFiles;
};

const allFiles = getAllFiles("./dist");

console.log(allFiles.length + " HTML files found");

let chars = "!";

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  const { document, location } = new JSDOM(content).window;
  const styleElement = document.querySelector("style");
  document.querySelectorAll("em, .pacific").forEach((node) => {
    chars += node.textContent;
  });
  const { css } = csso.minify(styleElement.textContent, {
    restructure: true,
    forceMediaMerge: true,
    comments: "exclamation",
  });
  styleElement.textContent = css;

  if (
    ["/update-ubuntu-terminal", "/install-usb-modem-ubuntu"].includes(
      location.pathname
    )
  ) {
    Array.from({ length: 29 }).forEach(() => {
      document.head.appendChild(document.body.firstElementChild);
    });
  }

  if (["/node-fetch"].includes(location.pathname)) {
    Array.from({ length: 28 }).forEach(() => {
      document.head.appendChild(document.body.firstElementChild);
    });
  }

  if (["/terms", "/privacy-policy"].includes(location.pathname)) {
    document.querySelector("#root").appendChild(document.body.lastElementChild);
    Array.from({ length: 21 }).forEach(() => {
      document.head.appendChild(document.body.firstElementChild);
    });
  }

  fs.writeFileSync(
    file,
    "<!DOCTYPE html>" + document.documentElement.outerHTML
  );
});

console.log("Finished PostBuild in", new Date() - start, "ms");

