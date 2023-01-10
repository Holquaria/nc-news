export const CommentError = (retryPostComment, postedComment) => {
    return <div className="new-comment-card-error">

    <p className="username">{postedComment.author}</p>
    <p className="date">Date posted: Just now</p>
    <p className="comment-body">{postedComment.body}</p>
    <p>Something went wrong, please try again</p> <button onClick={() => {
    retryPostComment()
  }}>Try again</button>
  </div>
}