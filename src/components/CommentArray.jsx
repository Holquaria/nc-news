import { deleteComment } from "../utils/api"
import { useState } from "react"

export const CommentArray = ({comments, setCommentRemoved, loggedIn}) => {
    const [deletingComment, setDeletingComment] = useState(null)

    const removeComment = (comment_id) => {
        setDeletingComment(true)
        deleteComment(comment_id).then(() => {
            setCommentRemoved(true)
        })
    }

   return <ul>
        {comments.map((comment) => {
            return <li key={comment.comment_id} className='comment-card'>
                <div className="comment-header"><p className="username">{comment.author}</p>
                <p className="date">
                Date posted: {comment.created_at.substring(11, 16)}, {comment.created_at.substring(0, 10)}
                </p></div>
                <p className="comment-body">{comment.body}</p>
                {comment.author === 'tickle122' && loggedIn === true ? <button disabled={deletingComment === true} onClick={() => {removeComment(comment.comment_id)}} className="delete-comment">Delete</button> : null}
            </li>
        })}
    </ul>
    }
