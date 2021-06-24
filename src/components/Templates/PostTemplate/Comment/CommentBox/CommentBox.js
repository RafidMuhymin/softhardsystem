import React from "react";
import commenter from "../../../../../../static/commenter.svg";
import "./CommentBox.scss";

export default function CommentBox({
  comment,
  currentComment,
  isReplyForm,
  setIsReplyForm,
  setSelectedComment,
  focusOnReply,
  style,
}) {
  const publishedDate = new Date(comment.date).toUTCString();
  return (
    <div style={style}>
      <div className="comment-box d-flex flex-wrap my-3">
        <div className="image-holder">
          <img
            className="w-100"
            src={commenter}
            alt="commenter avatart | The Muhymin Blog"
          />
        </div>
        <div className="comment-details">
          <strong className="d-block">{comment.name} commented ―</strong>
          <span className="d-block text-secondary">{publishedDate}</span>
          <span className="d-block">{comment.comment}</span>
          {
            <button
              onClick={() => {
                if (isReplyForm) {
                  focusOnReply();
                } else {
                  setIsReplyForm(true);
                }
                setSelectedComment(currentComment);
              }}
              className="reply-button d-inline-block btn py-2 px-3 my-3"
            >
              <strong>Reply →</strong>
            </button>
          }
        </div>
      </div>
      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentBox
            comment={reply}
            currentComment={currentComment}
            isReplyForm={isReplyForm}
            setIsReplyForm={setIsReplyForm}
            setSelectedComment={setSelectedComment}
            style={{ width: "90%", marginLeft: "auto" }}
          ></CommentBox>
        ))}
    </div>
  );
}
