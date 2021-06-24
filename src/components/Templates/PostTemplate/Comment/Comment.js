import React, { useCallback, useEffect, useState } from "react";
import CommentForm from "../../../Forms/CommentForm/CommentForm";
import "./Comment.scss";
import CommentBox from "./CommentBox/CommentBox";

export default function Comment({ postTitle }) {
  const [comments, setComments] = useState([]);
  const [isReplyForm, setIsReplyForm] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  const focusOnReply = () => {
    const replyForm = document.querySelector(
      '#comment-form input[name="name"]'
    );
    replyForm.scrollIntoView({ block: "center", behavior: "smooth" });
    replyForm.focus({ preventScroll: true });
  };

  const commentFetch = async () => {
    const res = await fetch("/api/comment", {
      headers: {
        postTitle: postTitle,
      },
    }).catch((err) => console.log(err));
    if (res) {
      const data = await res.json();
      if (data.length > 0) {
        localStorage.setItem(`comments-${postTitle}`, JSON.stringify(data));
        setComments(data);
      }
    }
  };

  useEffect(() => {
    const lsComments = JSON.parse(
      localStorage.getItem(`comments-${postTitle}`)
    );
    if (lsComments) {
      setComments(lsComments);
    } else {
      commentFetch();
    }
    if (isReplyForm === true) {
      focusOnReply();
    }
  }, [isReplyForm]);

  return (
    <div id="comment" className="w-100 d-flex flex-column flex-md-row">
      <div className="comments ps-5 pe-3 py-3">
        <h2>{comments.length} Comments</h2>
        {comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <>
                <CommentBox
                  comment={comment}
                  currentComment={comment}
                  isReplyForm={isReplyForm}
                  setIsReplyForm={setIsReplyForm}
                  setSelectedComment={setSelectedComment}
                  focusOnReply={focusOnReply}
                ></CommentBox>
                <hr />
              </>
            ))}
          </>
        ) : (
          <>
            <p>No one has commented yet. Be the first one to share a thought</p>
            <p>
              <em>
                Note: Make sure your comment is related to the article above.
                Please feel free to start a enjoyable conversation
              </em>
            </p>
          </>
        )}
      </div>
      <div className="px-5 py-3">
        <h3>Leave a Comment</h3>
        <CommentForm
          postTitle={postTitle}
          setComments={setComments}
          isReplyForm={isReplyForm}
          setIsReplyForm={setIsReplyForm}
          selectedComment={selectedComment}
          setSelectedComment={setSelectedComment}
        />
      </div>
    </div>
  );
}
