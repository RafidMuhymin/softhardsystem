import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import "./ContactForm.scss";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [processing, setProcessing] = useState(false);

  const onSubmit = (data) => {
    setProcessing(true);
    const { name, info } = data;
    window.open(
      `mailto:?to=rafidmuhymin@gmail.com&subject=I am ${name} contacting you via the contact form on your website&body=${info}`,
      "_blank"
    );
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        setProcessing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form id="contact-form" className="p-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">Send Us a Message</h2>
      
      <label>
      Enter Your Email Address
      <input
        className="form-control my-3"
        type="email"
        {...register("email", { required: true })}
      />
      </label>
      {errors.name && <small>This field is required</small>}
      
      <label>
      <input
        className="form-control my-3"
        type="text"
        placeholder="Enter Your Name"
        {...register("name", { required: true })}
      />
      </label>
      {errors.email && <small>This field is required</small>}
      
      <label>
      Enter Your Website URL
      <input
        className="form-control my-3"
        type="url"
        {...register("website")}
      />
      </label>
      
      <label>
      Type What You Want to Talk About
      <textarea
        className="form-control my-3"
        cols="30"
        rows="5"
        {...register("info", { required: true })}
      ></textarea>
      </label>
      {errors.info && <small>This field is required</small>}

      <SubmitButton
        className="form-control my-3 bg-dark text-white"
        id="contact-btn"
        boolean={processing}
        value="Contact"
      />

      <small className="d-block my-2 text-center">
        <em>* You'll be redirected to your Mail Client when you submit.</em>
      </small>
    </form>
  );
}