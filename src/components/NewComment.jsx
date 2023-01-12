import { postComment } from "../utils/api";
import { useState } from "react";
import { CommentError } from "./CommentError";
import { deleteComment } from "../utils/api";

export const NewComment = ({ article_id, loggedIn, setCommentRemoved }) => {
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState();
  const [postedComment, setPostedComment] = useState({});
  const [deleteNewCommentBuffer, setDeleteNewCommentBuffer] = useState(false)
  const [error, setError] = useState(false)
  const [submitBuffer, setSubmitBuffer] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [deleted, setDeleted] = useState(false)

  const removeComment = (comment_id) => {
    setDeleting(true)
    deleteComment(comment_id).then(() => {
      setDeleting(false)
      setDeleted(true)
    })
}

  const postNewComment = (e) => {
    e.preventDefault();
    if (newComment !== "") {
      setPostingComment({ body: newComment, author: "tickle122" });
      setNewComment("");
      postComment(article_id, newComment, "tickle122")
      .then(({data}) => {
        setPostedComment(data.comment)
        setDeleteNewCommentBuffer(true)
      })
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
      postComment(article_id, postingComment.body, 'tickle122')
      .catch(() => {
        setError(true)
    });
  }


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
        <textarea placeholder="Have your say..."
          className="new-comment-body"
            value={newComment}
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        ></textarea>
        <button className="new-comment-button" disabled={submitBuffer === true || newComment === ''}>Submit</button>
      </form>
      { postingComment === undefined ? null : error === true ? (
       <CommentError retryPostComment={retryPostComment} postingComment={postingComment}/>
      ) : deleting === true ? <div className="deleted-comment-card">
      <p className="comment-body">Comment deleting</p>
    </div> : deleted === true ? <div className="deleted-comment-card">
    <p className="comment-body">Comment deleted</p>
  </div> : (
        <div className="new-comment-card">
            <div className="new-comment-header">
          <p className="username">{postingComment.author}</p>
          <p className="date">Date posted: Just now</p>
          </div>
          <p className="comment-body">{postingComment.body}</p>
          <button disabled={deleteNewCommentBuffer === false || deleting === true} onClick={() => {removeComment(postedComment?.comment_id)}} className="delete-comment">Delete</button>
        </div> ) }
  </div> 
  } else return <p className="login-placeholder">Please log in to comment</p>


};
