import { postComment } from "../utils/api";
import { useState } from "react";

export const NewComment = ({ article_id, loggedIn }) => {
  const [newComment, setNewComment] = useState("");
  const [postedComment, setPostedComment] = useState();
  const [error, setError] = useState(false)
  const [submitBuffer, setSubmitBuffer] = useState(false)

  const postNewComment = (e) => {
    e.preventDefault();
    if (newComment !== "") {
      setPostedComment({ body: newComment, author: "tickle122" });
      setNewComment("");
      postComment(article_id, newComment, "tickle122")
      .catch(() => {
        setError(true);
      });
      e.target[0].value = "";
      setSubmitBuffer(true)
      setTimeout(() => {setSubmitBuffer(false)}, 500)
    }
  };

  const retryPostComment = () => {
      setError(false)
      postComment(article_id, postedComment.body, 'tickle122').catch(() => {
        setError(true)
    });
  }

  console.log(newComment);

 if (loggedIn === true) {
    return <div>
      <form
        onSubmit={(event) => {
            if (loggedIn === true) {
          postNewComment(event);
            } 
        }}
        className="new-comment"
      >
        <textarea
          className="new-comment-body"
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        ></textarea>
        <button className="new-comment-button" disabled={submitBuffer === true}>Submit</button>
      </form>
      { postedComment === undefined ? null : error === true ? (
        <div className="new-comment-card-error">

          <p className="username">{postedComment.author}</p>
          <p className="date">Date posted: Just now</p>
          <p className="comment-body">{postedComment.body}</p>
          <p>Something went wrong, please try again</p> <button onClick={() => {
          retryPostComment()
        }}>Try again</button>
        </div>
      ) : (
        <div className="new-comment-card">
          <p className="username">{postedComment.author}</p>
          <p className="date">Date posted: Just now</p>

          <p className="comment-body">{postedComment.body}</p>
        </div> ) }
  </div> 
  } else return <p className="comment-placeholder">Please log in to comment</p>


};
