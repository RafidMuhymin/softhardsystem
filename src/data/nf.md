<pre><code class="language-js">const https = require("https");

const url = "https://jsonplaceholder.typicode.com/posts";

https

  .get(url, (res) => {
    let response = "";

    res.on("data", (chunk) => {
      response += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body); // do something with JSON
      } catch (error) {
        console.error(error.message);
      }
    });
  })

  .on("error", (error) => {
    console.error(error.message);
  });</code></pre>
