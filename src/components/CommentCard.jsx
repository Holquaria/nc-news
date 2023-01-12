import { useState } from "react"
import { deleteComment } from "../utils/api"

export const CommentCard = ({comment, loggedIn}) => {
    const [deleting, setDeleting] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const removeComment = () => {
        setDeleting(true)
        deleteComment(comment.comment_id).then(() => {
        setDeleting(false)
        setDeleted(true)
    })
    }

    return deleted === false ? deleting === true ? <li className='deleted-comment-card'>
    <p className="comment-body">Comment deleting</p>
</li> : <li className='comment-card'>
    <div className="comment-header"><p className="username">{comment.author}</p>
    <p className="date">
    Date posted: {comment.created_at.substring(11, 16)}, {comment.created_at.substring(0, 10)}
    </p></div>
    <p className="comment-body">{comment.body}</p>
    {comment.author === 'tickle122' && loggedIn === true ? <button disabled={deleting === true} onClick={() => {
        removeComment()
        }} className="delete-comment">Delete</button> : null}
</li> : <li className='deleted-comment-card'>
    <p className="comment-body">Comment deleted</p>
</li>
}