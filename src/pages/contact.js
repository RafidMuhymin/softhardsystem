import React from "react";
import Layout from "../components/Templates/Layout/Layout";
import ContactForm from "../components/Forms/ContactForm/ContactForm";

export default function Contact() {
  return (
    <Layout>
      <div className="contact-header row bg-dark justify-content-center">
        <div className="col-md-6 py-5 my-5 mx-2">
          <h1 className="text-center text-white">Need Help?</h1>
          <p className="text-center text-white">
            Are you confused about something? Want some expert advice? No
            problem, Rafid Muhymin Wafi is here to help you.
          </p>
        </div>
      </div>
      <div className="form-container row justify-content-center">
        <div className="col-md-6 p-4">
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
}
