import { getComments } from "../utils/api"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { NewComment } from "./NewComment"
import { CommentArray } from "./CommentArray"

export const Comments = ({loggedIn}) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [commentRemoved, setCommentRemoved] = useState(false)

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
      }, [commentRemoved]);

    return (loading === true ? <p>Loading...</p> : loading === 'error' ? <p>Something went wrong, please try again</p> : 
        <div className="comment-container">
        <h4>Comments</h4>
        <NewComment article_id={article_id} loggedIn={loggedIn} />
        {comments.length === 0 ? <p>No comments to display... yet!</p> : <CommentArray comments={comments} setCommentRemoved={setCommentRemoved} loggedIn={loggedIn}/>}
    </div>)
}