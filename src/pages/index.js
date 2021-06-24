import React from "react";
import Layout from "../components/Templates/Layout/Layout";
import SubscriptionForm from "../components/Forms/SubscriptionForm/SubscriptionForm";
import Bio from "../components/Shared/Bio/Bio";
import { graphql, useStaticQuery } from "gatsby";
import { BgImage } from "gbimage-bridge";
import "../styles/index.scss";

export default function Index() {
  const { file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "images/front-banner-background.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `);

  const frontBanner = file.childImageSharp.gatsbyImageData;
  return (
    <Layout>
      <BgImage
        loading="eager"
        style={{ backgroundClip: "border-box" }}
        image={frontBanner}
        className="row p-3"
      >
        <div className="col-md-5">
          <SubscriptionForm></SubscriptionForm>
        </div>
      </BgImage>
      <Bio />
    </Layout>
  );
}
