export const CommentError = ({retryPostComment, postingComment}) => {
  console.log(postingComment)
    return <div className="new-comment-card-error">
   <div className="new-comment-header">
    <p className="username">{postingComment.author}</p>
    <p className="date">Date posted: Just now</p>
    </div>
    <p className="comment-body">{postingComment.body}<br />
Something went wrong, please try again</p> <button className="delete-comment" onClick={() => {
    retryPostComment()
  }}>Try again</button>
  </div>
}