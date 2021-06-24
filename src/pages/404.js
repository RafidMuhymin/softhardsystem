import React from "react";
import Layout from "../components/Templates/Layout/Layout";
import Search from "../components/Shared/Search/Search";
import SubscriptionForm from "../components/Forms/SubscriptionForm/SubscriptionForm";
import { Link } from "gatsby";
import error from "../../static/error.svg";
import "../styles/404.scss";

export default function NotFound() {
  return (
    <Layout>
      <div id="not-found" className="mx-auto text-center p-3">
        <h1>Oops... It seems the page you requested does not exist.</h1>
        <img src={error} alt="404 not found | The Muhymin Blog" />

        <p>
          Please check if you have made a typo in the URL. Or, you can search
          for articles below.
        </p>
        <div className="w-50 mx-auto">
          <Search />
        </div>
        <p className="mt-3">
          You can go back to the{" "}
          <strong>
            <Link to="/">Homepage</Link>
          </strong>{" "}
          or check out the recent{" "}
          <strong>
            <Link to="/blog">Blogposts</Link>
          </strong>{" "}
          if you think you have come here by mistake. Or, you can subscibe to
          The Muhymin Blog newsletter to get the latest updates delivered right
          to your Inbox.
        </p>
        <SubscriptionForm />
      </div>
    </Layout>
  );
}
