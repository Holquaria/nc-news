import { getComments } from "../utils/api"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { NewComment } from "./NewComment"

export const Comments = () => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)

    const { article_id } = useParams()

    useEffect(() => {
        setLoading(true)
       getComments(article_id)
       .then((comments) => {
        setComments(comments)
        setLoading(false)
       }).catch((err) => {
        setLoading('error')
       })
      }, []);

    return (loading === true ? <p>Loading...</p> : loading === 'error' ? <p>Something went wrong, please try again</p> : 
        <div className="comment-container">
        <h4>Comments</h4>
        <NewComment article_id={article_id} />
        {comments.length === 0 ? <p>No comments to display... yet!</p> : <ul className='article-container'>
        {comments.map((comment) => {
            return <li key={comment.comment_id} className='comment-card'>
                <p className="username">{comment.author}</p>
                <p className="date">
                Date posted: {comment.created_at.substring(11, 16)}, {comment.created_at.substring(0, 10)}
                </p>
                <p className="comment-body">{comment.body}</p>
            </li>
        })}
    </ul>}
    </div>)
}