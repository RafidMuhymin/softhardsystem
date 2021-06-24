import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export default function SearchResult({ title, slug, image, excerpt }) {
  return (
    <div>
      <div className="search-result row m-3 mx-sm-0">
        <GatsbyImage
          className="col-sm-4 col-12 d-block rounded-3"
          image={image}
          alt={title}
        ></GatsbyImage>
        <div className="col-sm-8 col-12 d-flex flex-column justify-content-between p-3 my-sm-0 my-2">
          <Link className="fs-4 fw-bolder" to={"/" + slug}>
            {title}
          </Link>
          <p>{excerpt}</p>
          <Link className="text-end" to={"/" + slug}>
            Continue Reading ➡
          </Link>
        </div>
      </div>
    </div>
  );
}
