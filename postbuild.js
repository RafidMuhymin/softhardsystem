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
  const { document } = new JSDOM(content).window;
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
  fs.writeFileSync(
    file,
    "<!DOCTYPE html>" + document.documentElement.outerHTML
  );
});

console.log("Finished minifying CSS in", new Date() - start, "ms");

(async () => {
  const itimBuffer = Buffer.from(
    fs.readFileSync("public/fonts/itim-v5-latin-regular.woff2")
  );

  const itimSubsetBuffer = await subsetFont(itimBuffer, chars, {
    targetFormat: "woff2",
  });

  fs.writeFileSync("dist/fonts/itim-v5-latin-regular.woff2", itimSubsetBuffer);
})();

console.log("Finished subsetting fonts in", new Date() - start, "ms");
