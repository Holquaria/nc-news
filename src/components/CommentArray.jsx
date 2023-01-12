import { CommentCard } from "./CommentCard"

export const CommentArray = ({comments, setCommentRemoved, loggedIn}) => {

   return <ul>
        {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} loggedIn={loggedIn} />
        })}
    </ul>
    }
