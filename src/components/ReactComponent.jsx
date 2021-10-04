import React from "react";
import fetch from "node-fetch";

export default function ReactComponent() {
  (async () => {
    const response = await fetch("https://css-tricks.com/wp-json/wp/v2/posts");

    const data = await response.json();

    console.log(data);
  })();
  return <div>I'm a React Component!</div>;
}
