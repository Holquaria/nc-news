import { postComment } from "../utils/api";
import { useContext, useState } from "react";
import { CommentError } from "./CommentError";
import { deleteComment } from "../utils/api";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { UserContext } from "../context/User";

export const NewComment = ({ article_id }) => {
  const { user } = useContext(UserContext)
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState([]);
  const [postedComment, setPostedComment] = useState([]);
  const [deleteNewCommentBuffer, setDeleteNewCommentBuffer] = useState(false)
  const [error, setError] = useState(false)
  const [submitBuffer, setSubmitBuffer] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [deleted, setDeleted] = useState(false)

  const postNewComment = (e) => {
    e.preventDefault();
    if (newComment !== "") {
      setPostingComment((currComments) => {
       return [{ body: newComment, author: user }, ...currComments, ]
      });
      setNewComment("");
      postComment(article_id, newComment, user)
      .then(({data}) => {
        setPostedComment((currComments) => {
          return [data.comment, ...currComments]
        })
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
      postComment(article_id, postingComment.body, user)
      .catch(() => {
        setError(true)
    });
  }

 if (user !== null) {
    return <div>
      <form
        onSubmit={(event) => {
            if (user !== null) {
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
  </div> : ( <ul>
    {postingComment.map((comment, index) => {
        return <li key={comment.body} className="new-comment-card">
            <div className="new-comment-header">
          <p className="username">{comment.author}</p>
          <p className="date">Date posted: Just now</p>
          </div>
          <p className="comment-body">{comment.body}</p>
          <DeleteCommentButton setDeleting={setDeleting} deleteComment={deleteComment} comment_id={postedComment[index]?.comment_id} setDeleted={setDeleted} setError={setError} message={'Delete'} deleteNewCommentBuffer={deleteNewCommentBuffer} />
        </li> })} </ul>) }
  </div> 
  } else return <p className="login-placeholder">Please log in to comment</p>


};
