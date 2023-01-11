export const CommentArray = ({comments}) => {
   return <ul className='article-container'>
        {comments.map((comment) => {
            return <li key={comment.comment_id} className='comment-card'>
                <p className="username">{comment.author}</p>
                <p className="date">
                Date posted: {comment.created_at.substring(11, 16)}, {comment.created_at.substring(0, 10)}
                </p>
                <p className="comment-body">{comment.body}</p>
            </li>
        })}
    </ul>
    }
