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

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  const { document } = new JSDOM(content).window;
  const styleElement = document.querySelector("style");
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

(async () => {
  const fontBuffer = Buffer.from(
    fs.readFileSync("public/fonts/pacifico-v17-latin-regular.woff2")
  );

  let chars = "!";

  const allFiles = getAllFiles("./dist");

  allFiles.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const { document } = new JSDOM(content).window;
    document.querySelectorAll("em, .pacific").forEach((node) => {
      chars += node.textContent;
    });
  });

  const fontSubsetBuffer = await subsetFont(fontBuffer, chars, {
    targetFormat: "woff2",
  });

  const base64Font =
    "data:font/woff2;base64," + fontSubsetBuffer.toString("base64");

  allFiles.forEach((file) => {
    fs.writeFileSync(
      file,
      fs
        .readFileSync(file, "utf-8")
        .replace("/fonts/pacifico-v17-latin-regular.woff2", base64Font)
    );
  });
})();
