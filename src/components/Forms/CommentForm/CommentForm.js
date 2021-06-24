import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import "./CommentForm.scss";

export default function CommentForm({
  postTitle,
  setComments,
  isReplyForm,
  setIsReplyForm,
  selectedComment,
  setSelectedComment,
}) {
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(selectedComment);

  const onSubmit = async (data) => {
    setProcessing(true);
    const postReq = (req, method, callback) => {
      fetch("/api/comment", {
        method,
        body: JSON.stringify(req),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("Commented Successfully", res);
          callback(JSON.parse(localStorage.getItem(`comments-${postTitle}`)));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const setLocalStorage = (items) => {
      localStorage.setItem(`comments-${postTitle}`, JSON.stringify(items));
      setComments(items);
      setProcessing(false);
    };
    if (!isReplyForm) {
      data.postTitle = postTitle;
      data.date = new Date().getTime();
      postReq(data, "POST", (lscomments) => {
        let newLscomments = lscomments ? [...lscomments, data] : [data];
        setLocalStorage(newLscomments);
      });
    } else {
      const comment = selectedComment;
      comment.replies ??= [];
      data.date = new Date().getTime();
      comment.replies.push(data);
      postReq(comment, "PUT", (lscomments) => {
        lscomments.find((lscomment) => lscomment._id === comment._id).replies =
          comment.replies;
        setLocalStorage(lscomments);
        setIsReplyForm(false);
        setSelectedComment({});
      });
    }
  };
  return (
    <form id="comment-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="d-block">
        Your Name
        <input
          className="form-control my-2"
          type="text"
          {...register("name", { required: true })}
        />
      </label>
      {errors.name && <small>This field is required</small>}
      <label className="d-block">
        Type your Comment
        <textarea
          className="form-control my-2"
          cols="30"
          rows="5"
          {...register("comment", { required: true })}
        ></textarea>
      </label>
      {errors.comment && <small>This field is required</small>}
      <div className="d-flex align-items-center">
        <div
          className="flex-grow-1"
          style={{ height: "1px", backgroundColor: "lightgray" }}
        ></div>

        <SubmitButton
          className="form-control m-2 d-inline-block w-auto p-3 fs-5"
          boolean={processing}
          value="Post Your Comment"
        />

        <div
          className="flex-grow-1"
          style={{ height: "1px", backgroundColor: "lightgray" }}
        ></div>
      </div>
    </form>
  );
}
