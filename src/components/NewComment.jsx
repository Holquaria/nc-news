import { postComment } from "../utils/api"
import { useState } from "react"

export const NewComment = ({article_id}) => {
    const [postedComment, setPostedComment] = useState()

    const postNewComment = (e) => {
        e.preventDefault()
        setPostedComment({body: e.target[0].value, author: 'tickle122'})
        postComment(article_id, e.target[0].value, 'tickle122')
        .catch(() => {
            setPostedComment('error')
        })
        e.target[0].value = ''
    }

    return <div><form onSubmit={(event) => {
        postNewComment(event);
      }} className="new-comment">
        <input className="new-comment-body" type="text" name="body"></input>
        <button className="new-comment-button">Submit</button>
    </form>
    {postedComment === undefined ? null : postedComment === 'error' ? <p>Something went wrong, please try again</p> : 
        <div className='new-comment-card'>
            <p className="username">{postedComment.author}</p>
                <p className="date">Date posted: Just now</p>
        
               <p className="comment-body">{postedComment.body}</p>
            </div>}
    </div>
}