import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { BgImage } from "gbimage-bridge";
import "./Bio.scss";

export default function Bio() {
  const { file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "images/rafid-muhymin-profile-picture.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `);

  const profilePic = file.childImageSharp.gatsbyImageData;

  return (
    <div className="row front-bio">
      <BgImage
        loading="eager"
        image={profilePic}
        className="col-md-6 p-5 position-relative profile-picture"
      />
      
      <div className="col-md-6 p-5">
        <h3>Rafid Muhymin Wafi</h3>
        <br />
        <hr className="w-25" />
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          accusamus placeat debitis qui eligendi. Consectetur soluta laudantium
          maiores distinctio in architecto nihil! Unde voluptatibus tenetur
          nesciunt quis delectus corrupti, accusamus, quod ipsum ab aliquam sint
          natus vel ad quae nisi numquam odio molestias quibusdam cum esse totam
          fuga repellendus ipsam!
        </p>
      </div>
    </div>
  );
}