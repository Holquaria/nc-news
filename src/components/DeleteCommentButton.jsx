export const DeleteCommentButton = ({setDeleting, deleteComment, comment_id, setDeleted, setError, message, deleteNewCommentBuffer}) => {

    const removeComment = () => {
        setDeleting(true)
        deleteComment(comment_id).then(() => {
        setDeleting(false)
        setDeleted(true)
    }).catch(() => {
        setDeleting(false)
        setError(true)
    })
    }

    return <button disabled={deleteNewCommentBuffer === false} className="delete-comment" onClick={removeComment}>{message}</button>
}